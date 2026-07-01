import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSystemRoles,
  fetchSystemRoleById,
} from '@/redux/actions/systemRoleActions';
import type { RoleEntitySchema } from '@/schemaTypes/rolePermissionsSchemaType';

export interface SystemRoleState {
  roles: RoleEntitySchema[];
  isLoading: boolean;
  error: string | null;
  currentRole: RoleEntitySchema | null;
  isDetailLoading: boolean;
  detailError: string | null;
}

const initialState: SystemRoleState = {
  roles: [],
  isLoading: false,
  error: null,
  currentRole: null,
  isDetailLoading: false,
  detailError: null,
};

const systemRoleSlice = createSlice({
  name: 'systemRole',
  initialState,
  reducers: {
    clearSystemRoles: state => {
      state.roles = [];
      state.error = null;
    },
    clearCurrentSystemRole: state => {
      state.currentRole = null;
      state.detailError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSystemRoles.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSystemRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
      })
      .addCase(fetchSystemRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch roles';
      })
      .addCase(fetchSystemRoleById.pending, state => {
        state.isDetailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchSystemRoleById.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.currentRole = action.payload;
      })
      .addCase(fetchSystemRoleById.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError =
          (action.payload as string) ?? 'Failed to fetch role';
      });
  },
});

export const { clearSystemRoles, clearCurrentSystemRole } =
  systemRoleSlice.actions;
export default systemRoleSlice;

export const selectSystemRoles = (state: { systemRole: SystemRoleState }) =>
  state.systemRole.roles;
export const selectSystemRoleLoading = (state: {
  systemRole: SystemRoleState;
}) => state.systemRole.isLoading;
export const selectCurrentSystemRole = (state: {
  systemRole: SystemRoleState;
}) => state.systemRole.currentRole;
export const selectSystemRoleDetailLoading = (state: {
  systemRole: SystemRoleState;
}) => state.systemRole.isDetailLoading;
