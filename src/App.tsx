import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppStyles } from '@/app.styles';
import { AuthContextProvider } from '@/contexts/AuthContextProvider';
import { PortalContextProvider } from '@/navigation/PortalContextProvider';
import RootNavigator from '@/navigation/RootNavigator';
import { useTheme } from '@/providers/ThemeProvider';
import { persistor, store } from '@/redux/store';
import {
  darkNavigationTheme,
  lightNavigationTheme,
} from '@/theme/navigationTheme';

const styles = createAppStyles();

export default function App() {
  const { resolvedTheme } = useTheme();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar
              barStyle={
                resolvedTheme === 'dark' ? 'light-content' : 'dark-content'
              }
            />
            <PortalContextProvider>
              <NavigationContainer
                theme={
                  resolvedTheme === 'dark'
                    ? darkNavigationTheme
                    : lightNavigationTheme
                }
              >
                <AuthContextProvider>
                  <RootNavigator />
                </AuthContextProvider>
              </NavigationContainer>
            </PortalContextProvider>
            <Toast />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
