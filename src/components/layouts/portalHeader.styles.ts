import { StyleSheet } from 'react-native';
import type { ThemedStylesParams } from '@/theme/createThemedStyles';
import { spacing, typography } from '@/theme/tokens';

type CreatePortalHeaderStylesParams = ThemedStylesParams & {
  paddingTop: number;
};

export function createPortalHeaderStyles({
  colors,
  paddingTop,
}: CreatePortalHeaderStylesParams) {
  return StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      backgroundColor: colors.sidebar,
      borderBottomColor: colors.border,
      paddingTop,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      gap: spacing.sm,
    },
    menuButton: {
      padding: spacing.xs,
    },
    menuIcon: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.sidebarForeground,
    },
    titleBlock: {
      flex: 1,
    },
    title: {
      fontSize: typography.body,
      fontWeight: '700',
      color: colors.sidebarForeground,
    },
    subtitle: {
      fontSize: typography.caption,
      color: colors.mutedForeground,
    },
  });
}
