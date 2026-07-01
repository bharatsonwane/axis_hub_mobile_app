import React, { useEffect } from 'react';
import { Modal, Pressable, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContextProvider';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import { createPortalSwitcherStyles } from '@/navigation/portalSwitcher.styles';
import { fetchTenants } from '@/redux/actions/authActions';
import { setCurrentTenant } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { SocketManager } from '@/realtime/socketManager';
import { useTheme } from '@/providers/ThemeProvider';
import { showSuccessToast } from '@/utils/toast';

type PortalSwitcherProps = {
  visible: boolean;
  onClose: () => void;
};

export default function PortalSwitcher({
  visible,
  onClose,
}: PortalSwitcherProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { styles, getTenantItemStyle } = createPortalSwitcherStyles({
    colors,
    bottomInset: insets.bottom,
  });
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAuth();
  const { portalContext, switchToSystemPortal, switchToCarrierPortal } =
    usePortalContext();
  const tenants = useAppSelector(state => state.user.tenants);
  const currentTenant = useAppSelector(state => state.user.currentTenant);
  const isSystemUser = loggedInUser?.isSystemUser ?? false;

  useEffect(() => {
    if (visible && loggedInUser) {
      dispatch(fetchTenants({ user: loggedInUser }));
    }
  }, [dispatch, loggedInUser, visible]);

  const handleSwitchToSystem = () => {
    switchToSystemPortal();
    onClose();
    showSuccessToast('Switched to Admin Portal');
  };

  const handleSwitchToCarrier = async (tenantId: number) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (!tenant) {
      return;
    }

    dispatch(setCurrentTenant(tenant));
    switchToCarrierPortal(tenantId);
    await SocketManager.connect({ tenantId });
    onClose();
    showSuccessToast(`Switched to ${tenant.name}`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>
          <Text style={styles.sheetTitle}>Switch portal</Text>

          <ScrollView style={styles.list}>
            {isSystemUser && portalContext !== 'system' ? (
              <Pressable onPress={handleSwitchToSystem} style={styles.item}>
                <Text style={styles.itemTitle}>Admin Portal</Text>
                <Text style={styles.itemMeta}>
                  System dashboard and carriers
                </Text>
              </Pressable>
            ) : null}

            {isSystemUser && portalContext === 'system' && tenants.length > 0 ? (
              <Text style={styles.sectionLabel}>Switch to carrier</Text>
            ) : null}

            {portalContext === 'carriers' || isSystemUser ? (
              <>
                <Text style={styles.sectionLabel}>Carriers</Text>
                {tenants.map(tenant => {
                  const isActive = currentTenant?.id === tenant.id;
                  return (
                    <Pressable
                      key={tenant.id}
                      onPress={() => {
                        handleSwitchToCarrier(tenant.id).catch(() => undefined);
                      }}
                      style={getTenantItemStyle(isActive)}
                    >
                      <Text style={styles.itemTitle}>
                        {tenant.name || tenant.keyName}
                      </Text>
                      {isActive ? (
                        <Text style={styles.activeBadge}>Active</Text>
                      ) : null}
                    </Pressable>
                  );
                })}
              </>
            ) : null}
          </ScrollView>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
