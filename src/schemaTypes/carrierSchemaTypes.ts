import type { Pagination } from '@/schemaTypes/commonSchemaTypes';

export interface Carrier {
  id: number;
  keyName: string;
  code: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  isActive: boolean;
  isValidated: boolean;
  isUsingAxis: boolean;
  isRequested?: boolean;
  dotNumber: string | null;
  mcNumber?: string | null;
  createdAt: string;
  updatedAt?: string;
  pendingRequestsCount?: number | string;
  highwayStatus?: string | null;
  highwayInsuranceStatus?: string | null;
}

export interface CarrierQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  isValidated?: boolean;
  isUsingAxis?: boolean;
  isRequested?: boolean;
  skipPagination?: boolean;
}

export interface CarrierState {
  carriers: Carrier[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  currentCarrier: Carrier | null;
  isDetailLoading: boolean;
  detailError: string | null;
}

export interface SystemDashboardStats {
  activeCarriers: number;
  requestedCarriers: number;
  systemUsers: number;
  systemRoles: number;
}

export interface SystemDashboardState {
  stats: SystemDashboardStats | null;
  isLoading: boolean;
  error: string | null;
}
