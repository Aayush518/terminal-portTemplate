import { Command } from '../types/terminal';

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear terminal screen',
  usage: 'clear',
  execute: () => '\x1Bc',
};