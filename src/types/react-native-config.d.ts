declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL?: string;
    APP_ENV?: string;
    APP_NAME?: string;
    APP_WEB_URL?: string;
    JWT_STORAGE_KEY?: string;
    REFRESH_TOKEN_STORAGE_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
