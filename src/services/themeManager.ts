import { Theme, ThemePreset } from '../types/terminal';

const themes: Record<ThemePreset, Theme> = {
  cyberpunk: {
    name: 'cyberpunk',
    background: 'bg-gray-950',
    text: 'text-emerald-400',
    prompt: 'text-emerald-500',
    error: 'text-red-400',
    system: 'text-blue-400',
    selection: 'selection:bg-emerald-900 selection:text-emerald-100',
    accent: 'text-emerald-500',
    border: 'border-emerald-900/30'
  },
  matrix: {
    name: 'matrix',
    background: 'bg-black',
    text: 'text-green-500',
    prompt: 'text-green-400',
    error: 'text-red-500',
    system: 'text-green-600',
    selection: 'selection:bg-green-900 selection:text-green-100',
    accent: 'text-green-400',
    border: 'border-green-900/30'
  },
  dracula: {
    name: 'dracula',
    background: 'bg-[#282a36]',
    text: 'text-[#f8f8f2]',
    prompt: 'text-[#bd93f9]',
    error: 'text-[#ff5555]',
    system: 'text-[#6272a4]',
    selection: 'selection:bg-[#44475a] selection:text-[#f8f8f2]',
    accent: 'text-[#ff79c6]',
    border: 'border-[#44475a]'
  },
  nord: {
    name: 'nord',
    background: 'bg-[#2e3440]',
    text: 'text-[#d8dee9]',
    prompt: 'text-[#88c0d0]',
    error: 'text-[#bf616a]',
    system: 'text-[#81a1c1]',
    selection: 'selection:bg-[#4c566a] selection:text-[#eceff4]',
    accent: 'text-[#5e81ac]',
    border: 'border-[#4c566a]'
  },
  monokai: {
    name: 'monokai',
    background: 'bg-[#272822]',
    text: 'text-[#f8f8f2]',
    prompt: 'text-[#a6e22e]',
    error: 'text-[#f92672]',
    system: 'text-[#66d9ef]',
    selection: 'selection:bg-[#49483e] selection:text-[#f8f8f2]',
    accent: 'text-[#fd971f]',
    border: 'border-[#49483e]'
  },
  solarized: {
    name: 'solarized',
    background: 'bg-[#002b36]',
    text: 'text-[#839496]',
    prompt: 'text-[#859900]',
    error: 'text-[#dc322f]',
    system: 'text-[#268bd2]',
    selection: 'selection:bg-[#073642] selection:text-[#93a1a1]',
    accent: 'text-[#b58900]',
    border: 'border-[#073642]'
  },
  custom: {
    name: 'custom',
    background: 'bg-gray-950',
    text: 'text-white',
    prompt: 'text-blue-400',
    error: 'text-red-400',
    system: 'text-purple-400',
    selection: 'selection:bg-blue-900 selection:text-blue-100',
    accent: 'text-blue-500',
    border: 'border-blue-900/30'
  }
};

class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme;
  private listeners: ((theme: Theme) => void)[] = [];

  private constructor() {
    this.currentTheme = themes.cyberpunk;
  }

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  public getThemes(): Record<ThemePreset, Theme> {
    return themes;
  }

  public setTheme(name: ThemePreset): void {
    if (themes[name]) {
      this.currentTheme = themes[name];
      this.notifyListeners();
    }
  }

  public subscribe(listener: (theme: Theme) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentTheme));
  }
}

export const themeManager = ThemeManager.getInstance();