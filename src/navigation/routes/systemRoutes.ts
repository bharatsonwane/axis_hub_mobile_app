import PlaceholderHomeScreen from '@/screens/PlaceholderHomeScreen';
import type { MobileAuthRoute } from './types';

export const systemRoutes: MobileAuthRoute = {
  path: '/system',
  screenName: 'SystemPortal',
  description: 'Admin Portal',
  screen: PlaceholderHomeScreen,
  isShowOnSidebar: false,
  title: 'Admin Portal',
  portalContext: 'system',
  childRoutes: [],
};
