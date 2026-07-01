import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearUser } from '@/redux/slices/authSlice';
import { getAppErrorMessage, getAxios } from '@/utils/axiosApi';
import { setAuthToken, clearAuthTokens } from '@/utils/authToken';
import { emitAuthLogout } from '@/utils/authEvents';
import { getPathnameContextData } from '@/utils/pathnameContext';
import type {
  User,
  SignInRequest,
  SignInResponse,
  TenantInfo,
} from '@/schemaTypes/authSchemaTypes';
import type { Carrier } from '@/schemaTypes/carrierSchemaTypes';
import type { RootState } from '@/redux/store';

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (signInData: SignInRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await getAxios().post('/api/auth/signin', signInData);
      const responseData = response.data as SignInResponse;
      const { accessToken } = responseData;

      await setAuthToken(accessToken);

      const user = await dispatch(fetchSignedInUserProfile()).unwrap();

      return { user, token: accessToken };
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to sign in' }),
      );
    }
  },
);

export const fetchSignedInUserProfile = createAsyncThunk(
  'user/fetchSignedInUserProfile',
  async (_param, { rejectWithValue }) => {
    try {
      const { tenantId } = getPathnameContextData();
      const params = tenantId ? { tenantId } : {};
      const response = await getAxios().get('/api/auth/profile', { params });
      const responseData = response.data as User;

      const systemRoleNames =
        responseData.systemRoles?.map(role => role.keyName) || [];
      const tenantRoleNames =
        responseData.tenantRoles?.map(role => role.keyName) || [];
      const allRoleNames = [...systemRoleNames, ...tenantRoleNames];

      const user: User = {
        ...responseData,
        roles: allRoleNames,
      };

      return user;
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch profile' }),
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    await clearAuthTokens();
    dispatch(clearUser());
    emitAuthLogout();
    return true;
  },
);

export const fetchTenants = createAsyncThunk<
  TenantInfo[],
  { user: User },
  { state: RootState }
>('user/fetchTenants', async ({ user }, { rejectWithValue }) => {
  if (!user) {
    return rejectWithValue('User not found');
  }

  const isSystemUser = user.isSystemUser ?? false;

  if (isSystemUser) {
    try {
      const response = await getAxios().get('/api/system/tenants', {
        params: { isUsingAxis: true, skipPagination: true },
      });
      const carriers = response.data as Carrier[];
      const tenantList: TenantInfo[] = carriers.map(carrier => ({
        id: carrier.id,
        keyName: carrier.keyName,
        name: carrier.name,
      }));
      return tenantList;
    } catch (error) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch carriers' }),
      );
    }
  }

  if (user.tenants?.length) {
    const tenantList: TenantInfo[] = user.tenants
      .filter(tenant => tenant.isUsingAxis !== false)
      .map(tenant => ({
        id: tenant.id,
        keyName: tenant.keyName,
        name: tenant.name,
      }));
    return tenantList;
  }

  return [];
});
