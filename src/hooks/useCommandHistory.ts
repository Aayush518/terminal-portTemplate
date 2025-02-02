import { useState, useCallback } from 'react';

const MAX_HISTORY = 50;

export const useCommandHistory = () => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addCommand = useCallback((command: string) => {
    setCommandHistory(prev => {
      const newHistory = [command, ...prev];
      return newHistory.slice(0, MAX_HISTORY);
    });
  }, []);

  return {
    commandHistory,
    historyIndex,
    setHistoryIndex,
    addCommand,
  };
};