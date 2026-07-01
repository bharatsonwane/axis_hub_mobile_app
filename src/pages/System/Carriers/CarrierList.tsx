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
import type { Carrier } from '@/schemaTypes/carrierSchemaTypes';
import { fetchCarriers } from '@/redux/actions/systemCarrierActions';
import {
  selectCarrierLoading,
  selectCarrierPagination,
  selectCarriers,
} from '@/redux/slices/systemCarrierSlice';
import { createSystemListScreenStyles } from '@/pages/System/shared/listScreen.styles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@/providers/ThemeProvider';
import { showErrorToast } from '@/utils/toast';

const PAGE_SIZE = 20;

export default function CarrierList() {
  const { colors } = useTheme();
  const styles = createSystemListScreenStyles({ colors });
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const carriers = useAppSelector(selectCarriers);
  const pagination = useAppSelector(selectCarrierPagination);
  const isLoading = useAppSelector(selectCarrierLoading);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const loadCarriers = useCallback(
    (nextPage: number, searchTerm: string) => {
      dispatch(
        fetchCarriers({
          page: nextPage,
          limit: PAGE_SIZE,
          search: searchTerm || undefined,
          isRequested: false,
        }),
      )
        .unwrap()
        .catch(error => {
          showErrorToast(
            typeof error === 'string' ? error : 'Failed to load carriers',
          );
        });
    },
    [dispatch],
  );

  useEffect(() => {
    setPage(1);
    loadCarriers(1, search);
  }, [loadCarriers, search]);

  const handleRefresh = () => {
    setPage(1);
    loadCarriers(1, search);
  };

  const handleLoadMore = () => {
    if (isLoading || !pagination) {
      return;
    }
    const totalPages = pagination.totalPages || 1;
    if (page >= totalPages) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    loadCarriers(nextPage, search);
  };

  const hasMore =
    pagination != null && page < (pagination.totalPages || 1);

  const renderItem = ({ item }: { item: Carrier }) => (
    <Pressable
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('SystemCarrierDetail', { carrierId: item.id })
      }
    >
      <Text style={styles.listItemTitle}>{item.name}</Text>
      <Text style={styles.listItemMeta}>
        {item.code} · {item.isActive ? 'Active' : 'Inactive'}
      </Text>
      {item.email ? (
        <Text style={styles.listItemMeta}>{item.email}</Text>
      ) : null}
    </Pressable>
  );

  return (
    <ScreenContainer>
      <Text style={styles.heading}>Carriers</Text>
      <Text style={styles.subheading}>Browse carrier tenants on the platform.</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search carriers"
        placeholderTextColor={colors.mutedForeground}
        style={styles.searchInput}
        autoCapitalize="none"
      />

      {isLoading && carriers.length === 0 ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <FlatList
          data={carriers}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No carriers found.</Text>
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
