import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { darkColors, lightColors } from './colors';

export const lightNavigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightColors.primary,
    background: lightColors.background,
    card: lightColors.card,
    text: lightColors.foreground,
    border: lightColors.border,
    notification: lightColors.destructive,
  },
};

export const darkNavigationTheme: NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.card,
    text: darkColors.foreground,
    border: darkColors.border,
    notification: darkColors.destructive,
  },
};
