import SystemDashboardScreen from '@/screens/system/SystemDashboardScreen';
import { createPlaceholderScreen } from '@/navigation/createPlaceholderScreen';
import {
  systemPermissionKeys,
  tenantPermissionKeys,
} from '@/utils/constants/permissions';
import type { MobileAuthRoute } from './types';

export const systemRoutes: MobileAuthRoute = {
  path: '/system',
  screenName: 'SystemPortal',
  allowedSystemPermissions: [systemPermissionKeys.ANY],
  allowedTenantPermissions: [tenantPermissionKeys.ANY],
  description: 'Admin Portal',
  screen: SystemDashboardScreen,
  isShowOnSidebar: false,
  title: 'Admin Portal',
  portalContext: 'system',
  portalIcon: 'shield',
  childRoutes: [
    {
      path: '/system/dashboard',
      screenName: 'SystemDashboard',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Admin Dashboard',
      screen: SystemDashboardScreen,
      isShowOnSidebar: true,
      title: 'Dashboard',
      icon: 'dashboard',
    },
    {
      path: '/system/carriers',
      screenName: 'SystemCarriers',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Carriers Management',
      screen: createPlaceholderScreen(
        'Carriers',
        'Browse and manage carrier tenants.',
      ),
      isShowOnSidebar: true,
      title: 'Carriers',
      icon: 'truck',
      isCollapsible: true,
    },
    {
      path: '/system/customers',
      screenName: 'SystemCustomers',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Customers Management',
      screen: createPlaceholderScreen(
        'Customers',
        'System-level customer management.',
      ),
      isShowOnSidebar: true,
      title: 'Customers',
      icon: 'users',
    },
    {
      path: '/system/master',
      screenName: 'SystemMaster',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Master Data',
      screen: createPlaceholderScreen(
        'System Master',
        'Users, roles, and system configuration.',
      ),
      isShowOnSidebar: true,
      title: 'System Master',
      icon: 'settings',
      isCollapsible: true,
    },
    {
      path: '/system/secrets',
      screenName: 'SystemSecrets',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Secrets',
      screen: createPlaceholderScreen(
        'System Secrets',
        'Manage system secrets and credentials.',
      ),
      isShowOnSidebar: true,
      title: 'Secrets',
      icon: 'key',
    },
  ],
};
