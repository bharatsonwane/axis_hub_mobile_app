import { store } from '@/redux/store';
import type { PortalContext } from '@/navigation/routes/types';

/**
 * Mobile equivalent of web URL pathname context.
 * Reads active tenant/customer from Redux until portal navigation is fully wired.
 */
export const getPathnameContextData = (): {
  portalContext: PortalContext;
  tenantId: number;
  customerId: number;
} => {
  const state = store.getState();
  const tenantId =
    state.user.currentTenant?.id ?? state.user.user?.activeTenantId ?? 0;

  return {
    portalContext: tenantId > 0 ? 'carriers' : 'system',
    tenantId,
    customerId: 0,
  };
};
