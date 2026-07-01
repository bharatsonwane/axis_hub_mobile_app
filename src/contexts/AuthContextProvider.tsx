import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { DeviceEventEmitter } from 'react-native';
import type {
  User,
  SignInRequest,
  TenantInfo,
} from '@/schemaTypes/authSchemaTypes';
import { useAppDispatch } from '@/redux/store';
import {
  signInUser,
  logoutUser,
  fetchSignedInUserProfile,
} from '@/redux/actions/authActions';
import { setCurrentTenant } from '@/redux/slices/authSlice';
import { mobileAuthRoutes } from '@/navigation/routes';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import { getDefaultPortalDestination } from '@/utils/navigation-helper';
import { getAuthToken } from '@/utils/authToken';
import { AUTH_LOGOUT_EVENT } from '@/utils/authEvents';
import LoadingOverlay from '@/components/LoadingOverlay';
import { SocketManager } from '@/realtime/socketManager';

export let authContextValue = {
  loggedInUser: null as User | null,
  token: null as string | null,
  isLoading: false,
  error: null as string | null,
  isAuthenticated: false,
  signIn: async (
    _signInData: SignInRequest,
  ): Promise<{ user: User; token: string; message?: string }> => {
    return {
      user: null as unknown as User,
      token: null as unknown as string,
    };
  },
  logout: async () => {},
  getToken: async () => null as string | null,
  fetchProfile: async () => {},
};

export type AuthContextType = typeof authContextValue;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const syncCurrentTenantFromUser = (
  dispatch: ReturnType<typeof useAppDispatch>,
  user: User | null | undefined,
) => {
  if (!user?.activeTenantId || !user.tenants?.length) {
    return;
  }

  const tenant = user.tenants.find(t => t.id === user.activeTenantId);
  if (!tenant) {
    return;
  }

  const tenantInfo: TenantInfo = {
    id: tenant.id,
    keyName: tenant.keyName,
    name: tenant.name,
  };
  dispatch(setCurrentTenant(tenantInfo));
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const dispatch = useAppDispatch();
  const {
    switchToCarrierPortal,
    switchToSystemPortal,
    switchToCustomerPortal,
  } = usePortalContext();

  const [loggedInUser, setLoggedInUser] = React.useState<
    User | null | undefined
  >(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const profileFetchInFlight = useRef(false);

  const applyPortalDestination = useCallback(
    (user: User) => {
      const destination = getDefaultPortalDestination(user, mobileAuthRoutes);

      if (destination.portalContext === 'carriers') {
        switchToCarrierPortal(destination.tenantId);
      } else if (destination.portalContext === 'customers') {
        switchToCustomerPortal(destination.customerId);
      } else {
        switchToSystemPortal();
      }
    },
    [
      switchToCarrierPortal,
      switchToCustomerPortal,
      switchToSystemPortal,
    ],
  );

  const restoreSession = useCallback(async () => {
    if (profileFetchInFlight.current) {
      return;
    }

    profileFetchInFlight.current = true;

    try {
      const jwtToken = await getAuthToken();
      setToken(jwtToken);

      if (!jwtToken) {
        setLoggedInUser(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      const userData = await dispatch(fetchSignedInUserProfile()).unwrap();
      syncCurrentTenantFromUser(dispatch, userData);
      applyPortalDestination(userData);
      setLoggedInUser(userData);
      await SocketManager.connect({ tenantId: userData.activeTenantId });
    } catch (err: unknown) {
      setLoggedInUser(null);
      setToken(null);
      setError(
        err instanceof Error ? err.message : 'Failed to restore user session',
      );
    } finally {
      setIsLoading(false);
      profileFetchInFlight.current = false;
    }
  }, [applyPortalDestination, dispatch]);

  useEffect(() => {
    restoreSession().catch(() => undefined);
  }, [restoreSession]);

  const logout = useCallback(async () => {
    setLoggedInUser(null);
    setToken(null);
    setError(null);
    await SocketManager.disconnect();
    await dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      AUTH_LOGOUT_EVENT,
      () => {
        setLoggedInUser(null);
        setToken(null);
        SocketManager.disconnect().catch(() => undefined);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const fetchProfile = useCallback(async () => {
    const jwtToken = await getAuthToken();
    if (!jwtToken) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const userData = await dispatch(fetchSignedInUserProfile()).unwrap();
      syncCurrentTenantFromUser(dispatch, userData);
      setLoggedInUser(userData);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(errorMessage);
      setLoggedInUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const signIn = useCallback(
    async (signInData: SignInRequest) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await dispatch(signInUser(signInData)).unwrap();

        syncCurrentTenantFromUser(dispatch, result.user);
        applyPortalDestination(result.user);
        setLoggedInUser(result.user);
        setToken(result.token);
        setError(null);
        await SocketManager.connect({ tenantId: result.user.activeTenantId });
        return result;
      } catch (err: unknown) {
        const errorMessage =
          typeof err === 'string'
            ? err
            : err instanceof Error
              ? err.message
              : 'Failed to sign in';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [applyPortalDestination, dispatch],
  );

  const getToken = useCallback(async () => {
    const jwtToken = await getAuthToken();
    if (jwtToken && loggedInUser) {
      return jwtToken;
    }
    if (!jwtToken) {
      await logout();
    }
    return null;
  }, [loggedInUser, logout]);

  const isAuthenticated = !!token && !!loggedInUser;

  const contextValue: AuthContextType = useMemo(() => {
    authContextValue = {
      loggedInUser: loggedInUser ?? null,
      token,
      isLoading,
      error,
      isAuthenticated,
      signIn,
      logout,
      getToken,
      fetchProfile,
    };
    return authContextValue;
  }, [
    loggedInUser,
    token,
    isLoading,
    error,
    isAuthenticated,
    signIn,
    logout,
    getToken,
    fetchProfile,
  ]);

  if (loggedInUser === undefined) {
    return <LoadingOverlay />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
