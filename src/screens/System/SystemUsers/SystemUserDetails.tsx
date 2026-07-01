import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DetailField from '@/components/common/DetailField';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { fetchSystemUserById } from '@/redux/actions/systemUserActions';
import { clearCurrentSystemUser } from '@/redux/slices/systemUserSlice';
import {
  selectCurrentSystemUser,
  selectSystemUserDetailLoading,
} from '@/redux/slices/systemUserSlice';
import { createSystemDetailScreenStyles } from '@/screens/System/shared/detailScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import {
  formatBoolean,
  formatDate,
  formatUserName,
} from '@/utils/formatDisplay';
import { showErrorToast } from '@/utils/toast';

type RouteParams = {
  userId: number;
};

export default function SystemUserDetailsScreen() {
  const { colors } = useTheme();
  const styles = createSystemDetailScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  const userId = (route.params as RouteParams)?.userId;
  const user = useAppSelector(selectCurrentSystemUser);
  const isLoading = useAppSelector(selectSystemUserDetailLoading);

  const loadUser = useCallback(() => {
    if (!userId) {
      return;
    }
    dispatch(fetchSystemUserById(userId))
      .unwrap()
      .catch(error => {
        showErrorToast(
          typeof error === 'string' ? error : 'Failed to load user',
        );
      });
  }, [dispatch, userId]);

  useEffect(() => {
    loadUser();
    return () => {
      dispatch(clearCurrentSystemUser());
    };
  }, [dispatch, loadUser]);

  if (!userId) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>Invalid user.</Text>
      </ScreenContainer>
    );
  }

  if (isLoading && !user) {
    return (
      <ScreenContainer>
        <ActivityIndicator color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!user) {
    return (
      <ScreenContainer>
        <Text style={styles.value}>User not found.</Text>
      </ScreenContainer>
    );
  }

  const roleNames = user.roles?.map(role => role.name).join(', ') || '—';

  return (
    <ScreenContainer>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>
            {formatUserName({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            })}
          </Text>

          <DetailField label="Email" value={user.email ?? '—'} />
          <DetailField label="Mobile" value={user.mobileNumber ?? '—'} />
          <DetailField label="Status" value={user.status?.name ?? '—'} />
          <DetailField label="Active" value={formatBoolean(user.isActive)} />
          <DetailField label="Roles" value={roleNames} />
          <DetailField
            label="Last login"
            value={formatDate(user.lastLoginAt)}
          />
          <DetailField label="Created" value={formatDate(user.createdAt)} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
