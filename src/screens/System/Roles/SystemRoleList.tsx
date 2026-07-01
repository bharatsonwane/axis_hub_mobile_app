import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import type { RoleEntitySchema } from '@/schemaTypes/rolePermissionsSchemaType';
import { fetchSystemRoles } from '@/redux/actions/systemRoleActions';
import {
  selectSystemRoleLoading,
  selectSystemRoles,
} from '@/redux/slices/systemRoleSlice';
import { createSystemListScreenStyles } from '@/screens/System/shared/listScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { showErrorToast } from '@/utils/toast';

export default function SystemRoleListScreen() {
  const { colors } = useTheme();
  const styles = createSystemListScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const roles = useAppSelector(selectSystemRoles);
  const isLoading = useAppSelector(selectSystemRoleLoading);

  const loadRoles = useCallback(() => {
    dispatch(fetchSystemRoles())
      .unwrap()
      .catch(error => {
        showErrorToast(
          typeof error === 'string' ? error : 'Failed to load roles',
        );
      });
  }, [dispatch]);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const renderItem = ({ item }: { item: RoleEntitySchema }) => (
    <Pressable
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('SystemRoleDetail', { roleId: item.id })
      }
    >
      <Text style={styles.listItemTitle}>{item.name}</Text>
      <Text style={styles.listItemMeta}>
        {item.code} · {item.isSystem ? 'System role' : 'Custom role'}
      </Text>
      {item.description ? (
        <Text style={styles.listItemMeta} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
    </Pressable>
  );

  return (
    <ScreenContainer>
      <Text style={styles.heading}>System roles</Text>
      <Text style={styles.subheading}>Read-only list of system roles.</Text>

      {isLoading && roles.length === 0 ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <FlatList
          data={roles}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadRoles} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No roles found.</Text>
          }
        />
      )}
    </ScreenContainer>
  );
}
