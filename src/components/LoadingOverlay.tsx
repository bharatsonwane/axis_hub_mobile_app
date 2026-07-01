import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createLoadingOverlayStyles } from '@/components/loadingOverlay.styles';
import { useTheme } from '@/providers/ThemeProvider';

export default function LoadingOverlay() {
  const { colors } = useTheme();
  const { styles, activityIndicatorColor } = createLoadingOverlayStyles({
    colors,
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={activityIndicatorColor} />
    </View>
  );
}
