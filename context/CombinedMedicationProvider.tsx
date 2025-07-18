import { ReactNode } from 'react';

import { MedicationSettingsProvider } from './MedicationSettingsContext';
import { UserSettingsProvider, useUserSettings } from './UserSettingsContext';

interface CombinedMedicationProviderProps {
  children: ReactNode;
}

// Componente interno que usa useUserSettings
const MedicationSettingsWrapper = ({ children }: { children: ReactNode }) => {
  const { userSettings } = useUserSettings();

  return (
    <MedicationSettingsProvider userSettings={userSettings}>{children}</MedicationSettingsProvider>
  );
};

// Componente principal que combina ambos providers
export const CombinedMedicationProvider = ({ children }: CombinedMedicationProviderProps) => {
  return (
    <UserSettingsProvider>
      <MedicationSettingsWrapper>{children}</MedicationSettingsWrapper>
    </UserSettingsProvider>
  );
};
