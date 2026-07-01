import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PortalContext } from '@/navigation/routes/types';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import { mobileAuthRoutes } from '@/navigation/routes';
import {
  getPortalContextStore,
  setPortalContextStore,
  type PortalState,
} from '@/utils/portalContextStore';

const PORTAL_STORAGE_KEY = 'axis-portal-context';

type PortalContextValue = PortalState & {
  isHydrated: boolean;
  setPortal: (portalContext: PortalContext, entityId?: number) => void;
  switchToSystemPortal: () => void;
  switchToCarrierPortal: (tenantId: number) => void;
  switchToCustomerPortal: (customerId: number) => void;
  getActivePortalRoute: () => MobileAuthRoute | undefined;
};

const PortalContext = createContext<PortalContextValue | undefined>(undefined);

const initialState: PortalState = {
  portalContext: 'carriers',
  tenantId: 0,
  customerId: 0,
};

const parseStoredPortalState = (raw: string | null): PortalState => {
  if (!raw) {
    return initialState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PortalState>;
    return {
      portalContext: parsed.portalContext ?? initialState.portalContext,
      tenantId: parsed.tenantId ?? 0,
      customerId: parsed.customerId ?? 0,
    };
  } catch {
    return initialState;
  }
};

export function PortalContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(getPortalContextStore());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      const raw = await AsyncStorage.getItem(PORTAL_STORAGE_KEY);
      const restored = parseStoredPortalState(raw);

      if (isMounted) {
        setState(restored);
        setPortalContextStore(restored);
        setIsHydrated(true);
      }
    };

    hydrate().catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    setPortalContextStore(state);
    AsyncStorage.setItem(PORTAL_STORAGE_KEY, JSON.stringify(state)).catch(
      () => undefined,
    );
  }, [isHydrated, state]);

  const setPortal = (portalContext: PortalContext, entityId = 0) => {
    setState({
      portalContext,
      tenantId: portalContext === 'carriers' ? entityId : 0,
      customerId: portalContext === 'customers' ? entityId : 0,
    });
  };

  const value = useMemo<PortalContextValue>(
    () => ({
      ...state,
      isHydrated,
      setPortal,
      switchToSystemPortal: () => setPortal('system'),
      switchToCarrierPortal: (tenantId: number) =>
        setPortal('carriers', tenantId),
      switchToCustomerPortal: (customerId: number) =>
        setPortal('customers', customerId),
      getActivePortalRoute: () =>
        mobileAuthRoutes.find(
          route => route.portalContext === state.portalContext,
        ),
    }),
    [isHydrated, state],
  );

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}

export const usePortalContext = (): PortalContextValue => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error(
      'usePortalContext must be used within PortalContextProvider',
    );
  }
  return context;
};
