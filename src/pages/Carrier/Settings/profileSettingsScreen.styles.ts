import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { radius, spacing, typography } from '@/theme/tokens';

export function createProfileSettingsScreenStyles({ colors }: ThemedStylesParams) {
  const styles = StyleSheet.create({
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
    section: {
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
    sectionTitle: {
      fontSize: typography.body,
      fontWeight: '600',
      marginTop: spacing.sm,
      color: colors.foreground,
    },
    themeRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    themeButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeButtonActive: {
      backgroundColor: colors.primary,
    },
    themeButtonInactive: {
      backgroundColor: colors.muted,
    },
    themeButtonText: {
      textTransform: 'capitalize',
    },
    themeButtonTextActive: {
      color: colors.primaryForeground,
    },
    themeButtonTextInactive: {
      color: colors.foreground,
    },
    themeMeta: {
      fontSize: typography.caption,
      color: colors.mutedForeground,
    },
    logoutButton: {
      marginTop: spacing.md,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      backgroundColor: colors.destructive,
    },
    logoutText: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.background,
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
