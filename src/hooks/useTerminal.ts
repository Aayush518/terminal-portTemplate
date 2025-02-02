import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TerminalHistory } from '../types/terminal';
import { commands } from '../commands';

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      id: uuidv4(),
      type: 'system',
      content: `Terminal Portfolio v2.0.0 [${new Date().toISOString()}]
Type 'help' to see available commands.

Press Ctrl+L to clear the terminal.
`,
      timestamp: Date.now(),
    },
  ]);

  const appendToHistory = useCallback((entry: Omit<TerminalHistory, 'id' | 'timestamp'>) => {
    setHistory(prev => [...prev, {
      ...entry,
      id: uuidv4(),
      timestamp: Date.now(),
    }]);
  }, []);

  const executeCommand = useCallback(async (input: string) => {
    const [cmd, ...args] = input.trim().split(/\s+/);
    const command = commands[cmd.toLowerCase()];

    appendToHistory({
      type: 'command',
      content: input,
    });

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    if (!command) {
      appendToHistory({
        type: 'error',
        content: `Command not found: ${cmd}. Type 'help' for available commands.`,
      });
      return;
    }

    try {
      const output = await command.execute(args);
      if (output) {
        appendToHistory({
          type: 'output',
          content: output,
        });
      }
    } catch (error) {
      appendToHistory({
        type: 'error',
        content: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }, [appendToHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    executeCommand,
    clearHistory,
  };
};