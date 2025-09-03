import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeId, Settings } from '../types';
import { COLORS } from '../constants';

interface ThemeContextType {
  theme: ThemeId;
  colors: typeof COLORS.light | typeof COLORS.dark | typeof COLORS.solar | typeof COLORS.mono;
  settings: Settings;
  setTheme: (theme: ThemeId) => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
  toggleTheme: () => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  haptics: true,
  sounds: true,
  leftHanded: false,
  reduceMotion: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [theme, setThemeState] = useState<ThemeId>('light');

  // Initialize theme based on system preference
  useEffect(() => {
    if (settings.theme === 'light' || settings.theme === 'dark' || settings.theme === 'solar' || settings.theme === 'mono') {
      setThemeState(settings.theme);
    } else if (systemColorScheme) {
      setThemeState(systemColorScheme);
    }
  }, [settings.theme, systemColorScheme]);

  // Get current colors based on theme
  const colors = COLORS[theme] || COLORS.light;

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    updateSettings({ theme: newTheme });
  };

  const toggleTheme = () => {
    const themes: ThemeId[] = ['light', 'dark', 'solar', 'mono'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setTheme(newTheme);
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const value: ThemeContextType = {
    theme,
    colors,
    settings,
    setTheme,
    updateSettings,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
