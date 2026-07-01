export interface RoleEntitySchema {
  id: number;
  code: string;
  keyName: string;
  name: string;
  description?: string | null;
  sortOrder: number;
  isSystem: boolean;
  isArchived: boolean;
  createdBy: number;
  updatedBy: number;
  archivedBy: number | null;
  createdAt: string;
  updatedAt: string;
}
