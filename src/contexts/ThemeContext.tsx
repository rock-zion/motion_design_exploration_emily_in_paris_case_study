'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { themes, type ThemeName } from '@/lib/themes';

type ThemeContextType = {
  currentTheme: ThemeName | null;
  theme: (typeof themes)[ThemeName];
  setTheme: (theme: ThemeName | null) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName | null>(null);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme: themes[currentTheme!],
        setTheme: setCurrentTheme,
      }}>
      <div data-theme={currentTheme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
