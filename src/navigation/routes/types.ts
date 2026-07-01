import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react-native';

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
  icon?: LucideIcon;
  portalIcon?: LucideIcon;
  isCollapsible?: boolean;
  childRoutes?: MobileAuthRoute[];
  portalContext?: PortalContext;
  pathParams?: string[];
}
