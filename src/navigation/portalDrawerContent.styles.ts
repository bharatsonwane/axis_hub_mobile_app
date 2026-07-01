import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

export function createPortalDrawerContentStyles({ colors }: ThemedStylesParams) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.sidebar,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menu: {
      paddingTop: spacing.sm,
      paddingHorizontal: spacing.sm,
      gap: spacing.xs,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radius.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      gap: spacing.md,
    },
    menuItemActive: {
      backgroundColor: colors.muted,
    },
    menuItemLabel: {
      flex: 1,
      fontSize: typography.body,
      fontWeight: '500',
    },
    themeSection: {
      borderTopWidth: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderTopColor: colors.border,
      gap: spacing.sm,
    },
    themeLabel: {
      fontSize: typography.caption,
      fontWeight: '600',
      color: colors.mutedForeground,
    },
    themeRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    themeButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      borderRadius: radius.md,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: colors.border,
    },
    themeButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    themeButtonInactive: {
      backgroundColor: colors.muted,
    },
    themeButtonText: {
      fontSize: typography.caption,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    themeButtonTextActive: {
      color: colors.primaryForeground,
    },
    themeButtonTextInactive: {
      color: colors.foreground,
    },
    footer: {
      borderTopWidth: 1,
      padding: spacing.md,
      borderTopColor: colors.border,
    },
    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: radius.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      gap: spacing.sm,
      backgroundColor: colors.muted,
      borderColor: colors.border,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    avatarText: {
      fontSize: typography.caption,
      fontWeight: '700',
      color: colors.primaryForeground,
    },
    userInfo: {
      flex: 1,
      minWidth: 0,
    },
    userName: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.foreground,
    },
    userEmail: {
      fontSize: typography.caption,
      marginTop: 2,
      color: colors.mutedForeground,
    },
    chevron: {
      fontSize: typography.caption,
      color: colors.mutedForeground,
    },
  });

  return {
    styles,
    getThemeButtonStyle: (isActive: boolean) => [
      styles.themeButton,
      isActive ? styles.themeButtonActive : styles.themeButtonInactive,
    ],
    getThemeButtonTextStyle: (isActive: boolean) => [
      styles.themeButtonText,
      isActive ? styles.themeButtonTextActive : styles.themeButtonTextInactive,
    ],
  };
}

export function getPortalDrawerItemColors({ colors }: ThemedStylesParams) {
  return {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.sidebarForeground,
    activeBackgroundColor: colors.muted,
  };
}
