import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';

export function createPortalShellStyles({ colors }: ThemedStylesParams) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}
