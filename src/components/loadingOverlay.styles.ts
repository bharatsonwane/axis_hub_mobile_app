import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';

export function createLoadingOverlayStyles({ colors }: ThemedStylesParams) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
  });

  return {
    styles,
    activityIndicatorColor: colors.primary,
  };
}
