import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { createSystemListScreenStyles } from '@/pages/System/shared/listScreen.styles';
import { useTheme } from '@/providers/ThemeProvider';

export default function CustomersScreen() {
  const { colors } = useTheme();
  const styles = createSystemListScreenStyles({ colors });

  return (
    <ScreenContainer>
      <Text style={styles.heading}>Customers</Text>
      <Text style={styles.subheading}>
        System-level customer management is not yet available on the API. This
        screen will list platform customers when the web system customer module
        ships.
      </Text>
      <View style={styles.hubCard}>
        <Text style={styles.hubTitle}>Coming soon</Text>
        <Text style={styles.hubDescription}>
          No `/api/system/customers` endpoint exists yet. Customer data remains
          tenant-scoped on web until system routes are implemented.
        </Text>
      </View>
    </ScreenContainer>
  );
}
