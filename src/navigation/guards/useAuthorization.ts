import type { MobileAuthRoute } from '@/navigation/routes/types';
import { checkAuthorization } from '@/utils/navigation-helper';
import { useAppSelector } from '@/redux/store';

export function useAuthorization(route: MobileAuthRoute): boolean {
  const user = useAppSelector(state => state.user.user);

  return checkAuthorization({
    allowedSystemPermissions: route.allowedSystemPermissions,
    allowedTenantPermissions: route.allowedTenantPermissions,
    user,
  });
}
