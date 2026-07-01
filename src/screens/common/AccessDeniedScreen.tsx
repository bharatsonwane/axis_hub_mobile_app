import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { useTheme } from '@/providers/ThemeProvider';
import { radius, spacing, typography } from '@/theme/tokens';

export default function AccessDeniedScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.foreground }]}>
          Access denied
        </Text>
        <Text style={[styles.description, { color: colors.mutedForeground }]}>
          You do not have permission to view this screen.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
  },
  description: {
    fontSize: typography.body,
  },
});
