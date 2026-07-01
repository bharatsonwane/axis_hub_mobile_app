import React from 'react';
import { useAuth } from '@/contexts/AuthContextProvider';
import AppNavigator from '@/navigation/AppNavigator';
import AuthNavigator from '@/navigation/AuthNavigator';

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
}
