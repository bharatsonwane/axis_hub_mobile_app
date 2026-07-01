import { store } from '@/redux/store';
import { getPortalContextStore } from '@/utils/portalContextStore';

/**
 * Mobile equivalent of web URL pathname context.
 * Reads portal state from PortalContextProvider (persisted) with Redux fallbacks.
 */
export const getPathnameContextData = (): {
  portalContext: ReturnType<typeof getPortalContextStore>['portalContext'];
  tenantId: number;
  customerId: number;
} => {
  const portal = getPortalContextStore();
  const state = store.getState();
  const tenantId =
    portal.tenantId ||
    state.user.currentTenant?.id ||
    state.user.user?.activeTenantId ||
    0;

  return {
    portalContext: portal.portalContext,
    tenantId,
    customerId: portal.customerId,
  };
};
