import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UserProvider } from '../context/UserContext';

import { CombinedMedicationProvider } from '~/context/CombinedMedicationProvider';
import { MedicationProvider } from '~/context/MedicationContext';
import { SymptomProvider } from '~/context/SymptomContext';

// Layout raíz de la app con un Stack Navigator
export default function RootLayout() {
  return (
    <UserProvider>
      <CombinedMedicationProvider>
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
      </CombinedMedicationProvider>
    </UserProvider>
  );
}
