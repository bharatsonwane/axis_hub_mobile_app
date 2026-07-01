import type { MobileAuthRoute } from '@/navigation/routes/types';
import type { Permission, User } from '@/schemaTypes/authSchemaTypes';

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

export const getDefaultRouteForUser = (
  routes: MobileAuthRoute[],
  user: Pick<User, 'isSystemUser' | 'activeTenantId' | 'systemPermissions'> | null,
): string => {
  if (!user) {
    return '/login';
  }

  if (user.activeTenantId && (!user.isSystemUser || !user.systemPermissions?.length)) {
    return `/carriers/${user.activeTenantId}/dashboard`;
  }

  const allowed = filterRoutesByAuthorization({ routes, user });
  const first = allowed[0];
  return first?.path ?? '/login';
};
