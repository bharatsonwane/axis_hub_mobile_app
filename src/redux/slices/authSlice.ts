import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchSignedInUserProfile,
  fetchTenants,
  signInUser,
} from '@/redux/actions/authActions';
import type {
  User,
  UserState,
  TenantInfo,
} from '@/schemaTypes/authSchemaTypes';

const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  tenants: [],
  currentTenant: null,
  isLoadingTenants: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
    clearUser: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.tenants = [];
      state.currentTenant = null;
      state.isLoadingTenants = false;
    },
    setCurrentTenant: (state, action: PayloadAction<TenantInfo>) => {
      state.currentTenant = action.payload;
    },
    clearCurrentTenant: state => {
      state.currentTenant = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to sign in';
      })
      .addCase(fetchSignedInUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSignedInUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchSignedInUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Failed to fetch profile';
      })
      .addCase(fetchTenants.pending, state => {
        state.isLoadingTenants = true;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.isLoadingTenants = false;
        state.tenants = action.payload;
      })
      .addCase(fetchTenants.rejected, state => {
        state.isLoadingTenants = false;
        state.tenants = [];
      });
  },
});

export const {
  setUser,
  setToken,
  loginSuccess,
  clearUser,
  setCurrentTenant,
  clearCurrentTenant,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice;
