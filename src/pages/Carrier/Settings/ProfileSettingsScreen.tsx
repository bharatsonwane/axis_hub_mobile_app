import React from 'react';
import { Pressable, Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { useAuth } from '@/contexts/AuthContextProvider';
import { createProfileSettingsScreenStyles } from '@/pages/Carrier/Settings/profileSettingsScreen.styles';
import { useTheme } from '@/providers/ThemeProvider';
import type { ThemePreference } from '@/theme/types';
import { showSuccessToast } from '@/utils/toast';

const themeOptions: ThemePreference[] = ['light', 'dark', 'system'];

export default function ProfileSettingsScreen() {
  const { colors, theme, resolvedTheme, setTheme } = useTheme();
  const { loggedInUser, logout } = useAuth();
  const { styles, getThemeButtonStyle, getThemeButtonTextStyle } =
    createProfileSettingsScreenStyles({ colors });

  const handleLogout = () => {
    logout()
      .then(() => showSuccessToast('Signed out'))
      .catch(() => undefined);
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Text style={styles.title}>Profile & Settings</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {[loggedInUser?.firstName, loggedInUser?.lastName]
              .filter(Boolean)
              .join(' ') || '—'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{loggedInUser?.email ?? '—'}</Text>
        </View>

        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.themeRow}>
          {themeOptions.map(option => {
            const isActive = theme === option;
            return (
              <Pressable
                key={option}
                onPress={() => setTheme(option)}
                style={getThemeButtonStyle(isActive)}
              >
                <Text style={getThemeButtonTextStyle(isActive)}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.themeMeta}>Resolved: {resolvedTheme}</Text>

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
