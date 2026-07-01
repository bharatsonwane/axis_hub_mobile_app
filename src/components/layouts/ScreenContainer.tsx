import React, { type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createScreenContainerStyles } from '@/components/layouts/screenContainer.styles';
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
  const { safeAreaStyle, contentStyle } = createScreenContainerStyles({
    colors,
    style,
  });

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={contentStyle}>{children}</View>
    </SafeAreaView>
  );
}
