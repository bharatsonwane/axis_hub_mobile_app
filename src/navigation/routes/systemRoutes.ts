import SystemDashboard from '@/pages/System/Dashboard/system-dashboard';
import CarrierList from '@/pages/System/Carriers/CarrierList';
import CarrierDetails from '@/pages/System/Carriers/CarrierDetails';
import Customers from '@/pages/System/Customers/customers';
import SystemMaster from '@/pages/System/Master/SystemMaster';
import SystemUserList from '@/pages/System/SystemUsers/SystemUserList';
import SystemUserDetails from '@/pages/System/SystemUsers/SystemUserDetails';
import SystemRoleList from '@/pages/System/Roles/SystemRoleList';
import SystemRoleDetails from '@/pages/System/Roles/SystemRoleDetails';
import SystemDbSecretsList from '@/pages/System/DbSecrets/SystemDbSecretsList';
import SystemDbSecretDetails from '@/pages/System/DbSecrets/SystemDbSecretDetails';
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
  screen: SystemDashboard,
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
      screen: SystemDashboard,
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
      screen: CarrierList,
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
      screen: CarrierDetails,
      isShowOnSidebar: false,
      title: 'Carrier Detail',
    },
    {
      path: '/system/customers',
      screenName: 'SystemCustomers',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'Customers Management',
      screen: Customers,
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
      screen: SystemMaster,
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
      screen: SystemUserList,
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
      screen: SystemUserDetails,
      isShowOnSidebar: false,
      title: 'User Detail',
    },
    {
      path: '/system/roles',
      screenName: 'SystemRoles',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Roles',
      screen: SystemRoleList,
      isShowOnSidebar: false,
      title: 'System Roles',
    },
    {
      path: '/system/roles/:roleId',
      screenName: 'SystemRoleDetail',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Role Detail',
      screen: SystemRoleDetails,
      isShowOnSidebar: false,
      title: 'Role Detail',
    },
    {
      path: '/system/secrets',
      screenName: 'SystemSecrets',
      allowedSystemPermissions: [systemPermissionKeys.ANY],
      allowedTenantPermissions: [tenantPermissionKeys.ANY],
      description: 'System Secrets',
      screen: SystemDbSecretsList,
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
      screen: SystemDbSecretDetails,
      isShowOnSidebar: false,
      title: 'Secret Detail',
    },
  ],
};
