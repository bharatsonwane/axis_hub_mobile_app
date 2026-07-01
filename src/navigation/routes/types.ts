import type { ComponentType } from 'react';

export type PortalContext = 'system' | 'carriers' | 'customers';

export interface MobileAuthRoute {
  path: string;
  screenName: string;
  allowedSystemPermissions?: string[];
  allowedTenantPermissions?: string[];
  description: string;
  screen: ComponentType;
  isShowOnSidebar: boolean;
  title: string;
  icon?: string;
  portalIcon?: string;
  isCollapsible?: boolean;
  childRoutes?: MobileAuthRoute[];
  portalContext?: PortalContext;
  pathParams?: string[];
}
