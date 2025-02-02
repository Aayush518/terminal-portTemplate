import { Command } from '../types/terminal';

export const helpCommand: Command = {
  name: 'help',
  description: 'Display help information about available commands',
  usage: 'help [command]',
  execute: (args: string[]) => {
    const commands = [
      { name: 'help', desc: 'Show this help message', category: 'System' },
      { name: 'ls', desc: 'List directory contents', category: 'Files' },
      { name: 'cd', desc: 'Change directory', category: 'Files' },
      { name: 'cat', desc: 'View file contents', category: 'Files' },
      { name: 'clear', desc: 'Clear terminal screen', category: 'System' },
      { name: 'neofetch', desc: 'Display system information', category: 'System' },
      { name: 'projects', desc: 'List portfolio projects', category: 'Portfolio' },
      { name: 'contact', desc: 'Show contact information', category: 'Portfolio' },
      { name: 'skills', desc: 'List technical skills', category: 'Portfolio' },
      { name: 'experience', desc: 'Show work experience', category: 'Portfolio' },
      { name: 'whoami', desc: 'Display user information', category: 'System' },
      { name: 'theme', desc: 'Change terminal theme', category: 'Customization' },
      { name: 'system', desc: 'Show system information', category: 'System' }
    ];

    // If a specific command is provided
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = commands.find(cmd => cmd.name === commandName);
      
      if (!command) {
        return `Command '${commandName}' not found. Type 'help' to see all available commands.`;
      }

      return `
╭────────────────────────────────────────────╮
│ Command: ${command.name.padEnd(37)} │
├────────────────────────────────────────────┤
│ Category: ${command.category.padEnd(35)} │
│ Description: ${command.desc.padEnd(33)} │
╰────────────────────────────────────────────╯
`;
    }

    // Group commands by category
    const groupedCommands = commands.reduce((acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = [];
      }
      acc[cmd.category].push(cmd);
      return acc;
    }, {} as Record<string, typeof commands>);

    // Build the formatted output
    let output = '\n╭─ Terminal Commands ──────────────────────────╮\n';

    Object.entries(groupedCommands).forEach(([category, cmds]) => {
      output += `│                                              │\n`;
      output += `│ ${category.toUpperCase()}${' '.repeat(44 - category.length)}│\n`;
      output += `│ ${'-'.repeat(44)}│\n`;
      
      cmds.forEach(cmd => {
        const line = ` ${cmd.name.padEnd(15)} │ ${cmd.desc}`;
        output += `│${line.padEnd(44)}│\n`;
      });
    });

    output += '╰──────────────────────────────────────────────╯\n';
    output += '\nType "help <command>" for more information about a specific command.\n';
    output += 'Use Tab for command completion and ↑↓ for command history.\n';

    return output;
  },
};