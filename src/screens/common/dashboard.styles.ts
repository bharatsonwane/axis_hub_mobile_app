import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

export function createDashboardStyles({ colors }: ThemedStylesParams) {
  return StyleSheet.create({
    heading: {
      fontSize: typography.title,
      fontWeight: '700',
      marginBottom: spacing.xs,
      color: colors.foreground,
    },
    subheading: {
      fontSize: typography.body,
      marginBottom: spacing.lg,
      color: colors.mutedForeground,
    },
    grid: {
      gap: spacing.md,
    },
    metricCard: {
      borderWidth: 1,
      borderRadius: radius.lg,
      padding: spacing.lg,
      gap: spacing.xs,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    metricValue: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.foreground,
    },
    metricLabel: {
      fontSize: typography.caption,
      color: colors.mutedForeground,
    },
  });
}
