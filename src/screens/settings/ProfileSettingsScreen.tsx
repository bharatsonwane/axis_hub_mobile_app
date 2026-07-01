import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { useAuth } from '@/contexts/AuthContextProvider';
import { useTheme } from '@/providers/ThemeProvider';
import type { ThemePreference } from '@/theme/types';
import { radius, spacing, typography } from '@/theme/tokens';
import { showSuccessToast } from '@/utils/toast';

const themeOptions: ThemePreference[] = ['light', 'dark', 'system'];

export default function ProfileSettingsScreen() {
  const { colors, theme, resolvedTheme, setTheme } = useTheme();
  const { loggedInUser, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => showSuccessToast('Signed out'))
      .catch(() => undefined);
  };

  return (
    <ScreenContainer>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.foreground }]}>
          Profile & Settings
        </Text>

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>
            Name
          </Text>
          <Text style={[styles.value, { color: colors.foreground }]}>
            {[loggedInUser?.firstName, loggedInUser?.lastName]
              .filter(Boolean)
              .join(' ') || '—'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>
            Email
          </Text>
          <Text style={[styles.value, { color: colors.foreground }]}>
            {loggedInUser?.email ?? '—'}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Appearance
        </Text>
        <View style={styles.themeRow}>
          {themeOptions.map(option => {
            const isActive = theme === option;
            return (
              <Pressable
                key={option}
                onPress={() => setTheme(option)}
                style={[
                  styles.themeButton,
                  {
                    backgroundColor: isActive ? colors.primary : colors.muted,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.themeButtonText,
                    {
                      color: isActive
                        ? colors.primaryForeground
                        : colors.foreground,
                    },
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={[styles.themeMeta, { color: colors.mutedForeground }]}>
          Resolved: {resolvedTheme}
        </Text>

        <Pressable
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: colors.destructive }]}
        >
          <Text style={[styles.logoutText, { color: colors.background }]}>
            Log out
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
  },
  section: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.caption,
    fontWeight: '600',
  },
  value: {
    fontSize: typography.body,
  },
  sectionTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  themeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  themeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  themeButtonText: {
    textTransform: 'capitalize',
  },
  themeMeta: {
    fontSize: typography.caption,
  },
  logoutButton: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: typography.body,
    fontWeight: '600',
  },
});
