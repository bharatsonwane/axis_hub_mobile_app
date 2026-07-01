import PlaceholderHomeScreen from '@/screens/PlaceholderHomeScreen';
import type { MobileAuthRoute } from './types';

export const carrierRoutes: MobileAuthRoute = {
  path: '/carriers/:carrierId',
  screenName: 'CarrierPortal',
  description: 'Carrier Portal',
  screen: PlaceholderHomeScreen,
  isShowOnSidebar: false,
  title: 'Carrier Portal',
  portalContext: 'carriers',
  pathParams: ['carrierId'],
  childRoutes: [],
};
