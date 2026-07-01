import { DeviceEventEmitter } from 'react-native';

export const AUTH_LOGOUT_EVENT = 'auth:logout';

export const emitAuthLogout = (): void => {
  DeviceEventEmitter.emit(AUTH_LOGOUT_EVENT);
};
