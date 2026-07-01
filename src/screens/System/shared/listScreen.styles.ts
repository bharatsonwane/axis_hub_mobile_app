import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

export function createSystemListScreenStyles({ colors }: ThemedStylesParams) {
  return StyleSheet.create({
    heading: {
      fontSize: typography.title,
      fontWeight: '700',
      marginBottom: spacing.xs,
      color: colors.foreground,
    },
    subheading: {
      fontSize: typography.body,
      marginBottom: spacing.md,
      color: colors.mutedForeground,
    },
    searchInput: {
      borderWidth: 1,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      fontSize: typography.body,
      marginBottom: spacing.md,
      color: colors.foreground,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingBottom: spacing.xl,
      gap: spacing.sm,
    },
    listItem: {
      borderWidth: 1,
      borderRadius: radius.lg,
      padding: spacing.md,
      gap: spacing.xs,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    listItemTitle: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.foreground,
    },
    listItemMeta: {
      fontSize: typography.caption,
      color: colors.mutedForeground,
    },
    loadMoreButton: {
      marginTop: spacing.sm,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.muted,
    },
    loadMoreText: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.foreground,
    },
    emptyText: {
      fontSize: typography.body,
      textAlign: 'center',
      marginTop: spacing.xl,
      color: colors.mutedForeground,
    },
    list: {
      flex: 1,
    },
    hubCard: {
      borderWidth: 1,
      borderRadius: radius.lg,
      padding: spacing.lg,
      marginBottom: spacing.sm,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    hubTitle: {
      fontSize: typography.subtitle,
      fontWeight: '600',
      color: colors.foreground,
    },
    hubDescription: {
      fontSize: typography.caption,
      marginTop: spacing.xs,
      color: colors.mutedForeground,
    },
  });
}
