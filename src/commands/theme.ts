import { Command } from '../types/terminal';
import { themeManager } from '../services/themeManager';

export const themeCommand: Command = {
  name: 'theme',
  description: 'Change or view terminal theme',
  usage: 'theme [name]',
  execute: (args: string[]) => {
    const themes = themeManager.getThemes();
    const currentTheme = themeManager.getCurrentTheme();

    if (args.length === 0) {
      const themeList = Object.keys(themes)
        .map(name => `${name}${name === currentTheme.name ? ' (current)' : ''}`)
        .join('\n');
      return `Available themes:\n${themeList}\n\nUse 'theme <name>' to switch themes.`;
    }

    const themeName = args[0].toLowerCase() as keyof typeof themes;
    if (!themes[themeName]) {
      throw new Error(`Theme '${themeName}' not found. Use 'theme' to list available themes.`);
    }

    themeManager.setTheme(themeName);
    return `Theme changed to ${themeName}`;
  },
};