import { Command } from '../types/terminal';
import { getFile } from '../utils/fileSystem';

export const catCommand: Command = {
  name: 'cat',
  description: 'Display file contents',
  usage: 'cat <filename>',
  execute: (args: string[]) => {
    if (args.length === 0) {
      throw new Error('Usage: cat <filename>');
    }

    const file = getFile(args[0]);

    if (!file) {
      throw new Error(`File not found: ${args[0]}`);
    }

    if (file.type !== 'file') {
      throw new Error(`${args[0]} is a directory`);
    }

    return file.content || '';
  },
};