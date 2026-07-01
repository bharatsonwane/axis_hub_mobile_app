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
import type { DbSecretsEntity } from '@/schemaTypes/dbSecretsSchemaTypes';
import { fetchSystemDbSecrets } from '@/redux/actions/systemDbSecretsActions';
import {
  selectSystemSecrets,
  selectSystemSecretsLoading,
  selectSystemSecretsPagination,
} from '@/redux/slices/systemDbSecretsSlice';
import { createSystemListScreenStyles } from '@/pages/System/shared/listScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { showErrorToast } from '@/utils/toast';

const PAGE_SIZE = 20;

export default function SystemDbSecretsList() {
  const { colors } = useTheme();
  const styles = createSystemListScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const secrets = useAppSelector(selectSystemSecrets);
  const pagination = useAppSelector(selectSystemSecretsPagination);
  const isLoading = useAppSelector(selectSystemSecretsLoading);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const loadSecrets = useCallback(
    (nextPage: number, keyName: string) => {
      dispatch(
        fetchSystemDbSecrets({
          page: nextPage,
          limit: PAGE_SIZE,
          keyName: keyName || undefined,
        }),
      )
        .unwrap()
        .catch(error => {
          showErrorToast(
            typeof error === 'string' ? error : 'Failed to load secrets',
          );
        });
    },
    [dispatch],
  );

  useEffect(() => {
    setPage(1);
    loadSecrets(1, search);
  }, [loadSecrets, search]);

  const handleRefresh = () => {
    setPage(1);
    loadSecrets(1, search);
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
    loadSecrets(nextPage, search);
  };

  const hasMore =
    pagination != null && page < (pagination.totalPages || 1);

  const renderItem = ({ item }: { item: DbSecretsEntity }) => (
    <Pressable
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('SystemSecretDetail', { secretId: item.id })
      }
    >
      <Text style={styles.listItemTitle}>{item.keyName}</Text>
      <Text style={styles.listItemMeta}>
        {item.isActive ? 'Active' : 'Inactive'}
        {item.isSensitive ? ' · Sensitive' : ''}
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
      <Text style={styles.heading}>System secrets</Text>
      <Text style={styles.subheading}>
        Read-only metadata. Secret values are never shown on mobile.
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Filter by key name"
        placeholderTextColor={colors.mutedForeground}
        style={styles.searchInput}
        autoCapitalize="none"
      />

      {isLoading && secrets.length === 0 ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <FlatList
          data={secrets}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No secrets found.</Text>
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
