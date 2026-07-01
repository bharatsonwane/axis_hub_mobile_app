import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DetailField from '@/components/common/DetailField';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { fetchSystemSecretById } from '@/redux/actions/systemDbSecretsActions';
import { clearCurrentSystemSecret } from '@/redux/slices/systemDbSecretsSlice';
import {
  selectCurrentSystemSecret,
  selectSystemSecretDetailLoading,
} from '@/redux/slices/systemDbSecretsSlice';
import { createSystemDetailScreenStyles } from '@/pages/System/shared/detailScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { formatBoolean, formatDate } from '@/utils/formatDisplay';
import { showErrorToast } from '@/utils/toast';

type RouteParams = {
  secretId: number;
};

export default function SystemDbSecretDetails() {
  const { colors } = useTheme();
  const styles = createSystemDetailScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  const secretId = (route.params as RouteParams)?.secretId;
  const secret = useAppSelector(selectCurrentSystemSecret);
  const isLoading = useAppSelector(selectSystemSecretDetailLoading);

  const loadSecret = useCallback(() => {
    if (!secretId) {
      return;
    }
    dispatch(fetchSystemSecretById(secretId))
      .unwrap()
      .catch(error => {
        showErrorToast(
          typeof error === 'string' ? error : 'Failed to load secret',
        );
      });
  }, [dispatch, secretId]);

  useEffect(() => {
    loadSecret();
    return () => {
      dispatch(clearCurrentSystemSecret());
    };
  }, [dispatch, loadSecret]);

  if (!secretId) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>Invalid secret.</Text>
      </ScreenContainer>
    );
  }

  if (isLoading && !secret) {
    return (
      <ScreenContainer>
        <ActivityIndicator color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!secret) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>Secret not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>{secret.keyName}</Text>

          <DetailField label="Description" value={secret.description || '—'} />
          <DetailField label="Active" value={formatBoolean(secret.isActive)} />
          <DetailField
            label="Encrypted"
            value={formatBoolean(secret.isEncrypted)}
          />
          <DetailField
            label="Sensitive"
            value={formatBoolean(secret.isSensitive)}
          />
          <DetailField label="KMS key ID" value={secret.kmsKeyId || '—'} />
          <DetailField
            label="Value"
            value={
              secret.isSensitive || secret.isEncrypted
                ? 'Hidden for security'
                : secret.value || '—'
            }
            masked={secret.isSensitive || secret.isEncrypted}
          />
          <DetailField label="Created" value={formatDate(secret.createdAt)} />
          <DetailField
            label="Updated"
            value={formatDate(secret.updatedAt ?? null)}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
