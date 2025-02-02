import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types/terminal';
import { themeManager } from '../services/themeManager';

interface ThemeContextType {
  theme: Theme;
  currentThemeName: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themeManager.getCurrentTheme(),
  currentThemeName: themeManager.getCurrentTheme().name
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themeManager.getCurrentTheme());

  useEffect(() => {
    return themeManager.subscribe((newTheme) => {
      setTheme(newTheme);
    });
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      currentThemeName: theme.name
    }}>
      {children}
    </ThemeContext.Provider>
  );
};