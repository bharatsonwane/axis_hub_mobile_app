import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DetailField from '@/components/common/DetailField';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { fetchSystemRoleById } from '@/redux/actions/systemRoleActions';
import { clearCurrentSystemRole } from '@/redux/slices/systemRoleSlice';
import {
  selectCurrentSystemRole,
  selectSystemRoleDetailLoading,
} from '@/redux/slices/systemRoleSlice';
import { createSystemDetailScreenStyles } from '@/pages/System/shared/detailScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { formatBoolean, formatDate } from '@/utils/formatDisplay';
import { showErrorToast } from '@/utils/toast';

type RouteParams = {
  roleId: number;
};

export default function SystemRoleDetails() {
  const { colors } = useTheme();
  const styles = createSystemDetailScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  const roleId = (route.params as RouteParams)?.roleId;
  const role = useAppSelector(selectCurrentSystemRole);
  const isLoading = useAppSelector(selectSystemRoleDetailLoading);

  const loadRole = useCallback(() => {
    if (!roleId) {
      return;
    }
    dispatch(fetchSystemRoleById(roleId))
      .unwrap()
      .catch(error => {
        showErrorToast(
          typeof error === 'string' ? error : 'Failed to load role',
        );
      });
  }, [dispatch, roleId]);

  useEffect(() => {
    loadRole();
    return () => {
      dispatch(clearCurrentSystemRole());
    };
  }, [dispatch, loadRole]);

  if (!roleId) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>Invalid role.</Text>
      </ScreenContainer>
    );
  }

  if (isLoading && !role) {
    return (
      <ScreenContainer>
        <ActivityIndicator color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!role) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>Role not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>{role.name}</Text>

          <DetailField label="Code" value={role.code} />
          <DetailField label="Key name" value={role.keyName} />
          <DetailField label="Description" value={role.description || '—'} />
          <DetailField label="System role" value={formatBoolean(role.isSystem)} />
          <DetailField label="Archived" value={formatBoolean(role.isArchived)} />
          <DetailField label="Sort order" value={String(role.sortOrder)} />
          <DetailField label="Created" value={formatDate(role.createdAt)} />
          <DetailField label="Updated" value={formatDate(role.updatedAt)} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
