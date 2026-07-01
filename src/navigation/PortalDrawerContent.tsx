import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import { useAuth } from '@/contexts/AuthContextProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppSelector } from '@/redux/store';
import { getSidebarRoutesForPortal } from '@/utils/navigation-helper';
import { radius, spacing, typography } from '@/theme/tokens';

type PortalDrawerContentProps = DrawerContentComponentProps & {
  portalRoute: MobileAuthRoute;
};

export default function PortalDrawerContent({
  navigation,
  state,
  portalRoute,
}: PortalDrawerContentProps) {
  const { colors } = useTheme();
  const { loggedInUser } = useAuth();
  const user = useAppSelector(s => s.user.user);
  const sidebarRoutes = getSidebarRoutesForPortal({
    portalRoute,
    user: loggedInUser ?? user,
  });
  const activeRouteName = state.routes[state.index]?.name;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.sidebar }]}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.portalTitle, { color: colors.sidebarForeground }]}>
          {portalRoute.title}
        </Text>
        <Text style={[styles.portalSubtitle, { color: colors.mutedForeground }]}>
          {loggedInUser?.email}
        </Text>
      </View>

      <DrawerContentScrollView contentContainerStyle={styles.menu}>
        {sidebarRoutes.map(route => {
          const isActive = activeRouteName === route.screenName;
          return (
            <DrawerItem
              key={route.screenName}
              label={route.title}
              focused={isActive}
              activeTintColor={colors.primary}
              inactiveTintColor={colors.sidebarForeground}
              activeBackgroundColor={colors.muted}
              onPress={() => navigation.navigate(route.screenName)}
            />
          );
        })}
      </DrawerContentScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Pressable
          onPress={() => navigation.navigate('ProfileSettings')}
          style={[
            styles.profileButton,
            {
              backgroundColor: colors.muted,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.profileText, { color: colors.foreground }]}>
            Profile & Settings
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  portalTitle: {
    fontSize: typography.subtitle,
    fontWeight: '700',
  },
  portalSubtitle: {
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  menu: {
    paddingTop: spacing.sm,
  },
  footer: {
    borderTopWidth: 1,
    padding: spacing.md,
  },
  profileButton: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  profileText: {
    fontSize: typography.body,
    fontWeight: '600',
  },
});
