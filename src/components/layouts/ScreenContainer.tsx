import React, { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

type ScreenContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function ScreenContainer({
  children,
  style,
}: ScreenContainerProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }, style]}
    >
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
