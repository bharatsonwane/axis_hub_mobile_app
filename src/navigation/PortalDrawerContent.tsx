import React from 'react';
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import ThemeLogo from '@/components/layouts/ThemeLogo';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import {
  createPortalDrawerContentStyles,
  getPortalDrawerItemColors,
} from '@/navigation/portalDrawerContent.styles';
import { useAuth } from '@/contexts/AuthContextProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppSelector } from '@/redux/store';
import type { ThemePreference } from '@/theme/types';
import { getSidebarRoutesForPortal } from '@/utils/navigation-helper';

type PortalDrawerContentProps = DrawerContentComponentProps & {
  portalRoute: MobileAuthRoute;
};

const themeOptions: ThemePreference[] = ['light', 'dark', 'system'];

function getUserInitials(firstName?: string | null, lastName?: string | null) {
  const first = firstName?.trim().charAt(0) ?? '';
  const last = lastName?.trim().charAt(0) ?? '';
  const initials = `${first}${last}`.toUpperCase();
  return initials || '?';
}

export default function PortalDrawerContent({
  navigation,
  state,
  portalRoute,
}: PortalDrawerContentProps) {
  const { colors, theme, setTheme } = useTheme();
  const { styles, getThemeButtonStyle, getThemeButtonTextStyle } =
    createPortalDrawerContentStyles({ colors });
  const drawerItemColors = getPortalDrawerItemColors({ colors });
  const { loggedInUser } = useAuth();
  const user = useAppSelector(s => s.user.user);
  const activeUser = loggedInUser ?? user;
  const sidebarRoutes = getSidebarRoutesForPortal({
    portalRoute,
    user: activeUser,
  });
  const activeRouteName = state.routes[state.index]?.name;
  const displayName =
    [activeUser?.firstName, activeUser?.lastName].filter(Boolean).join(' ') ||
    'User';
  const email = activeUser?.email ?? '';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemeLogo />
      </View>

      <DrawerContentScrollView contentContainerStyle={styles.menu}>
        {sidebarRoutes.map(route => {
          const isActive = activeRouteName === route.screenName;
          const tintColor = isActive
            ? drawerItemColors.activeTintColor
            : drawerItemColors.inactiveTintColor;
          const IconComponent = route.icon;

          return (
            <Pressable
              key={route.screenName}
              onPress={() => navigation.navigate(route.screenName)}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
            >
              {IconComponent ? (
                <IconComponent color={tintColor} size={20} />
              ) : null}
              <Text style={[styles.menuItemLabel, { color: tintColor }]}>
                {route.title}
              </Text>
              {route.isCollapsible ? (
                <ChevronRight color={colors.mutedForeground} size={16} />
              ) : null}
            </Pressable>
          );
        })}
      </DrawerContentScrollView>

      <View style={styles.themeSection}>
        <Text style={styles.themeLabel}>Appearance</Text>
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
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate('ProfileSettings')}
          style={styles.userCard}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getUserInitials(activeUser?.firstName, activeUser?.lastName)}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {displayName}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {email || '—'}
            </Text>
          </View>
          <Text style={styles.chevron}>▾</Text>
        </Pressable>
      </View>
    </View>
  );
}
