import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '@/pages/public/login/LoginPage';

export type AuthStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );
}
