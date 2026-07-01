import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PortalContextProvider } from '@/navigation/PortalContextProvider';
import RootNavigator from '@/navigation/RootNavigator';
import { useTheme } from '@/providers/ThemeProvider';
import {
  darkNavigationTheme,
  lightNavigationTheme,
} from '@/theme/navigationTheme';

export default function AppProviders() {
  const { resolvedTheme } = useTheme();

  return (
    <PortalContextProvider>
      <NavigationContainer
        theme={
          resolvedTheme === 'dark'
            ? darkNavigationTheme
            : lightNavigationTheme
        }
      >
        <RootNavigator />
      </NavigationContainer>
    </PortalContextProvider>
  );
}
