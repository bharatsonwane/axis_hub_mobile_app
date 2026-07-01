import { io, type Socket } from 'socket.io-client';
import { envConfig } from '@/config/envConfig';
import { getAuthToken } from '@/utils/authToken';

interface AuthPayload {
  token: string;
  tenantId?: number;
}

const SOCKET_CONNECT_TIMEOUT_MS = 20_000;

function waitForSocketConnectAttempt(socket: Socket): Promise<void> {
  return new Promise(resolve => {
    let settled = false;
    const timeoutId = setTimeout(() => {
      finish();
    }, SOCKET_CONNECT_TIMEOUT_MS);

    const detachAll = () => {
      clearTimeout(timeoutId);
      socket.off('connect', onSuccess);
      socket.off('reconnect', onSuccess);
      socket.off('connect_error', onFailure);
      socket.off('error', onFailure);
      socket.off('disconnect', onFailure);
      socket.off('reconnect_error', onFailure);
      socket.off('reconnect_failed', onFailure);
    };

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      detachAll();
      resolve();
    };

    const onSuccess = () => finish();
    const onFailure = () => finish();

    socket.on('connect', onSuccess);
    socket.on('reconnect', onSuccess);
    socket.on('connect_error', onFailure);
    socket.on('error', onFailure);
    socket.on('disconnect', onFailure);
    socket.on('reconnect_error', onFailure);
    socket.on('reconnect_failed', onFailure);
  });
}

export class SocketManager {
  private static isConnecting = false;
  private static lastHandshakeTenantId: number | undefined = undefined;

  static socketIo: Socket = io(envConfig.api.API_BASE_URL, {
    autoConnect: false,
    transports: ['websocket', 'polling'],
  });

  static connect = async ({
    tenantId,
  }: {
    tenantId?: number;
  } = {}): Promise<Socket> => {
    try {
      const jwtToken = await getAuthToken();

      if (!jwtToken) {
        throw new Error('Invalid token');
      }

      const auth: AuthPayload = {
        token: jwtToken,
        tenantId,
      };

      const tenantAuthChanged =
        SocketManager.socketIo.connected &&
        SocketManager.lastHandshakeTenantId !== tenantId;

      if (tenantAuthChanged) {
        SocketManager.socketIo.disconnect();
        SocketManager.lastHandshakeTenantId = undefined;
      }

      SocketManager.socketIo.auth = auth;

      if (SocketManager.socketIo.connected && !tenantAuthChanged) {
        return SocketManager.socketIo;
      }

      if (SocketManager.isConnecting) {
        await waitForSocketConnectAttempt(SocketManager.socketIo);
        return SocketManager.socketIo;
      }

      SocketManager.isConnecting = true;
      SocketManager.socketIo.connect();
      await waitForSocketConnectAttempt(SocketManager.socketIo);
      SocketManager.isConnecting = false;

      if (SocketManager.socketIo.connected) {
        SocketManager.lastHandshakeTenantId = tenantId;
      }

      return SocketManager.socketIo;
    } catch {
      SocketManager.isConnecting = false;
      return SocketManager.socketIo;
    }
  };

  static async disconnect(): Promise<void> {
    if (SocketManager.socketIo) {
      SocketManager.lastHandshakeTenantId = undefined;
      SocketManager.socketIo.disconnect();
    }
  }
}
