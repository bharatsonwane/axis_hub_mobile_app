import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  DbSecretsEntity,
  TenantDbSecretsQueryParams,
} from '@/schemaTypes/dbSecretsSchemaTypes';
import {
  getAppErrorMessage,
  getAxios,
  getPaginationMetadata,
} from '@/utils/axiosApi';

export const fetchSystemDbSecrets = createAsyncThunk(
  'systemDbSecrets/fetchAll',
  async (params: TenantDbSecretsQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await getAxios().get('/api/system/secrets', {
        params: params ?? {},
      });
      const pagination = getPaginationMetadata(response);

      return {
        data: (response.data as DbSecretsEntity[]) ?? [],
        pagination,
        page: params?.page ?? 1,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch system secrets' }),
      );
    }
  },
);

export const fetchSystemSecretById = createAsyncThunk(
  'systemDbSecrets/fetchById',
  async (secretId: number, { rejectWithValue }) => {
    try {
      const response = await getAxios().get(`/api/system/secrets/${secretId}`);
      return response.data as DbSecretsEntity;
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch secret' }),
      );
    }
  },
);
