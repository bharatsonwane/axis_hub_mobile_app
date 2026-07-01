export type ThemePreference = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export interface ThemeTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  sidebar: string;
  sidebarForeground: string;
  destructive: string;
}
