import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UserProvider } from '../context/UserContext';
import { SymptomProvider } from '~/context/SymptomContext';
import { MedicationProvider } from '~/context/MedicationContext';

// Layout raíz de la app con un Stack Navigator
export default function RootLayout() {
  return (
    <UserProvider>
      <MedicationProvider>
        <SymptomProvider>
          <PaperProvider>
            <SafeAreaProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </SafeAreaProvider>
          </PaperProvider>
        </SymptomProvider>
      </MedicationProvider>
    </UserProvider>
  );
}
