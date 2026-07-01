import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { envConfig } from '@/config/envConfig';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { useAuth } from '@/contexts/AuthContextProvider';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import { useTheme } from '@/providers/ThemeProvider';
import type { ThemePreference } from '@/theme/types';
import { radius, spacing, typography } from '@/theme/tokens';
import { useAppSelector } from '@/redux/store';

const themeOptions: ThemePreference[] = ['light', 'dark', 'system'];

export default function PlaceholderHomeScreen() {
  const { colors, theme, resolvedTheme, setTheme } = useTheme();
  const { portalContext, tenantId } = usePortalContext();
  const { loggedInUser, logout } = useAuth();
  const currentTenant = useAppSelector(state => state.user.currentTenant);

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
          Signed in
        </Text>

        <View style={styles.metaBlock}>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            User: {loggedInUser?.email ?? '—'}
          </Text>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            Portal: {portalContext}
          </Text>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            Tenant:{' '}
            {currentTenant?.name ??
              (tenantId ? String(tenantId) : '—')}
          </Text>
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            Theme: {theme} ({resolvedTheme})
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

        <Pressable
          onPress={() => {
            logout().catch(() => undefined);
          }}
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.destructive,
            },
          ]}
        >
          <Text style={[styles.logoutButtonText, { color: colors.background }]}>
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
  logoutButton: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
  },
});
