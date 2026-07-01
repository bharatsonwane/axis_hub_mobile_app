import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { fetchSystemDashboardStats } from '@/redux/actions/systemCarrierActions';
import {
  selectSystemDashboardLoading,
  selectSystemDashboardStats,
} from '@/redux/slices/systemCarrierSlice';
import { createDashboardScreenStyles } from '@/screens/common/dashboardScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { showErrorToast } from '@/utils/toast';

export default function SystemDashboardScreen() {
  const { colors } = useTheme();
  const styles = createDashboardScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectSystemDashboardStats);
  const isLoading = useAppSelector(selectSystemDashboardLoading);

  const loadStats = useCallback(() => {
    dispatch(fetchSystemDashboardStats())
      .unwrap()
      .catch(error => {
        showErrorToast(
          typeof error === 'string' ? error : 'Failed to load dashboard',
        );
      });
  }, [dispatch]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const metrics = [
    { label: 'Active carriers', value: stats?.activeCarriers },
    { label: 'Requested carriers', value: stats?.requestedCarriers },
    { label: 'System users', value: stats?.systemUsers },
    { label: 'System roles', value: stats?.systemRoles },
  ];

  const formatMetric = (value: number | undefined) => {
    if (isLoading && value === undefined) {
      return '…';
    }
    if (value === undefined) {
      return '—';
    }
    return String(value);
  };

  return (
    <ScreenContainer>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadStats} />
        }
      >
        <Text style={styles.heading}>Admin Dashboard</Text>
        <Text style={styles.subheading}>
          Read-only KPIs — full admin tools remain on web.
        </Text>

        {isLoading && !stats ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <View style={styles.grid}>
            {metrics.map(metric => (
              <View key={metric.label} style={styles.metricCard}>
                <Text style={styles.metricValue}>
                  {formatMetric(metric.value)}
                </Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
