import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PortalContext } from '@/navigation/routes/types';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import { mobileAuthRoutes } from '@/navigation/routes';

type PortalState = {
  portalContext: PortalContext;
  tenantId: number;
  customerId: number;
};

type PortalContextValue = PortalState & {
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

export function PortalContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(initialState);

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
    [state],
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
