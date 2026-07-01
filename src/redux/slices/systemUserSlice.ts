import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSystemUsers,
  fetchSystemUserById,
} from '@/redux/actions/systemUserActions';
import type { SystemUser } from '@/schemaTypes/systemUserSchemaTypes';
import type { Pagination } from '@/schemaTypes/commonSchemaTypes';

export interface SystemUserState {
  users: SystemUser[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  currentUser: SystemUser | null;
  isDetailLoading: boolean;
  detailError: string | null;
}

const initialState: SystemUserState = {
  users: [],
  pagination: null,
  isLoading: false,
  error: null,
  currentUser: null,
  isDetailLoading: false,
  detailError: null,
};

const systemUserSlice = createSlice({
  name: 'systemUser',
  initialState,
  reducers: {
    clearSystemUsers: state => {
      state.users = [];
      state.pagination = null;
      state.error = null;
    },
    clearCurrentSystemUser: state => {
      state.currentUser = null;
      state.detailError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSystemUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSystemUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, pagination, page } = action.payload;
        state.users = page > 1 ? [...state.users, ...data] : data;
        state.pagination = pagination;
      })
      .addCase(fetchSystemUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch users';
      })
      .addCase(fetchSystemUserById.pending, state => {
        state.isDetailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchSystemUserById.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchSystemUserById.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError =
          (action.payload as string) ?? 'Failed to fetch user';
      });
  },
});

export const { clearSystemUsers, clearCurrentSystemUser } =
  systemUserSlice.actions;
export default systemUserSlice;

export const selectSystemUsers = (state: { systemUser: SystemUserState }) =>
  state.systemUser.users;
export const selectSystemUserPagination = (state: {
  systemUser: SystemUserState;
}) => state.systemUser.pagination;
export const selectSystemUserLoading = (state: {
  systemUser: SystemUserState;
}) => state.systemUser.isLoading;
export const selectCurrentSystemUser = (state: {
  systemUser: SystemUserState;
}) => state.systemUser.currentUser;
export const selectSystemUserDetailLoading = (state: {
  systemUser: SystemUserState;
}) => state.systemUser.isDetailLoading;
