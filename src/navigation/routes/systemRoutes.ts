import SystemDashboardScreen from '@/screens/System/Dashboard/SystemDashboardScreen';
import CarrierListScreen from '@/screens/System/Carriers/CarrierListScreen';
import CarrierDetailsScreen from '@/screens/System/Carriers/CarrierDetailsScreen';
import CustomersScreen from '@/screens/System/Customers/CustomersScreen';
import SystemMasterScreen from '@/screens/System/Master/SystemMasterScreen';
import SystemUserListScreen from '@/screens/System/SystemUsers/SystemUserListScreen';
import SystemUserDetailsScreen from '@/screens/System/SystemUsers/SystemUserDetailsScreen';
import SystemRoleListScreen from '@/screens/System/Roles/SystemRoleListScreen';
import SystemRoleDetailsScreen from '@/screens/System/Roles/SystemRoleDetailsScreen';
import SystemDbSecretsListScreen from '@/screens/System/DbSecrets/SystemDbSecretsListScreen';
import SystemDbSecretDetailsScreen from '@/screens/System/DbSecrets/SystemDbSecretDetailsScreen';
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
      allowedSystemPermissions: [
        systemPermissionKeys.ANY,
        systemPermissionKeys.TENANT_READ,
      ],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Carriers Management',
      screen: CarrierListScreen,
      isShowOnSidebar: true,
      title: 'Carriers',
      icon: 'truck',
      isCollapsible: true,
    },
    {
      path: '/system/carriers/:carrierId',
      screenName: 'SystemCarrierDetail',
      allowedSystemPermissions: [
        systemPermissionKeys.ANY,
        systemPermissionKeys.TENANT_READ,
      ],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Carrier Detail',
      screen: CarrierDetailsScreen,
      isShowOnSidebar: false,
      title: 'Carrier Detail',
    },
    {
      path: '/system/customers',
      screenName: 'SystemCustomers',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Customers Management',
      screen: CustomersScreen,
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
      screen: SystemMasterScreen,
      isShowOnSidebar: true,
      title: 'System Master',
      icon: 'settings',
      isCollapsible: true,
    },
    {
      path: '/system/users',
      screenName: 'SystemUsers',
      allowedSystemPermissions: [
        systemPermissionKeys.ANY,
        systemPermissionKeys.USER_READ,
      ],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Users',
      screen: SystemUserListScreen,
      isShowOnSidebar: false,
      title: 'System Users',
    },
    {
      path: '/system/users/:userId',
      screenName: 'SystemUserDetail',
      allowedSystemPermissions: [
        systemPermissionKeys.ANY,
        systemPermissionKeys.USER_READ,
      ],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System User Detail',
      screen: SystemUserDetailsScreen,
      isShowOnSidebar: false,
      title: 'User Detail',
    },
    {
      path: '/system/roles',
      screenName: 'SystemRoles',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Roles',
      screen: SystemRoleListScreen,
      isShowOnSidebar: false,
      title: 'System Roles',
    },
    {
      path: '/system/roles/:roleId',
      screenName: 'SystemRoleDetail',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Role Detail',
      screen: SystemRoleDetailsScreen,
      isShowOnSidebar: false,
      title: 'Role Detail',
    },
    {
      path: '/system/secrets',
      screenName: 'SystemSecrets',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Secrets',
      screen: SystemDbSecretsListScreen,
      isShowOnSidebar: true,
      title: 'Secrets',
      icon: 'key',
    },
    {
      path: '/system/secrets/:secretId',
      screenName: 'SystemSecretDetail',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Secret Detail',
      screen: SystemDbSecretDetailsScreen,
      isShowOnSidebar: false,
      title: 'Secret Detail',
    },
  ],
};
