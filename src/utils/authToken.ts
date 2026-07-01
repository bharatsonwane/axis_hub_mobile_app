import * as Keychain from 'react-native-keychain';
import { envConfig } from '@/config/envConfig';

const jwtService = envConfig.auth.jwtStorageKey;
const refreshService = envConfig.auth.refreshTokenStorageKey;

export async function setAuthToken(token: string): Promise<void> {
  await Keychain.setGenericPassword('token', token, { service: jwtService });
}

export async function getAuthToken(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({ service: jwtService });
  return credentials ? credentials.password : null;
}

export async function clearAuthTokens(): Promise<void> {
  await Promise.all([
    Keychain.resetGenericPassword({ service: jwtService }),
    Keychain.resetGenericPassword({ service: refreshService }),
  ]);
}
