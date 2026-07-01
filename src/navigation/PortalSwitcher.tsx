import React, { useEffect } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContextProvider';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import { fetchTenants } from '@/redux/actions/authActions';
import { setCurrentTenant } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { SocketManager } from '@/realtime/socketManager';
import { useTheme } from '@/providers/ThemeProvider';
import { radius, spacing, typography } from '@/theme/tokens';
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
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              paddingBottom: insets.bottom + spacing.md,
            },
          ]}
          onPress={e => e.stopPropagation()}
        >
          <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
            Switch portal
          </Text>

          <ScrollView style={styles.list}>
            {isSystemUser && portalContext !== 'system' ? (
              <Pressable
                onPress={handleSwitchToSystem}
                style={[
                  styles.item,
                  { borderColor: colors.border },
                ]}
              >
                <Text style={[styles.itemTitle, { color: colors.foreground }]}>
                  Admin Portal
                </Text>
                <Text
                  style={[styles.itemMeta, { color: colors.mutedForeground }]}
                >
                  System dashboard and carriers
                </Text>
              </Pressable>
            ) : null}

            {isSystemUser && portalContext === 'system' && tenants.length > 0 ? (
              <Text
                style={[styles.sectionLabel, { color: colors.mutedForeground }]}
              >
                Switch to carrier
              </Text>
            ) : null}

            {portalContext === 'carriers' || isSystemUser ? (
              <>
                <Text
                  style={[
                    styles.sectionLabel,
                    { color: colors.mutedForeground },
                  ]}
                >
                  Carriers
                </Text>
                {tenants.map(tenant => {
                  const isActive = currentTenant?.id === tenant.id;
                  return (
                    <Pressable
                      key={tenant.id}
                      onPress={() => {
                        handleSwitchToCarrier(tenant.id).catch(() => undefined);
                      }}
                      style={[
                        styles.item,
                        {
                          borderColor: colors.border,
                          backgroundColor: isActive
                            ? colors.muted
                            : colors.card,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.itemTitle, { color: colors.foreground }]}
                      >
                        {tenant.name || tenant.keyName}
                      </Text>
                      {isActive ? (
                        <Text
                          style={[
                            styles.activeBadge,
                            { color: colors.primary },
                          ]}
                        >
                          Active
                        </Text>
                      ) : null}
                    </Pressable>
                  );
                })}
              </>
            ) : null}
          </ScrollView>

          <Pressable
            onPress={onClose}
            style={[styles.closeButton, { backgroundColor: colors.muted }]}
          >
            <Text style={[styles.closeText, { color: colors.foreground }]}>
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    maxHeight: '70%',
  },
  sheetTitle: {
    fontSize: typography.subtitle,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  list: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: typography.caption,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  item: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemTitle: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  itemMeta: {
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  activeBadge: {
    fontSize: typography.caption,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  closeButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  closeText: {
    fontSize: typography.body,
    fontWeight: '600',
  },
});
