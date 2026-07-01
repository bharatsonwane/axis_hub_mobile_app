import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCarriers,
  fetchCarrierById,
  fetchSystemDashboardStats,
} from '@/redux/actions/systemCarrierActions';
import type {
  CarrierState,
  SystemDashboardState,
} from '@/schemaTypes/carrierSchemaTypes';

const carrierInitialState: CarrierState = {
  carriers: [],
  pagination: null,
  isLoading: false,
  error: null,
  currentCarrier: null,
  isDetailLoading: false,
  detailError: null,
};

const carrierSlice = createSlice({
  name: 'carrier',
  initialState: carrierInitialState,
  reducers: {
    clearCarriers: state => {
      state.carriers = [];
      state.pagination = null;
      state.error = null;
    },
    clearCurrentCarrier: state => {
      state.currentCarrier = null;
      state.detailError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarriers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarriers.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, pagination, page } = action.payload;
        state.carriers = page > 1 ? [...state.carriers, ...data] : data;
        state.pagination = pagination;
      })
      .addCase(fetchCarriers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ?? 'Failed to fetch carriers';
      })
      .addCase(fetchCarrierById.pending, state => {
        state.isDetailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchCarrierById.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.currentCarrier = action.payload;
      })
      .addCase(fetchCarrierById.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError =
          (action.payload as string) ?? 'Failed to fetch carrier';
      });
  },
});

const dashboardInitialState: SystemDashboardState = {
  stats: null,
  isLoading: false,
  error: null,
};

const systemDashboardSlice = createSlice({
  name: 'systemDashboard',
  initialState: dashboardInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSystemDashboardStats.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSystemDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSystemDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ?? 'Failed to load dashboard';
      });
  },
});

export const { clearCarriers, clearCurrentCarrier } = carrierSlice.actions;
export const carrierReducer = carrierSlice.reducer;
export const systemDashboardReducer = systemDashboardSlice.reducer;

export const selectCarriers = (state: { carrier: CarrierState }) =>
  state.carrier.carriers;
export const selectCarrierPagination = (state: { carrier: CarrierState }) =>
  state.carrier.pagination;
export const selectCarrierLoading = (state: { carrier: CarrierState }) =>
  state.carrier.isLoading;
export const selectCurrentCarrier = (state: { carrier: CarrierState }) =>
  state.carrier.currentCarrier;
export const selectCarrierDetailLoading = (state: { carrier: CarrierState }) =>
  state.carrier.isDetailLoading;

export const selectSystemDashboardStats = (state: {
  systemDashboard: SystemDashboardState;
}) => state.systemDashboard.stats;
export const selectSystemDashboardLoading = (state: {
  systemDashboard: SystemDashboardState;
}) => state.systemDashboard.isLoading;
