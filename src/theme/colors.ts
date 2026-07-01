import type { ThemeTokens } from './types';

export const lightColors: ThemeTokens = {
  background: '#ffffff',
  foreground: '#0a0a0a',
  card: '#ffffff',
  cardForeground: '#0a0a0a',
  primary: '#2563eb',
  primaryForeground: '#ffffff',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  border: '#e4e4e7',
  sidebar: '#fafafa',
  sidebarForeground: '#18181b',
  destructive: '#dc2626',
};

export const darkColors: ThemeTokens = {
  background: '#09090b',
  foreground: '#fafafa',
  card: '#18181b',
  cardForeground: '#fafafa',
  primary: '#3b82f6',
  primaryForeground: '#ffffff',
  muted: '#27272a',
  mutedForeground: '#a1a1aa',
  border: '#27272a',
  sidebar: '#18181b',
  sidebarForeground: '#fafafa',
  destructive: '#ef4444',
};

export const getColors = (resolvedTheme: 'light' | 'dark'): ThemeTokens =>
  resolvedTheme === 'dark' ? darkColors : lightColors;
