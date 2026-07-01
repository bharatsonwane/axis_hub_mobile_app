import React from 'react';
import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import { withPortalGuard } from '@/navigation/guards/PortalGuard';
import PortalDrawerContent from '@/navigation/PortalDrawerContent';
import ProfileSettingsScreen from '@/screens/Carrier/Settings/ProfileSettings';
import PortalHeader from '@/components/layouts/PortalHeader';
import { useAppSelector } from '@/redux/store';
import {
  getAllRoutesForPortal,
  getSidebarRoutesForPortal,
} from '@/utils/navigation-helper';

export type PortalDrawerParamList = Record<string, undefined>;

const Drawer = createDrawerNavigator<PortalDrawerParamList>();

function createDrawerContent(portalRoute: MobileAuthRoute) {
  return function DrawerContent(props: DrawerContentComponentProps) {
    return <PortalDrawerContent {...props} portalRoute={portalRoute} />;
  };
}

function createPortalHeader(portalRoute: MobileAuthRoute) {
  return function PortalHeaderWrapper(
    props: React.ComponentProps<typeof PortalHeader>,
  ) {
    return <PortalHeader {...props} portalRoute={portalRoute} />;
  };
}

export function buildPortalDrawerNavigator(portalRoute: MobileAuthRoute) {
  const PortalHeaderComponent = createPortalHeader(portalRoute);
  const DrawerContent = createDrawerContent(portalRoute);

  return function PortalDrawerNavigator() {
    const user = useAppSelector(state => state.user.user);
    const sidebarRoutes = getSidebarRoutesForPortal({ portalRoute, user });
    const allRoutes = getAllRoutesForPortal({ portalRoute, user });
    const initialRouteName =
      sidebarRoutes.find(route => route.screenName.includes('Dashboard'))
        ?.screenName ?? sidebarRoutes[0]?.screenName;

    if (sidebarRoutes.length === 0) {
      return null;
    }

    return (
      <Drawer.Navigator
        initialRouteName={initialRouteName}
        drawerContent={DrawerContent}
        backBehavior="history"
        screenOptions={{
          header: PortalHeaderComponent,
        }}
      >
        {allRoutes.map(route => (
          <Drawer.Screen
            key={route.screenName}
            name={route.screenName}
            component={withPortalGuard(route.screen, route)}
            options={{
              title: route.title,
              drawerItemStyle: route.isShowOnSidebar
                ? undefined
                : { display: 'none' },
            }}
          />
        ))}
        <Drawer.Screen
          name="ProfileSettings"
          component={ProfileSettingsScreen}
          options={{
            title: 'Profile & Settings',
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer.Navigator>
    );
  };
}
