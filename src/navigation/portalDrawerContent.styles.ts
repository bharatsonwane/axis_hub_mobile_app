import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

export function createPortalDrawerContentStyles({ colors }: ThemedStylesParams) {
  return StyleSheet.create({
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
    portalTitle: {
      fontSize: typography.subtitle,
      fontWeight: '700',
      color: colors.sidebarForeground,
    },
    portalSubtitle: {
      fontSize: typography.caption,
      marginTop: spacing.xs,
      color: colors.mutedForeground,
    },
    menu: {
      paddingTop: spacing.sm,
    },
    footer: {
      borderTopWidth: 1,
      padding: spacing.md,
      borderTopColor: colors.border,
    },
    profileButton: {
      borderWidth: 1,
      borderRadius: radius.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      alignItems: 'center',
      backgroundColor: colors.muted,
      borderColor: colors.border,
    },
    profileText: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.foreground,
    },
  });
}

export function getPortalDrawerItemColors({ colors }: ThemedStylesParams) {
  return {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.sidebarForeground,
    activeBackgroundColor: colors.muted,
  };
}
