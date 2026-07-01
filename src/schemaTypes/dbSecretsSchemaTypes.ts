export interface TenantDbSecretsQueryParams {
  page?: number;
  limit?: number;
  skipPagination?: boolean;
  keyName?: string;
  isActive?: boolean;
  isArchived?: boolean;
}

export interface DbSecretsEntity {
  id: number;
  keyName: string;
  value?: string | null;
  description?: string | null;
  isEncrypted: boolean;
  isActive: boolean;
  isSensitive: boolean;
  kmsKeyId?: string | null;
  isArchived?: boolean;
  createdAt: string;
  createdBy?: number | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
  archivedAt?: string | null;
  archivedBy?: number | null;
}
