import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import { createDashboardScreenStyles } from '@/pages/common/dashboardScreen.styles';
import { useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';

const metrics = [
  { label: 'Inbox orders', value: '—' },
  { label: 'In dispatch', value: '—' },
  { label: 'Delivered today', value: '—' },
];

export default function CarrierDashboard() {
  const { colors } = useTheme();
  const styles = createDashboardScreenStyles({ colors });
  const { tenantId } = usePortalContext();
  const currentTenant = useAppSelector(state => state.user.currentTenant);

  return (
    <ScreenContainer>
      <Text style={styles.heading}>Carrier Dashboard</Text>
      <Text style={styles.subheading}>
        {currentTenant?.name ?? `Tenant #${tenantId}`}
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
