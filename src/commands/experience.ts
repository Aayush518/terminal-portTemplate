import { Command } from '../types/terminal';
import { getFile } from '../utils/fileSystem';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'Show work experience',
  usage: 'experience',
  execute: () => {
    const aboutFile = getFile('/home/about.md');
    
    if (!aboutFile || aboutFile.type !== 'file') {
      return 'Experience information not found.';
    }

    const content = aboutFile.content || '';
    const experienceSection = content.split('## Experience')[1]?.split('##')[0] || '';
    return experienceSection.trim();
  },
};