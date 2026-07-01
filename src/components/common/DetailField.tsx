import React from 'react';
import { Text, View } from 'react-native';
import { createSystemDetailScreenStyles } from '@/pages/System/shared/detailScreen.styles';
import { useTheme } from '@/providers/ThemeProvider';

type DetailFieldProps = {
  label: string;
  value: string;
  masked?: boolean;
};

export default function DetailField({ label, value, masked }: DetailFieldProps) {
  const { colors } = useTheme();
  const styles = createSystemDetailScreenStyles({ colors });

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={masked ? styles.maskedValue : styles.value}>{value}</Text>
    </View>
  );
}
