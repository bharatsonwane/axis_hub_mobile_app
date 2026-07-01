import React from 'react';
import { Image, StyleSheet } from 'react-native';
import BrandDark from '@/assets/BrandDark.png';
import BrandWhite from '@/assets/BrandWhite.png';
import { useTheme } from '@/providers/ThemeProvider';

export default function ThemeLogo() {
  const { resolvedTheme } = useTheme();
  const source = resolvedTheme === 'dark' ? BrandWhite : BrandDark;

  return (
    <Image
      source={source}
      style={styles.logo}
      resizeMode="contain"
      accessibilityLabel="Axis Hub logo"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 32,
    width: 120,
  },
});
