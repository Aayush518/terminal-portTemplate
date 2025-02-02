export interface Command {
  name: string;
  description: string;
  usage: string;
  execute: (args: string[]) => string | Promise<string>;
}

export interface CommandRegistry {
  [key: string]: Command;
}

export interface TerminalHistory {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  content: string;
  timestamp: number;
}

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileSystemNode };
  metadata?: {
    createdAt: number;
    modifiedAt: number;
    permissions: string;
    owner: string;
  };
}

export interface FileSystem {
  root: { [key: string]: FileSystemNode };
  currentPath: string[];
}

export interface Theme {
  name: string;
  background: string;
  text: string;
  prompt: string;
  error: string;
  system: string;
  selection: string;
  accent: string;
  border: string;
}

export type ThemePreset = 'cyberpunk' | 'matrix' | 'dracula' | 'nord' | 'monokai' | 'solarized' | 'custom';