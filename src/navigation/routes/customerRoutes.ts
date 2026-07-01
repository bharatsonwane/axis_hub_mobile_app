import { createPlaceholderScreen } from '@/navigation/createPlaceholderScreen';
import {
  systemPermissionKeys,
  tenantPermissionKeys,
} from '@/utils/constants/permissions';
import type { MobileAuthRoute } from './types';

export const customerRoutes: MobileAuthRoute = {
  path: '/customers/:customerId',
  screenName: 'CustomerPortal',
  allowedSystemPermissions: [systemPermissionKeys.ANY],
  allowedTenantPermissions: [tenantPermissionKeys.ANY],
  description: 'Customer Portal',
  screen: createPlaceholderScreen(
    'Customer Portal',
    'Customer portal shell — screens ship with web routes.',
  ),
  isShowOnSidebar: false,
  title: 'Customer Portal',
  portalContext: 'customers',
  portalIcon: 'users',
  pathParams: ['customerId'],
  childRoutes: [
    {
      path: '/customers/:customerId/dashboard',
      screenName: 'CustomerDashboard',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Customer Dashboard',
      screen: createPlaceholderScreen(
        'Customer Dashboard',
        'Order status and documents for customer users.',
      ),
      isShowOnSidebar: true,
      title: 'Dashboard',
      icon: 'dashboard',
    },
  ],
};
