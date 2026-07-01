import { StyleSheet } from 'react-native';
import type { ThemeTokens } from '@/theme/types';
import { radius, spacing, typography } from '@/theme/tokens';

type CreateLoginScreenStylesParams = {
  colors: ThemeTokens;
  isLoading: boolean;
};

export function createLoginScreenStyles({
  colors,
  isLoading,
}: CreateLoginScreenStylesParams) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
      gap: spacing.lg,
    },
    brandCard: {
      borderRadius: radius.lg,
      padding: spacing.lg,
      alignItems: 'center',
      backgroundColor: colors.foreground,
    },
    brandTitle: {
      fontSize: typography.title,
      fontWeight: '700',
      color: colors.background,
    },
    brandSubtitle: {
      fontSize: typography.subtitle,
      marginTop: spacing.xs,
      color: colors.muted,
    },
    formCard: {
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
      textAlign: 'center',
      color: colors.foreground,
    },
    subtitle: {
      fontSize: typography.body,
      textAlign: 'center',
      color: colors.mutedForeground,
    },
    errorBanner: {
      fontSize: typography.caption,
      textAlign: 'center',
      color: colors.destructive,
    },
    fieldGroup: {
      gap: spacing.xs,
    },
    label: {
      fontSize: typography.caption,
      fontWeight: '600',
      color: colors.foreground,
    },
    input: {
      borderWidth: 1,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      fontSize: typography.body,
      color: colors.foreground,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    passwordRow: {
      position: 'relative',
    },
    passwordInput: {
      paddingRight: 64,
    },
    showPasswordButton: {
      position: 'absolute',
      right: spacing.md,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    showPasswordText: {
      color: colors.primary,
    },
    fieldError: {
      fontSize: typography.caption,
      color: colors.destructive,
    },
    submitButton: {
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      marginTop: spacing.sm,
      backgroundColor: colors.primary,
      opacity: isLoading ? 0.7 : 1,
    },
    submitButtonText: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.primaryForeground,
    },
    version: {
      textAlign: 'right',
      fontSize: typography.caption,
      color: colors.mutedForeground,
    },
  });

  return {
    styles,
    placeholderTextColor: colors.mutedForeground,
    activityIndicatorColor: colors.primaryForeground,
  };
}
