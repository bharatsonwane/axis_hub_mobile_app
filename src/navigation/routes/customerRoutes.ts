import PlaceholderHomeScreen from '@/screens/PlaceholderHomeScreen';
import type { MobileAuthRoute } from './types';

export const customerRoutes: MobileAuthRoute = {
  path: '/customers/:customerId',
  screenName: 'CustomerPortal',
  description: 'Customer Portal',
  screen: PlaceholderHomeScreen,
  isShowOnSidebar: false,
  title: 'Customer Portal',
  portalContext: 'customers',
  pathParams: ['customerId'],
  childRoutes: [],
};
