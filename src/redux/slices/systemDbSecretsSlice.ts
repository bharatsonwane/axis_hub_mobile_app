import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSystemDbSecrets,
  fetchSystemSecretById,
} from '@/redux/actions/systemDbSecretsActions';
import type { DbSecretsEntity } from '@/schemaTypes/dbSecretsSchemaTypes';
import type { Pagination } from '@/schemaTypes/commonSchemaTypes';

export interface SystemDbSecretsState {
  secrets: DbSecretsEntity[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  currentSecret: DbSecretsEntity | null;
  isDetailLoading: boolean;
  detailError: string | null;
}

const initialState: SystemDbSecretsState = {
  secrets: [],
  pagination: null,
  isLoading: false,
  error: null,
  currentSecret: null,
  isDetailLoading: false,
  detailError: null,
};

const systemDbSecretsSlice = createSlice({
  name: 'systemDbSecrets',
  initialState,
  reducers: {
    clearSystemSecrets: state => {
      state.secrets = [];
      state.pagination = null;
      state.error = null;
    },
    clearCurrentSystemSecret: state => {
      state.currentSecret = null;
      state.detailError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSystemDbSecrets.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSystemDbSecrets.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, pagination, page } = action.payload;
        state.secrets = page > 1 ? [...state.secrets, ...data] : data;
        state.pagination = pagination;
      })
      .addCase(fetchSystemDbSecrets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch secrets';
      })
      .addCase(fetchSystemSecretById.pending, state => {
        state.isDetailLoading = true;
        state.detailError = null;
        state.currentSecret = null;
      })
      .addCase(fetchSystemSecretById.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.currentSecret = action.payload;
      })
      .addCase(fetchSystemSecretById.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError =
          (action.payload as string) ?? 'Failed to fetch secret';
      });
  },
});

export const { clearSystemSecrets, clearCurrentSystemSecret } =
  systemDbSecretsSlice.actions;
export default systemDbSecretsSlice;

export const selectSystemSecrets = (state: {
  systemDbSecrets: SystemDbSecretsState;
}) => state.systemDbSecrets.secrets;
export const selectSystemSecretsPagination = (state: {
  systemDbSecrets: SystemDbSecretsState;
}) => state.systemDbSecrets.pagination;
export const selectSystemSecretsLoading = (state: {
  systemDbSecrets: SystemDbSecretsState;
}) => state.systemDbSecrets.isLoading;
export const selectCurrentSystemSecret = (state: {
  systemDbSecrets: SystemDbSecretsState;
}) => state.systemDbSecrets.currentSecret;
export const selectSystemSecretDetailLoading = (state: {
  systemDbSecrets: SystemDbSecretsState;
}) => state.systemDbSecrets.isDetailLoading;
