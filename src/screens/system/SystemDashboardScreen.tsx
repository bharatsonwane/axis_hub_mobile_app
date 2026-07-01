import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { useTheme } from '@/providers/ThemeProvider';
import { radius, spacing, typography } from '@/theme/tokens';

const metrics = [
  { label: 'Active carriers', value: '—' },
  { label: 'Compliance alerts', value: '—' },
  { label: 'System users', value: '—' },
];

export default function SystemDashboardScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <Text style={[styles.heading, { color: colors.foreground }]}>
        Admin Dashboard
      </Text>
      <Text style={[styles.subheading, { color: colors.mutedForeground }]}>
        Read-only KPIs — full admin tools remain on web.
      </Text>
      <View style={styles.grid}>
        {metrics.map(metric => (
          <View
            key={metric.label}
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.metricValue, { color: colors.foreground }]}>
              {metric.value}
            </Text>
            <Text
              style={[styles.metricLabel, { color: colors.mutedForeground }]}
            >
              {metric.label}
            </Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.title,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subheading: {
    fontSize: typography.body,
    marginBottom: spacing.lg,
  },
  grid: {
    gap: spacing.md,
  },
  metricCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: typography.caption,
  },
});
