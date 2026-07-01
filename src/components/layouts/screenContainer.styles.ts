import { StyleSheet, type ViewStyle } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';

type CreateScreenContainerStylesParams = ThemedStylesParams & {
  style?: ViewStyle;
};

export function createScreenContainerStyles({
  colors,
  style,
}: CreateScreenContainerStylesParams) {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
  });

  return {
    safeAreaStyle: style ? [styles.safeArea, style] : styles.safeArea,
    contentStyle: styles.content,
  };
}
