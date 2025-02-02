import { Command } from '../types/terminal';

export const matrixCommand: Command = {
  name: 'matrix',
  description: 'Toggle Matrix rain animation',
  usage: 'matrix [on|off]',
  execute: (args: string[]) => {
    const action = args[0]?.toLowerCase() || 'on';
    
    if (action === 'on') {
      document.documentElement.classList.add('matrix-mode');
      return 'Matrix rain animation enabled. Type "matrix off" to disable.';
    } else if (action === 'off') {
      document.documentElement.classList.remove('matrix-mode');
      return 'Matrix rain animation disabled.';
    } else {
      throw new Error('Invalid argument. Use: matrix [on|off]');
    }
  },
};