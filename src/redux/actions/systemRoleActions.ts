import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RoleEntitySchema } from '@/schemaTypes/rolePermissionsSchemaType';
import { getAppErrorMessage, getAxios } from '@/utils/axiosApi';

export const fetchSystemRoles = createAsyncThunk(
  'systemRole/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAxios().get('/api/system/roles');
      const payload = response.data as { data: RoleEntitySchema[] } | RoleEntitySchema[];
      const roles = Array.isArray(payload) ? payload : payload.data;
      return roles ?? [];
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch system roles' }),
      );
    }
  },
);

export const fetchSystemRoleById = createAsyncThunk(
  'systemRole/fetchById',
  async (roleId: number, { rejectWithValue }) => {
    try {
      const response = await getAxios().get(`/api/system/roles/${roleId}`);
      return response.data as RoleEntitySchema;
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch system role' }),
      );
    }
  },
);
