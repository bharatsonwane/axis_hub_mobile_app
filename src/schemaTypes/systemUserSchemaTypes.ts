import type { Lookup } from '@/schemaTypes/lookupSchemaTypes';
import type { RoleEntitySchema } from '@/schemaTypes/rolePermissionsSchemaType';

export interface SystemUser {
  id: number;
  status: Lookup;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  email: string | null;
  mobileNumber: string | null;
  isActive: boolean;
  isArchived: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  roles: RoleEntitySchema[];
}

export interface SystemUserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  includeArchived?: boolean;
  skipPagination?: boolean;
}
