import { Command } from '../types/terminal';
import { getCurrentDirectory } from '../utils/fileSystem';

export const lsCommand: Command = {
  name: 'ls',
  description: 'List directory contents',
  usage: 'ls [path]',
  execute: () => {
    const currentDir = getCurrentDirectory();
    
    const files = Object.entries(currentDir).map(([name, node]) => {
      const isDir = node.type === 'directory';
      return `${isDir ? '\x1b[1;34m' : ''}${name}${isDir ? '/' : ''}\x1b[0m`;
    });

    return files.join('  ');
  },
};