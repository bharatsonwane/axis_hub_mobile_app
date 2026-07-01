import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppProviders from '@/app/providers/AppProviders';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import { persistor, store } from '@/redux/store';

function AppContent() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={
          resolvedTheme === 'dark' ? 'light-content' : 'dark-content'
        }
      />
      <AppProviders />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider defaultTheme="system" storageKey="axis-ui-theme">
            <AppContent />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
