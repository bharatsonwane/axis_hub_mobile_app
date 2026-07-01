export interface Role {
  id: number;
  keyName: string;
  name: string;
}

export interface Permission {
  id: number;
  keyName: string;
  name: string;
}

export interface UserTenant {
  id: number;
  keyName: string;
  name: string;
  isUsingAxis?: boolean;
}

export interface User {
  id: number;
  isSystemUser: boolean;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isArchived: boolean;
  createdAt: string;
  tenants: UserTenant[];
  activeTenantId: number;
  tenantRoles: Role[];
  tenantPermissions: Permission[];
  systemRoles: Role[];
  systemPermissions: Permission[];
  roles?: string[];
}

export interface TenantInfo {
  id: number;
  keyName: string;
  name: string;
}

export interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  tenants: TenantInfo[];
  currentTenant: TenantInfo | null;
  isLoadingTenants: boolean;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}
