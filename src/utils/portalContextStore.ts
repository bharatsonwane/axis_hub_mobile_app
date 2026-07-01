import type { PortalContext } from '@/navigation/routes/types';

export type PortalState = {
  portalContext: PortalContext;
  tenantId: number;
  customerId: number;
};

const initialState: PortalState = {
  portalContext: 'carriers',
  tenantId: 0,
  customerId: 0,
};

let currentPortalState: PortalState = initialState;

export function setPortalContextStore(state: PortalState): void {
  currentPortalState = state;
}

export function getPortalContextStore(): PortalState {
  return currentPortalState;
}
