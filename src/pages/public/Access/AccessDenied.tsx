import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { createAccessDeniedScreenStyles } from '@/pages/public/Access/accessDenied.styles';
import { useTheme } from '@/providers/ThemeProvider';

export default function AccessDenied() {
  const { colors } = useTheme();
  const styles = createAccessDeniedScreenStyles({ colors });

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Access denied</Text>
        <Text style={styles.description}>
          You do not have permission to view this screen.
        </Text>
      </View>
    </ScreenContainer>
  );
}
