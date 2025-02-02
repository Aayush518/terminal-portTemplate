import { Command } from '../types/terminal';
import { getFile } from '../utils/fileSystem';

export const contactCommand: Command = {
  name: 'contact',
  description: 'Show contact information',
  usage: 'contact',
  execute: () => {
    const contactFile = getFile('/home/contact.json');
    
    if (!contactFile || contactFile.type !== 'file') {
      return 'Contact information not found.';
    }

    const contact = JSON.parse(contactFile.content || '{}');
    return Object.entries(contact)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  },
};