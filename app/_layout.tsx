import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UserProvider } from '../context/UserContext';

// Layout raíz de la app con un Stack Navigator
export default function RootLayout() {
  return (
    <UserProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaProvider>
      </PaperProvider>
    </UserProvider>
  );
}
