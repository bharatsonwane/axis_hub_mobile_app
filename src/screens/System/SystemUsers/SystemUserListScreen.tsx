import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import type { SystemUser } from '@/schemaTypes/systemUserSchemaTypes';
import { fetchSystemUsers } from '@/redux/actions/systemUserActions';
import {
  selectSystemUserLoading,
  selectSystemUserPagination,
  selectSystemUsers,
} from '@/redux/slices/systemUserSlice';
import { createSystemListScreenStyles } from '@/screens/System/shared/listScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { formatUserName } from '@/utils/formatDisplay';
import { showErrorToast } from '@/utils/toast';

const PAGE_SIZE = 20;

export default function SystemUserListScreen() {
  const { colors } = useTheme();
  const styles = createSystemListScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const users = useAppSelector(selectSystemUsers);
  const pagination = useAppSelector(selectSystemUserPagination);
  const isLoading = useAppSelector(selectSystemUserLoading);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const loadUsers = useCallback(
    (nextPage: number, searchTerm: string) => {
      dispatch(
        fetchSystemUsers({
          page: nextPage,
          limit: PAGE_SIZE,
          search: searchTerm || undefined,
        }),
      )
        .unwrap()
        .catch(error => {
          showErrorToast(
            typeof error === 'string' ? error : 'Failed to load users',
          );
        });
    },
    [dispatch],
  );

  useEffect(() => {
    setPage(1);
    loadUsers(1, search);
  }, [loadUsers, search]);

  const handleRefresh = () => {
    setPage(1);
    loadUsers(1, search);
  };

  const handleLoadMore = () => {
    if (isLoading || !pagination) {
      return;
    }
    if (page >= (pagination.totalPages || 1)) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    loadUsers(nextPage, search);
  };

  const hasMore = pagination != null && page < (pagination.totalPages || 1);

  const renderItem = ({ item }: { item: SystemUser }) => (
    <Pressable
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('SystemUserDetail', { userId: item.id })
      }
    >
      <Text style={styles.listItemTitle}>
        {formatUserName({
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
        })}
      </Text>
      <Text style={styles.listItemMeta}>{item.email ?? '—'}</Text>
      <Text style={styles.listItemMeta}>
        {item.isActive ? 'Active' : 'Inactive'}
        {item.roles?.length
          ? ` · ${item.roles.map(role => role.name).join(', ')}`
          : ''}
      </Text>
    </Pressable>
  );

  return (
    <ScreenContainer>
      <Text style={styles.heading}>System users</Text>
      <Text style={styles.subheading}>Read-only list of system users.</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search users"
        placeholderTextColor={colors.mutedForeground}
        style={styles.searchInput}
        autoCapitalize="none"
      />

      {isLoading && users.length === 0 ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No users found.</Text>
          }
          ListFooterComponent={
            hasMore ? (
              <Pressable style={styles.loadMoreButton} onPress={handleLoadMore}>
                <Text style={styles.loadMoreText}>
                  {isLoading ? 'Loading…' : 'Load more'}
                </Text>
              </Pressable>
            ) : null
          }
        />
      )}
    </ScreenContainer>
  );
}
