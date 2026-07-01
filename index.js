import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { name as appName } from './app.json';

function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="axis-ui-theme">
      <App />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
