import { Command } from '../types/terminal';
import { changeDirectory, getCurrentDirectory } from '../utils/fileSystem';

export const cdCommand: Command = {
  name: 'cd',
  description: 'Change directory',
  usage: 'cd <directory>',
  execute: (args: string[]) => {
    const path = args[0] || '~';
    
    try {
      changeDirectory(path);
      const currentDir = getCurrentDirectory();
      return `Changed to directory: ${Object.keys(currentDir).join(' ')}`;
    } catch (error) {
      throw new Error(`cd: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};