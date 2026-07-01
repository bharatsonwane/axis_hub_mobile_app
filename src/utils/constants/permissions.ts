export const systemPermissionKeys = {
  ANY: 'ANY',
  USER_CREATE: 'USER_CREATE',
  USER_READ: 'USER_READ',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',
  TENANT_CREATE: 'TENANT_CREATE',
  TENANT_READ: 'TENANT_READ',
  TENANT_UPDATE: 'TENANT_UPDATE',
  TENANT_DELETE: 'TENANT_DELETE',
} as const;

export const tenantPermissionKeys = {
  ANY: 'ANY',
} as const;
