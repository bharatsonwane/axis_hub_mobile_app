import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  SystemUser,
  SystemUserQueryParams,
} from '@/schemaTypes/systemUserSchemaTypes';
import {
  getAppErrorMessage,
  getAxios,
  getPaginationMetadata,
} from '@/utils/axiosApi';

export const fetchSystemUsers = createAsyncThunk(
  'systemUser/fetchAll',
  async (params: SystemUserQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await getAxios().get('/api/system/users', {
        params: params ?? {},
      });
      const pagination = getPaginationMetadata(response);

      return {
        data: response.data as SystemUser[],
        pagination,
        page: params?.page ?? 1,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch system users' }),
      );
    }
  },
);

export const fetchSystemUserById = createAsyncThunk(
  'systemUser/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getAxios().get(`/api/system/users/${id}`);
      return response.data as SystemUser;
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch user' }),
      );
    }
  },
);
