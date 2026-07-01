import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from '@/redux/slices/authSlice';
import { carrierReducer, systemDashboardReducer } from '@/redux/slices/systemCarrierSlice';
import systemUserSlice from '@/redux/slices/systemUserSlice';
import systemRoleSlice from '@/redux/slices/systemRoleSlice';
import systemDbSecretsSlice from '@/redux/slices/systemDbSecretsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
  user: authSlice.reducer,
  carrier: carrierReducer,
  systemDashboard: systemDashboardReducer,
  systemUser: systemUserSlice.reducer,
  systemRole: systemRoleSlice.reducer,
  systemDbSecrets: systemDbSecretsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export function purgeStore() {
  return persistor.purge();
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
