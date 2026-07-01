/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';
import { ThemeProvider } from '../src/providers/ThemeProvider';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <ThemeProvider defaultTheme="system" storageKey="axis-ui-theme">
        <App />
      </ThemeProvider>,
    );
  });
});
