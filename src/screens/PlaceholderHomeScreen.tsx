import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { envConfig } from '@/config/envConfig';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import { useTheme } from '@/providers/ThemeProvider';
import type { ThemePreference } from '@/theme/types';
import { radius, spacing, typography } from '@/theme/tokens';
import { useAppSelector } from '@/redux/store';

const themeOptions: ThemePreference[] = ['light', 'dark', 'system'];

export default function PlaceholderHomeScreen() {
  const { colors, theme, resolvedTheme, setTheme } = useTheme();
  const { portalContext } = usePortalContext();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

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
          {envConfig.app.APP_NAME}
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Mobile foundation ready
        </Text>

        <View style={styles.metaBlock}>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            Portal: {portalContext}
          </Text>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            Theme: {theme} ({resolvedTheme})
          </Text>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            API: {envConfig.api.API_BASE_URL}
          </Text>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            Auth: {isAuthenticated ? 'signed in' : 'signed out'}
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.foreground }]}>
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
  subtitle: {
    fontSize: typography.subtitle,
  },
  metaBlock: {
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  meta: {
    fontSize: typography.caption,
  },
  sectionLabel: {
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
});
