import React, { type ReactNode } from 'react';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import AccessDenied from '@/pages/public/Access/AccessDenied';
import { useAuthorization } from '@/navigation/guards/useAuthorization';

type PortalGuardProps = {
  route: MobileAuthRoute;
  children: ReactNode;
};

export default function PortalGuard({ route, children }: PortalGuardProps) {
  const authorized = useAuthorization(route);

  if (!authorized) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}

export function withPortalGuard(
  Screen: MobileAuthRoute['screen'],
  route: MobileAuthRoute,
): React.ComponentType {
  return function GuardedScreen() {
    const Component = Screen;
    return (
      <PortalGuard route={route}>
        <Component />
      </PortalGuard>
    );
  };
}
