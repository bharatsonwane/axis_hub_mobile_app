import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlaceholderHomeScreen from '@/screens/PlaceholderHomeScreen';

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={PlaceholderHomeScreen} />
    </Stack.Navigator>
  );
}
