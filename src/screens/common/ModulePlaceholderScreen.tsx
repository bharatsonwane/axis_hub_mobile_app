import React from 'react';
import { Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { createModulePlaceholderScreenStyles } from '@/screens/common/modulePlaceholderScreen.styles';
import { useTheme } from '@/providers/ThemeProvider';

type ModulePlaceholderScreenProps = {
  title: string;
  description: string;
};

export default function ModulePlaceholderScreen({
  title,
  description,
}: ModulePlaceholderScreenProps) {
  const { colors } = useTheme();
  const styles = createModulePlaceholderScreenStyles({ colors });

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.hint}>Coming in a future phase.</Text>
      </View>
    </ScreenContainer>
  );
}
