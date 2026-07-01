import axios, {
  type AxiosInstance,
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { envConfig } from '@/config/envConfig';
import { store } from '@/redux/store';
import { logoutUser } from '@/redux/actions/authActions';
import { getAuthToken } from '@/utils/authToken';

export const getToken = async (): Promise<string | null> => {
  const keychainToken = await getAuthToken();
  if (keychainToken) {
    return keychainToken;
  }

  const state = store.getState();
  return state.user.token;
};

export const getAxios = (specificBaseUrl?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: specificBaseUrl ?? envConfig.api.API_BASE_URL,
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    async (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(logoutUser());
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const getAppErrorMessage = ({
  error,
  message,
}: {
  error: unknown;
  message: string;
}): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? message;
  }
  return error instanceof Error && error.message
    ? error.message
    : message || 'Something went wrong';
};

export interface PaginationMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function getPaginationMetadata(
  response: AxiosResponse,
): PaginationMetadata | null {
  const headers = response.headers;
  const totalCount = headers['x-total-count'];
  const page = headers['x-page'];
  const limit = headers['x-limit'];
  const totalPages = headers['x-total-pages'];

  if (!totalCount && !page && !limit && !totalPages) {
    return null;
  }

  return {
    total: totalCount ? parseInt(String(totalCount), 10) : 0,
    page: page ? parseInt(String(page), 10) : 0,
    limit: limit ? parseInt(String(limit), 10) : 0,
    totalPages: totalPages ? parseInt(String(totalPages), 10) : 0,
  };
}
