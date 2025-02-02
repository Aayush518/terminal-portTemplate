import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight, Command, Search, History, Zap, Terminal, Cpu, MemoryStick as Memory, Clock, Wifi, GitBranch, Box } from 'lucide-react';
import { getAutocompleteSuggestions, getCurrentPath } from '../../utils/fileSystem';
import { useTheme } from '../../hooks/useTheme';
import { commands } from '../../commands';

interface TerminalPromptProps {
  input: string;
  setInput: (value: string) => void;
  onExecute: (command: string) => void;
  cursorVisible: boolean;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
}

const COMMON_COMMANDS = Object.keys(commands);

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  input,
  setInput,
  onExecute,
  cursorVisible,
  commandHistory,
  historyIndex,
  setHistoryIndex,
}) => {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: Math.random() * 30 + 20,
    memory: Math.random() * 40 + 30,
    network: Math.random() * 100 + 50,
    uptime: 0,
  });
  const currentPath = getCurrentPath();

  useEffect(() => {
    inputRef.current?.focus();
  }, [input]);

  useEffect(() => {
    setRecentCommands(Array.from(new Set(commandHistory.slice(0, 5))));
  }, [commandHistory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        cpu: Math.random() * 30 + 20,
        memory: Math.random() * 40 + 30,
        network: Math.random() * 100 + 50,
        uptime: prev.uptime + 1,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getCommandSuggestions = (cmd: string): string[] => {
    return COMMON_COMMANDS.filter(command => 
      command.toLowerCase().startsWith(cmd.toLowerCase())
    );
  };

  const getCommandDescription = (cmd: string): string => {
    return commands[cmd]?.description || '';
  };

  const handleTabCompletion = () => {
    const words = input.split(' ');
    const lastWord = words[words.length - 1];
    
    if (words.length === 1) {
      const cmdSuggestions = getCommandSuggestions(lastWord);
      if (cmdSuggestions.length === 1) {
        setInput(cmdSuggestions[0]);
        setSuggestions([]);
        setShowSuggestions(false);
      } else if (cmdSuggestions.length > 0) {
        setSuggestions(cmdSuggestions);
        setShowSuggestions(true);
      }
    } else if (words[0] === 'cd' || words[0] === 'cat') {
      const pathSuggestions = getAutocompleteSuggestions(lastWord);
      if (pathSuggestions.length === 1) {
        words[words.length - 1] = pathSuggestions[0];
        setInput(words.join(' '));
        setSuggestions([]);
        setShowSuggestions(false);
      } else if (pathSuggestions.length > 0) {
        setSuggestions(pathSuggestions);
        setShowSuggestions(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (showSuggestions && selectedSuggestion !== -1) {
          const words = input.split(' ');
          words[words.length - 1] = suggestions[selectedSuggestion];
          setInput(words.join(' '));
          setSuggestions([]);
          setShowSuggestions(false);
          setSelectedSuggestion(-1);
        } else if (input.trim()) {
          onExecute(input.trim());
          setInput('');
          setHistoryIndex(-1);
          setSuggestions([]);
          setShowSuggestions(false);
          setSelectedSuggestion(-1);
        }
        break;
      case 'Tab':
        e.preventDefault();
        handleTabCompletion();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (showSuggestions) {
          setSelectedSuggestion(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
        } else if (commandHistory.length > 0) {
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex] || '');
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (showSuggestions) {
          setSelectedSuggestion(prev => 
            prev < suggestions.length - 1 ? prev + 1 : -1
          );
        } else if (historyIndex > -1) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(newIndex >= 0 ? commandHistory[newIndex] : '');
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    
    const words = e.target.value.split(' ');
    if (words.length === 1) {
      const cmdSuggestions = getCommandSuggestions(words[0]);
      setSuggestions(cmdSuggestions);
      setShowSuggestions(cmdSuggestions.length > 0);
      setSelectedSuggestion(-1);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative group">
      <div className="flex flex-col gap-2">
        {/* System Stats Bar */}
        <div className={`flex items-center gap-4 px-3 py-1.5 rounded-lg ${theme.background} border ${theme.border} backdrop-blur-sm text-xs font-mono`}>
          <div className="flex items-center gap-2">
            <Terminal className={`w-3 h-3 ${theme.accent}`} />
            <span className={theme.text}>terminal v2.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className={`w-3 h-3 ${theme.accent}`} />
            <span className={theme.text}>{systemStats.cpu.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Memory className={`w-3 h-3 ${theme.accent}`} />
            <span className={theme.text}>{systemStats.memory.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className={`w-3 h-3 ${theme.accent}`} />
            <span className={theme.text}>{systemStats.network.toFixed(0)} Mbps</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`w-3 h-3 ${theme.accent}`} />
            <span className={theme.text}>{formatUptime(systemStats.uptime)}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <GitBranch className={`w-3 h-3 ${theme.accent}`} />
            <span className={theme.text}>main</span>
          </div>
        </div>

        {/* Command Input */}
        <div className="flex items-center gap-2">
          <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg ${theme.background} border ${theme.border} backdrop-blur-sm transition-all duration-300 ${isFocused ? 'ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10' : ''}`}>
            <div className="flex items-center gap-2 shrink-0">
              <Box className={`w-4 h-4 ${theme.accent} animate-pulse`} />
              <span className={`${theme.prompt} font-bold`}>λ</span>
              <span className={`${theme.accent} font-medium`}>{currentPath}</span>
              <ChevronRight className={`w-4 h-4 ${theme.system}`} />
            </div>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  setTimeout(() => {
                    setShowSuggestions(false);
                  }, 200);
                }}
                className={`w-full bg-transparent border-none outline-none ${theme.text} font-medium min-w-[300px]`}
                spellCheck="false"
                autoComplete="off"
                placeholder={isFocused ? '' : 'Type a command or press Tab for suggestions...'}
              />
              <span
                className={`absolute top-1/2 -translate-y-1/2 ${theme.accent} transition-opacity duration-75 ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  left: `${input.length * 0.61}em`,
                  width: '2px',
                  height: '1.2em'
                }}
              />
            </div>
            {isFocused && (
              <div className={`flex items-center gap-2 text-xs ${theme.text} opacity-50`}>
                <Command className="w-3 h-3" />
                <kbd className={`px-1.5 py-0.5 rounded ${theme.background} ${theme.text} text-xs`}>Tab</kbd>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggestions and Recent Commands */}
      {(showSuggestions || (isFocused && recentCommands.length > 0)) && (
        <div className={`absolute left-0 right-0 mt-2 ${theme.background} border ${theme.border} rounded-lg overflow-hidden backdrop-blur-sm z-50 shadow-lg shadow-emerald-500/10`}>
          {showSuggestions ? (
            <div className="max-h-48 overflow-y-auto divide-y divide-emerald-900/30">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    index === selectedSuggestion 
                      ? `${theme.accent}/20 ${theme.text} translate-x-2` 
                      : `hover:${theme.accent}/10 hover:translate-x-2 ${theme.text}`
                  }`}
                  onClick={() => {
                    const words = input.split(' ');
                    words[words.length - 1] = suggestion;
                    setInput(words.join(' '));
                    setSuggestions([]);
                    setShowSuggestions(false);
                    setSelectedSuggestion(-1);
                    inputRef.current?.focus();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Search className={`w-4 h-4 ${theme.text} opacity-50`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{suggestion}</span>
                        {index === selectedSuggestion && (
                          <kbd className={`px-1.5 py-0.5 rounded ${theme.background} ${theme.text} text-xs`}>
                            Enter
                          </kbd>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${theme.text} opacity-50`}>
                        {getCommandDescription(suggestion)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentCommands.length > 0 && (
            <div className="p-3 space-y-2">
              <div className={`px-2 py-1 text-xs ${theme.text} opacity-50 flex items-center gap-2`}>
                <History className="w-3 h-3" />
                <span>Recent Commands</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {recentCommands.map((cmd, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 ${theme.text} hover:${theme.accent}/10 hover:translate-x-1 transition-all duration-200`}
                    onClick={() => {
                      setInput(cmd);
                      inputRef.current?.focus();
                    }}
                  >
                    <Zap className={`w-3 h-3 ${theme.text} opacity-50`} />
                    <span className="text-sm truncate">{cmd}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};