import { Command } from '../types/terminal';
import { getFile } from '../utils/fileSystem';

export const skillsCommand: Command = {
  name: 'skills',
  description: 'List technical skills',
  usage: 'skills',
  execute: () => {
    const aboutFile = getFile('/home/about.md');
    
    if (!aboutFile || aboutFile.type !== 'file') {
      return 'Skills information not found.';
    }

    const content = aboutFile.content || '';
    const skillsSection = content.split('## Skills')[1]?.split('##')[0] || '';
    return skillsSection.trim();
  },
};