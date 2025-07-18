import { createContext, useContext, ReactNode } from 'react';

import { UserSettings } from '~/types/settings';

interface MedicationSettingsContextType {
  userSettings: UserSettings | null;
  toleranceWindowMinutes: number;
  reminderFrequencyMinutes: number;
  maxReminderAttempts: number;
}

const MedicationSettingsContext = createContext<MedicationSettingsContextType | undefined>(
  undefined
);

interface MedicationSettingsProviderProps {
  children: ReactNode;
  userSettings: UserSettings | null;
}

export const MedicationSettingsProvider = ({
  children,
  userSettings,
}: MedicationSettingsProviderProps) => {
  const toleranceWindowMinutes = userSettings?.medicationSettings?.toleranceWindowMinutes || 30;
  const reminderFrequencyMinutes = userSettings?.medicationSettings?.reminderFrequencyMinutes || 15;
  const maxReminderAttempts = userSettings?.medicationSettings?.maxReminderAttempts || 3;

  const value: MedicationSettingsContextType = {
    userSettings,
    toleranceWindowMinutes,
    reminderFrequencyMinutes,
    maxReminderAttempts,
  };

  return (
    <MedicationSettingsContext.Provider value={value}>
      {children}
    </MedicationSettingsContext.Provider>
  );
};

export const useMedicationSettings = (): MedicationSettingsContextType => {
  const context = useContext(MedicationSettingsContext);

  if (context === undefined) {
    throw new Error('useMedicationSettings must be used within a MedicationSettingsProvider');
  }

  return context;
};
