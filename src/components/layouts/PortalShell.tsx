import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import CarrierPortalNavigator from '@/navigation/portals/CarrierPortalNavigator';
import CustomerPortalNavigator from '@/navigation/portals/CustomerPortalNavigator';
import SystemPortalNavigator from '@/navigation/portals/SystemPortalNavigator';
import { fetchTenants } from '@/redux/actions/authActions';
import { setCurrentTenant } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';

export default function PortalShell() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { portalContext, tenantId, customerId } = usePortalContext();
  const loggedInUser = useAppSelector(state => state.user.user);
  const tenants = useAppSelector(state => state.user.tenants);
  const currentTenant = useAppSelector(state => state.user.currentTenant);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchTenants({ user: loggedInUser }));
    }
  }, [dispatch, loggedInUser]);

  useEffect(() => {
    if (portalContext !== 'carriers' || !tenantId || tenants.length === 0) {
      return;
    }

    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant && tenant.id !== currentTenant?.id) {
      dispatch(setCurrentTenant(tenant));
    }
  }, [portalContext, tenantId, tenants, currentTenant?.id, dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {portalContext === 'system' ? <SystemPortalNavigator /> : null}
      {portalContext === 'carriers' ? (
        <CarrierPortalNavigator key={`carrier-${tenantId}`} />
      ) : null}
      {portalContext === 'customers' ? (
        <CustomerPortalNavigator key={`customer-${customerId}`} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
