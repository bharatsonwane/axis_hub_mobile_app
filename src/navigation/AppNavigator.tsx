import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlaceholderHomeScreen from '@/screens/PlaceholderHomeScreen';

export type AppStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={PlaceholderHomeScreen} />
    </Stack.Navigator>
  );
}
