import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { createDashboardScreenStyles } from '@/screens/common/dashboardScreen.styles';
import { useTheme } from '@/providers/ThemeProvider';

const metrics = [
  { label: 'Active carriers', value: '—' },
  { label: 'Compliance alerts', value: '—' },
  { label: 'System users', value: '—' },
];

export default function SystemDashboardScreen() {
  const { colors } = useTheme();
  const styles = createDashboardScreenStyles({ colors });

  return (
    <ScreenContainer>
      <Text style={styles.heading}>Admin Dashboard</Text>
      <Text style={styles.subheading}>
        Read-only KPIs — full admin tools remain on web.
      </Text>
      <View style={styles.grid}>
        {metrics.map(metric => (
          <View key={metric.label} style={styles.metricCard}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}
