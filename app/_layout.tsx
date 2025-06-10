import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UserProvider } from '../context/UserContext';

// Layout raíz de la app con un Stack Navigator
export default function RootLayout() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaProvider>
    </UserProvider>
  );
}
