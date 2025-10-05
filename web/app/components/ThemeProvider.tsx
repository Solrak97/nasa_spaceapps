'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { theme } from '../theme';

type ThemeContextType = typeof theme;

const ThemeContext = createContext<ThemeContextType>(theme);

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

/**
 * ThemeProvider component that provides the Deep Ocean theme to all child components
 * 
 * Usage:
 * ```tsx
 * import { useTheme } from './components/ThemeProvider';
 * 
 * function MyComponent() {
 *   const theme = useTheme();
 *   return <div style={{ color: theme.colors.text.primary }}>Hello</div>;
 * }
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

