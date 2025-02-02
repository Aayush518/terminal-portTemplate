import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Monitor, Command, Cpu, Activity, Palette, Settings, X, Minus, Plus, LayoutGrid, Sliders, Type, Eye, Layers, Box } from 'lucide-react';
import { useTerminal } from '../../hooks/useTerminal';
import { useTheme } from '../../hooks/useTheme';
import { useCommandHistory } from '../../hooks/useCommandHistory';
import { Matrix } from './Matrix';
import { StatusBar } from './StatusBar';
import { TerminalPrompt } from './TerminalPrompt';
import { TerminalOutput } from './TerminalOutput';
import { getCurrentPath } from '../../utils/fileSystem';
import { themeManager } from '../../services/themeManager';

export const Terminal: React.FC = () => {
  const { theme, currentThemeName } = useTheme();
  const { history, executeCommand } = useTerminal();
  const { commandHistory, historyIndex, setHistoryIndex, addCommand } = useCommandHistory();
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [opacity, setOpacity] = useState(0.9);
  const [fontSize, setFontSize] = useState(14);
  const [blur, setBlur] = useState(2);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [padding, setPadding] = useState(16);
  const [fontFamily, setFontFamily] = useState('mono');
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const fontFamilies = [
    { name: 'Mono', value: 'mono' },
    { name: 'System', value: 'system-ui' },
    { name: 'Console', value: 'consolas' },
    { name: 'Code', value: 'source-code-pro' },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty('--terminal-blur', `${blur}px`);
  }, [blur]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'l' && e.ctrlKey) {
        executeCommand('clear');
      }
      if (e.key === 'm' && e.ctrlKey) {
        setIsMaximized(prev => !prev);
      }
      if (e.key === ',' && e.ctrlKey) {
        setShowSettings(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [executeCommand]);

  const handleExecuteCommand = (command: string) => {
    addCommand(command);
    executeCommand(command);
  };

  const currentPath = getCurrentPath();
  const themes = themeManager.getThemes();

  return (
    <>
      {currentThemeName === 'matrix' && <Matrix />}
      <div 
        className={`${
          isMaximized ? 'fixed inset-0' : 'w-full max-w-7xl mx-auto my-8 px-4'
        } transition-all duration-300`}
        style={{ 
          opacity,
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          fontFamily: fontFamily,
        }}
      >
        <div className={`rounded-lg overflow-hidden shadow-2xl shadow-${theme.accent}/20 border ${theme.border} terminal-backdrop terminal-glow`}>
          {/* Terminal Header */}
          <div className={`flex items-center gap-2 p-3 ${theme.background} border-b ${theme.border}`}>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => executeCommand('clear')}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" 
              />
              <button 
                onClick={() => setIsMaximized(prev => !prev)}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" 
              />
              <button 
                onClick={() => setShowSettings(prev => !prev)}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" 
              />
            </div>

            <div className={`flex items-center gap-2 px-3 py-1 rounded-md bg-${theme.accent}/20 ml-4`}>
              <TerminalIcon className={`w-4 h-4 ${theme.accent}`} />
              <span className={`text-sm ${theme.text} font-mono`}>{currentPath}</span>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowThemes(prev => !prev)}
                  className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors group relative`}
                >
                  <Palette className={`w-4 h-4 ${theme.text}`} />
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 px-2 py-1 text-xs ${theme.background} ${theme.text} rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                    Themes
                  </span>
                </button>
                <button
                  onClick={() => setShowStats(prev => !prev)}
                  className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors group relative`}
                >
                  <Activity className={`w-4 h-4 ${theme.text}`} />
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 px-2 py-1 text-xs ${theme.background} ${theme.text} rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                    Stats
                  </span>
                </button>
                <button
                  onClick={() => setShowSettings(prev => !prev)}
                  className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors group relative`}
                >
                  <Settings className={`w-4 h-4 ${theme.text} ${showSettings ? 'animate-spin' : ''}`} />
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 px-2 py-1 text-xs ${theme.background} ${theme.text} rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                    Settings (Ctrl+,)
                  </span>
                </button>
                <button
                  onClick={() => setIsMaximized(prev => !prev)}
                  className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors group relative`}
                >
                  {isMaximized ? (
                    <Minimize2 className={`w-4 h-4 ${theme.text}`} />
                  ) : (
                    <Maximize2 className={`w-4 h-4 ${theme.text}`} />
                  )}
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 px-2 py-1 text-xs ${theme.background} ${theme.text} rounded opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {isMaximized ? 'Minimize (Ctrl+M)' : 'Maximize (Ctrl+M)'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className={`p-4 ${theme.background} border-b ${theme.border}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-medium ${theme.text} flex items-center gap-2`}>
                  <Settings className="w-4 h-4" />
                  Terminal Settings
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className={`p-1 hover:bg-${theme.accent}/20 rounded-md`}
                >
                  <X className={`w-4 h-4 ${theme.text}`} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className={`text-sm ${theme.text} flex items-center gap-2`}>
                      <Eye className="w-4 h-4" />
                      Opacity
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setOpacity(prev => Math.max(0.1, prev - 0.1))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Minus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <div className={`flex-1 h-2 bg-${theme.accent}/20 rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full bg-${theme.accent}`}
                          style={{ width: `${opacity * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={() => setOpacity(prev => Math.min(1, prev + 0.1))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Plus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <span className={`text-sm ${theme.text} min-w-[3rem] text-center`}>
                        {Math.round(opacity * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm ${theme.text} flex items-center gap-2`}>
                      <Type className="w-4 h-4" />
                      Font Size
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Minus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <div className={`flex-1 h-2 bg-${theme.accent}/20 rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full bg-${theme.accent}`}
                          style={{ width: `${((fontSize - 12) / 8) * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Plus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <span className={`text-sm ${theme.text} min-w-[3rem] text-center`}>
                        {fontSize}px
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm ${theme.text} flex items-center gap-2`}>
                      <Layers className="w-4 h-4" />
                      Blur Effect
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBlur(prev => Math.max(0, prev - 2))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Minus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <div className={`flex-1 h-2 bg-${theme.accent}/20 rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full bg-${theme.accent}`}
                          style={{ width: `${(blur / 20) * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={() => setBlur(prev => Math.min(20, prev + 2))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Plus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <span className={`text-sm ${theme.text} min-w-[3rem] text-center`}>
                        {blur}px
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className={`text-sm ${theme.text} flex items-center gap-2`}>
                      <Box className="w-4 h-4" />
                      Line Height
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLineHeight(prev => Math.max(1, prev - 0.1))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Minus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <div className={`flex-1 h-2 bg-${theme.accent}/20 rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full bg-${theme.accent}`}
                          style={{ width: `${((lineHeight - 1) / 1) * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={() => setLineHeight(prev => Math.min(2, prev + 0.1))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Plus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <span className={`text-sm ${theme.text} min-w-[3rem] text-center`}>
                        {lineHeight.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm ${theme.text} flex items-center gap-2`}>
                      <Sliders className="w-4 h-4" />
                      Padding
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPadding(prev => Math.max(8, prev - 4))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Minus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <div className={`flex-1 h-2 bg-${theme.accent}/20 rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full bg-${theme.accent}`}
                          style={{ width: `${((padding - 8) / 24) * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={() => setPadding(prev => Math.min(32, prev + 4))}
                        className={`p-1.5 hover:bg-${theme.accent}/20 rounded-md transition-colors`}
                      >
                        <Plus className={`w-4 h-4 ${theme.text}`} />
                      </button>
                      <span className={`text-sm ${theme.text} min-w-[3rem] text-center`}>
                        {padding}px
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm ${theme.text} flex items-center gap-2`}>
                      <Type className="w-4 h-4" />
                      Font Family
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {fontFamilies.map(font => (
                        <button
                          key={font.value}
                          onClick={() => setFontFamily(font.value)}
                          className={`px-3 py-2 rounded-md text-sm transition-colors ${
                            fontFamily === font.value
                              ? `bg-${theme.accent}/20 ${theme.text}`
                              : `hover:bg-${theme.accent}/10 ${theme.text}/70`
                          }`}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Theme Selector */}
          {showThemes && (
            <div className={`p-4 ${theme.background} border-b ${theme.border}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-medium ${theme.text}`}>Terminal Themes</h3>
                <button
                  onClick={() => setShowThemes(false)}
                  className={`p-1 hover:bg-${theme.accent}/20 rounded-md`}
                >
                  <X className={`w-4 h-4 ${theme.text}`} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(themes).map(([name, themeObj]) => (
                  <button
                    key={name}
                    onClick={() => {
                      themeManager.setTheme(name as any);
                      setShowThemes(false);
                    }}
                    className={`p-2 rounded-md ${
                      currentThemeName === name ? `bg-${theme.accent}/20 ring-1 ring-${theme.accent}` : `hover:bg-${theme.accent}/10`
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${themeObj.accent}`} />
                      <span className={`text-sm ${theme.text} capitalize`}>{name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            ref={terminalRef}
            className={`relative ${theme.background}`}
            style={{ padding: `${padding}px` }}
          >
            {showStats && (
              <div className={`absolute top-0 right-0 m-4 p-4 ${theme.background}/90 rounded-lg ${theme.border} backdrop-blur-sm z-10`}>
                <div className={`flex items-center gap-4 text-sm ${theme.text}`}>
                  <div className="flex items-center gap-2">
                    <Command className="w-4 h-4 opacity-50" />
                    <span>Commands: {commandHistory.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 opacity-50" />
                    <span>CPU: {Math.round(Math.random() * 30 + 20)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 opacity-50" />
                    <span>PID: {Math.round(Math.random() * 1000 + 1000)}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div
              ref={contentRef}
              className={`${
                isMaximized ? 'h-[calc(100vh-7rem)]' : 'h-[28rem]'
              } overflow-y-auto transition-all duration-300 scrollbar-terminal`}
            >
              <div className="space-y-3">
                {history.map((entry) => (
                  <TerminalOutput key={entry.id} entry={entry} />
                ))}
                <TerminalPrompt
                  input={input}
                  setInput={setInput}
                  onExecute={handleExecuteCommand}
                  cursorVisible={cursorVisible}
                  commandHistory={commandHistory}
                  historyIndex={historyIndex}
                  setHistoryIndex={setHistoryIndex}
                />
              </div>
            </div>
            <StatusBar />
          </div>
        </div>
      </div>
    </>
  );
};