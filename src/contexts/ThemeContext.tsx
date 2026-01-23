'use client';

import { createContext, useContext, ReactNode } from 'react';
import { themes, type ThemeName } from '@/lib/themes';
import { usePathname, useRouter } from 'next/navigation';

type ThemeContextType = {
  currentTheme: ThemeName | null;
  theme: (typeof themes)[ThemeName];
  setTheme: (theme: ThemeName | null) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const themeSegment = pathname?.split('/')[1];
  const isTheme = isValidThemeName(themeSegment);

  const currentTheme = isTheme ? (themeSegment as ThemeName) : null;
  const setTheme = (theme: ThemeName | null) => {
    if (theme) {
      router.push(`/${theme}`);
    } else {
      router.push('/');
    }
  };

  if (!currentTheme && pathname != '/') {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme: themes[currentTheme!],
        setTheme,
      }}>
      <body data-theme={currentTheme}>{children}</body>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function isValidThemeName(theme: string): theme is ThemeName {
  return theme in themes;
}
