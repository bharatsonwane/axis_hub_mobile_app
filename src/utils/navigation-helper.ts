import type { MobileAuthRoute, PortalContext } from '@/navigation/routes/types';
import type { Permission, User } from '@/schemaTypes/authSchemaTypes';

export type PortalDestination = {
  portalContext: PortalContext;
  tenantId: number;
  customerId: number;
  path: string;
};

const hasPermission = (
  required: string[] | undefined,
  owned: Permission[] | undefined,
): boolean => {
  if (!required?.length) {
    return true;
  }
  if (required.includes('ANY')) {
    return true;
  }
  return (
    owned?.some(permission => required.includes(permission.keyName)) ?? false
  );
};

export const checkAuthorization = ({
  allowedSystemPermissions = [],
  allowedTenantPermissions = [],
  user,
}: {
  allowedSystemPermissions?: string[];
  allowedTenantPermissions?: string[];
  user?: Pick<User, 'systemPermissions' | 'tenantPermissions'> | null;
}): boolean => {
  const systemAllowed = hasPermission(
    allowedSystemPermissions,
    user?.systemPermissions,
  );
  const tenantAllowed = hasPermission(
    allowedTenantPermissions,
    user?.tenantPermissions,
  );

  if (allowedSystemPermissions.length && allowedTenantPermissions.length) {
    return systemAllowed || tenantAllowed;
  }
  if (allowedSystemPermissions.length) {
    return systemAllowed;
  }
  if (allowedTenantPermissions.length) {
    return tenantAllowed;
  }
  return true;
};

export const filterRoutesByAuthorization = ({
  routes,
  user,
}: {
  routes: MobileAuthRoute[];
  user?: Pick<User, 'systemPermissions' | 'tenantPermissions'> | null;
}): MobileAuthRoute[] =>
  routes
    .filter(route =>
      checkAuthorization({
        allowedSystemPermissions: route.allowedSystemPermissions,
        allowedTenantPermissions: route.allowedTenantPermissions,
        user,
      }),
    )
    .map(route => ({
      ...route,
      childRoutes: route.childRoutes
        ? filterRoutesByAuthorization({ routes: route.childRoutes, user })
        : undefined,
    }));

export const getSidebarRoutesForPortal = ({
  portalRoute,
  user,
}: {
  portalRoute: MobileAuthRoute;
  user?: Pick<User, 'systemPermissions' | 'tenantPermissions'> | null;
}): MobileAuthRoute[] => {
  const childRoutes = portalRoute.childRoutes ?? [];
  const allowed = filterRoutesByAuthorization({ routes: childRoutes, user });
  return allowed.filter(route => route.isShowOnSidebar);
};

export const getDefaultRoute = (routes: MobileAuthRoute[]): string => {
  if (routes.length === 0) {
    return '/login';
  }

  const firstRoute = routes[0];

  if (firstRoute.childRoutes && firstRoute.childRoutes.length > 0) {
    const firstChild = firstRoute.childRoutes[0];
    return `${firstRoute.path}${firstChild.path}`.replace(/\/+/g, '/');
  }

  return `${firstRoute.path}`.replace(/\/+/g, '/');
};

export const getDefaultRouteForUser = (
  routes: MobileAuthRoute[],
  user: Pick<User, 'isSystemUser' | 'activeTenantId' | 'systemPermissions'> | null,
): string => {
  if (!user) {
    return '/login';
  }

  const hasSystemPermissions = (user.systemPermissions?.length ?? 0) > 0;

  if (
    user.activeTenantId &&
    (!user.isSystemUser || !hasSystemPermissions)
  ) {
    return `/carriers/${user.activeTenantId}/dashboard`;
  }

  const allowed = filterRoutesByAuthorization({ routes, user });
  return getDefaultRoute(allowed);
};

export const getDefaultPortalDestination = (
  user: Pick<
    User,
    'isSystemUser' | 'activeTenantId' | 'systemPermissions'
  > | null,
  routes: MobileAuthRoute[],
): PortalDestination => {
  if (!user) {
    return {
      portalContext: 'carriers',
      tenantId: 0,
      customerId: 0,
      path: '/login',
    };
  }

  const path = getDefaultRouteForUser(routes, user);
  const hasSystemPermissions = (user.systemPermissions?.length ?? 0) > 0;

  if (
    user.activeTenantId &&
    (!user.isSystemUser || !hasSystemPermissions)
  ) {
    return {
      portalContext: 'carriers',
      tenantId: user.activeTenantId,
      customerId: 0,
      path,
    };
  }

  const allowed = filterRoutesByAuthorization({ routes, user });
  const first = allowed[0];
  const portalContext = first?.portalContext ?? 'system';

  return {
    portalContext,
    tenantId: portalContext === 'carriers' ? user.activeTenantId ?? 0 : 0,
    customerId: 0,
    path,
  };
};
