import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

export function createSystemDetailScreenStyles({ colors }: ThemedStylesParams) {
  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderRadius: radius.lg,
      padding: spacing.lg,
      gap: spacing.md,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    title: {
      fontSize: typography.title,
      fontWeight: '700',
      color: colors.foreground,
    },
    sectionTitle: {
      fontSize: typography.body,
      fontWeight: '600',
      marginTop: spacing.sm,
      color: colors.foreground,
    },
    row: {
      gap: spacing.xs,
    },
    label: {
      fontSize: typography.caption,
      fontWeight: '600',
      color: colors.mutedForeground,
    },
    value: {
      fontSize: typography.body,
      color: colors.foreground,
    },
    primaryButton: {
      marginTop: spacing.md,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    primaryButtonText: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.primaryForeground,
    },
    maskedValue: {
      fontSize: typography.body,
      fontStyle: 'italic',
      color: colors.mutedForeground,
    },
  });
}
