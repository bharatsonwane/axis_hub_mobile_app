import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

type CreatePortalSwitcherStylesParams = ThemedStylesParams & {
  bottomInset: number;
};

export function createPortalSwitcherStyles({
  colors,
  bottomInset,
}: CreatePortalSwitcherStylesParams) {
  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'flex-end',
    },
    sheet: {
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      borderWidth: 1,
      padding: spacing.lg,
      maxHeight: '70%',
      backgroundColor: colors.card,
      borderColor: colors.border,
      paddingBottom: bottomInset + spacing.md,
    },
    sheetTitle: {
      fontSize: typography.subtitle,
      fontWeight: '700',
      marginBottom: spacing.md,
      color: colors.foreground,
    },
    list: {
      marginBottom: spacing.md,
    },
    sectionLabel: {
      fontSize: typography.caption,
      fontWeight: '600',
      marginBottom: spacing.xs,
      marginTop: spacing.sm,
      color: colors.mutedForeground,
    },
    item: {
      borderWidth: 1,
      borderRadius: radius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    itemActive: {
      backgroundColor: colors.muted,
    },
    itemTitle: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.foreground,
    },
    itemMeta: {
      fontSize: typography.caption,
      marginTop: spacing.xs,
      color: colors.mutedForeground,
    },
    activeBadge: {
      fontSize: typography.caption,
      marginTop: spacing.xs,
      fontWeight: '600',
      color: colors.primary,
    },
    closeButton: {
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      backgroundColor: colors.muted,
    },
    closeText: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.foreground,
    },
  });

  return {
    styles,
    getTenantItemStyle: (isActive: boolean) =>
      isActive ? [styles.item, styles.itemActive] : styles.item,
  };
}
