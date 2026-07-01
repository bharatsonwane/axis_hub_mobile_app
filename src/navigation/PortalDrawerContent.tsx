import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Pressable, Text, View } from 'react-native';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import {
  createPortalDrawerContentStyles,
  getPortalDrawerItemColors,
} from '@/navigation/portalDrawerContent.styles';
import { useAuth } from '@/contexts/AuthContextProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppSelector } from '@/redux/store';
import { getSidebarRoutesForPortal } from '@/utils/navigation-helper';

type PortalDrawerContentProps = DrawerContentComponentProps & {
  portalRoute: MobileAuthRoute;
};

export default function PortalDrawerContent({
  navigation,
  state,
  portalRoute,
}: PortalDrawerContentProps) {
  const { colors } = useTheme();
  const styles = createPortalDrawerContentStyles({ colors });
  const drawerItemColors = getPortalDrawerItemColors({ colors });
  const { loggedInUser } = useAuth();
  const user = useAppSelector(s => s.user.user);
  const sidebarRoutes = getSidebarRoutesForPortal({
    portalRoute,
    user: loggedInUser ?? user,
  });
  const activeRouteName = state.routes[state.index]?.name;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.portalTitle}>{portalRoute.title}</Text>
        <Text style={styles.portalSubtitle}>{loggedInUser?.email}</Text>
      </View>

      <DrawerContentScrollView contentContainerStyle={styles.menu}>
        {sidebarRoutes.map(route => {
          const isActive = activeRouteName === route.screenName;
          return (
            <DrawerItem
              key={route.screenName}
              label={route.title}
              focused={isActive}
              activeTintColor={drawerItemColors.activeTintColor}
              inactiveTintColor={drawerItemColors.inactiveTintColor}
              activeBackgroundColor={drawerItemColors.activeBackgroundColor}
              onPress={() => navigation.navigate(route.screenName)}
            />
          );
        })}
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate('ProfileSettings')}
          style={styles.profileButton}
        >
          <Text style={styles.profileText}>Profile & Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}
