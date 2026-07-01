import { z } from 'zod';
import Config from 'react-native-config';
import pkg from '../../package.json';

const envConfigSchema = z.object({
  app: z.object({
    APP_ENV: z.enum(['dev', 'prod', 'test']),
    APP_NAME: z.string().min(1),
    APP_WEB_URL: z.string().url().optional(),
  }),
  api: z.object({
    API_BASE_URL: z.string().url(),
  }),
  auth: z.object({
    jwtStorageKey: z.string().min(1),
    refreshTokenStorageKey: z.string().min(1),
  }),
  appVersion: z.string().min(1),
});

export type EnvConfig = z.infer<typeof envConfigSchema>;

const parseAppEnv = (value?: string): EnvConfig['app']['APP_ENV'] => {
  if (value === 'prod' || value === 'test' || value === 'dev') {
    return value;
  }
  return 'dev';
};

const getEnvConfig = (): EnvConfig => {
  const environmentVariable: EnvConfig = {
    app: {
      APP_ENV: parseAppEnv(Config.APP_ENV),
      APP_NAME: Config.APP_NAME || 'Axis Hub',
      APP_WEB_URL: Config.APP_WEB_URL,
    },
    api: {
      API_BASE_URL:
        Config.API_BASE_URL || 'https://dzpceo1q508ta.cloudfront.net',
    },
    auth: {
      jwtStorageKey: Config.JWT_STORAGE_KEY || 'auth_token',
      refreshTokenStorageKey:
        Config.REFRESH_TOKEN_STORAGE_KEY || 'refresh_token',
    },
    appVersion: pkg.version,
  };

  return envConfigSchema.parse(environmentVariable);
};

export const envConfig = getEnvConfig();
