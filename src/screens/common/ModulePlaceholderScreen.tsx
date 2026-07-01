import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { useTheme } from '@/providers/ThemeProvider';
import { radius, spacing, typography } from '@/theme/tokens';

type ModulePlaceholderScreenProps = {
  title: string;
  description: string;
};

export default function ModulePlaceholderScreen({
  title,
  description,
}: ModulePlaceholderScreenProps) {
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
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.mutedForeground }]}>
          {description}
        </Text>
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>
          Coming in a future phase.
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
  hint: {
    fontSize: typography.caption,
    marginTop: spacing.sm,
  },
});
