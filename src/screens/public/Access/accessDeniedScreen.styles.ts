import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

export function createAccessDeniedScreenStyles({ colors }: ThemedStylesParams) {
  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderRadius: radius.lg,
      padding: spacing.lg,
      gap: spacing.sm,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    title: {
      fontSize: typography.title,
      fontWeight: '700',
      color: colors.foreground,
    },
    description: {
      fontSize: typography.body,
      color: colors.mutedForeground,
    },
  });
}
