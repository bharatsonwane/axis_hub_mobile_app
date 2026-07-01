import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  Carrier,
  CarrierQueryParams,
  SystemDashboardStats,
} from '@/schemaTypes/carrierSchemaTypes';
import {
  getAppErrorMessage,
  getAxios,
  getPaginationMetadata,
} from '@/utils/axiosApi';

export const fetchCarriers = createAsyncThunk(
  'carrier/fetchAll',
  async (params: CarrierQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await getAxios().get('/api/system/tenants', {
        params: params ?? {},
      });
      const pagination = getPaginationMetadata(response);

      return {
        data: response.data as Carrier[],
        pagination,
        page: params?.page ?? 1,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch carriers' }),
      );
    }
  },
);

export const fetchCarrierById = createAsyncThunk(
  'carrier/fetchById',
  async (carrierId: number, { rejectWithValue }) => {
    try {
      const response = await getAxios().get(`/api/system/tenants/${carrierId}`);
      return response.data as Carrier;
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({ error, message: 'Failed to fetch carrier' }),
      );
    }
  },
);

export const fetchSystemDashboardStats = createAsyncThunk(
  'systemDashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const axios = getAxios();
      const [carriersRes, requestedRes, usersRes, rolesRes] = await Promise.all([
        axios.get('/api/system/tenants', {
          params: { page: 1, limit: 1, isRequested: false },
        }),
        axios.get('/api/system/tenants', {
          params: { page: 1, limit: 1, isRequested: true },
        }),
        axios.get('/api/system/users', { params: { page: 1, limit: 1 } }),
        axios.get('/api/system/roles', { params: { page: 1, limit: 1 } }),
      ]);

      const rolesPayload = rolesRes.data as { data?: unknown[] } | unknown[];
      const rolesCount = Array.isArray(rolesPayload)
        ? rolesPayload.length
        : (rolesPayload.data?.length ?? 0);

      const stats: SystemDashboardStats = {
        activeCarriers:
          getPaginationMetadata(carriersRes)?.total ??
          (carriersRes.data as Carrier[]).length,
        requestedCarriers: getPaginationMetadata(requestedRes)?.total ?? 0,
        systemUsers:
          getPaginationMetadata(usersRes)?.total ??
          (usersRes.data as unknown[]).length,
        systemRoles:
          getPaginationMetadata(rolesRes)?.total ?? rolesCount,
      };

      return stats;
    } catch (error: unknown) {
      return rejectWithValue(
        getAppErrorMessage({
          error,
          message: 'Failed to load dashboard metrics',
        }),
      );
    }
  },
);
