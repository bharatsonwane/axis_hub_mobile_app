import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailField from '@/components/common/DetailField';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { usePortalContext } from '@/navigation/PortalContextProvider';
import { fetchCarrierById } from '@/redux/actions/systemCarrierActions';
import { clearCurrentCarrier } from '@/redux/slices/systemCarrierSlice';
import {
  selectCarrierDetailLoading,
  selectCurrentCarrier,
} from '@/redux/slices/systemCarrierSlice';
import { createSystemDetailScreenStyles } from '@/pages/System/shared/detailScreen.styles';
import { setCurrentTenant } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { formatBoolean, formatDate } from '@/utils/formatDisplay';
import { showErrorToast, showSuccessToast } from '@/utils/toast';

type RouteParams = {
  carrierId: number;
};

export default function CarrierDetails() {
  const { colors } = useTheme();
  const styles = createSystemDetailScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { switchToCarrierPortal } = usePortalContext();
  const carrierId = (route.params as RouteParams)?.carrierId;
  const carrier = useAppSelector(selectCurrentCarrier);
  const isLoading = useAppSelector(selectCarrierDetailLoading);
  const tenants = useAppSelector(state => state.user.tenants);

  const loadCarrier = useCallback(() => {
    if (!carrierId) {
      return;
    }
    dispatch(fetchCarrierById(carrierId))
      .unwrap()
      .catch(error => {
        showErrorToast(
          typeof error === 'string' ? error : 'Failed to load carrier',
        );
      });
  }, [carrierId, dispatch]);

  useEffect(() => {
    loadCarrier();
    return () => {
      dispatch(clearCurrentCarrier());
    };
  }, [dispatch, loadCarrier]);

  const handleOpenCarrierPortal = () => {
    if (!carrier) {
      return;
    }

    const tenant = tenants.find(t => t.id === carrier.id);
    if (tenant) {
      dispatch(setCurrentTenant(tenant));
    }

    switchToCarrierPortal(carrier.id);
    showSuccessToast(`Opened ${carrier.name} portal`);
  };

  if (!carrierId) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>Invalid carrier.</Text>
      </ScreenContainer>
    );
  }

  if (isLoading && !carrier) {
    return (
      <ScreenContainer>
        <ActivityIndicator color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!carrier) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>Carrier not found.</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Go back</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>{carrier.name}</Text>

          <DetailField label="Code" value={carrier.code} />
          <DetailField label="Email" value={carrier.email || '—'} />
          <DetailField label="DOT number" value={carrier.dotNumber || '—'} />
          <DetailField
            label="MC number"
            value={carrier.mcNumber || '—'}
          />
          <DetailField
            label="Active"
            value={formatBoolean(carrier.isActive)}
          />
          <DetailField
            label="Validated"
            value={formatBoolean(carrier.isValidated)}
          />
          <DetailField
            label="Using Axis"
            value={formatBoolean(carrier.isUsingAxis)}
          />
          <DetailField
            label="Highway status"
            value={carrier.highwayStatus || '—'}
          />
          <DetailField
            label="Insurance status"
            value={carrier.highwayInsuranceStatus || '—'}
          />
          <DetailField label="Created" value={formatDate(carrier.createdAt)} />

          <Pressable
            onPress={handleOpenCarrierPortal}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Open carrier portal</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
