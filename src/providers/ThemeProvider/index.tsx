import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getColors } from '@/theme/colors';
import type { ResolvedTheme, ThemePreference, ThemeTokens } from '@/theme/types';

const STORAGE_KEY = 'axis-ui-theme';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: ThemePreference;
  storageKey?: string;
};

type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  colors: ThemeTokens;
  setTheme: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemePreference>(defaultTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (
          stored === 'light' ||
          stored === 'dark' ||
          stored === 'system'
        ) {
          setThemeState(stored);
        }
      } catch {
        // Keep default theme when storage is unavailable.
      }
    };

    loadTheme();
  }, [storageKey]);

  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return theme;
  }, [theme, systemScheme]);

  const colors = useMemo(() => getColors(resolvedTheme), [resolvedTheme]);

  const setTheme = useCallback(
    (nextTheme: ThemePreference) => {
      setThemeState(nextTheme);
      AsyncStorage.setItem(storageKey, nextTheme).catch(() => undefined);
    },
    [storageKey],
  );

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      colors,
      setTheme,
    }),
    [theme, resolvedTheme, colors, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
