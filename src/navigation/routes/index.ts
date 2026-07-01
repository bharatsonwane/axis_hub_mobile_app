import { systemRoutes } from './systemRoutes';
import { carrierRoutes } from './carrierRoutes';
import { customerRoutes } from './customerRoutes';
import type { MobileAuthRoute } from './types';

export const mobileAuthRoutes: MobileAuthRoute[] = [
  systemRoutes,
  carrierRoutes,
  customerRoutes,
];
