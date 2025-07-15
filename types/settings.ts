export interface MedicationSettings {
  toleranceWindowMinutes: number;
  reminderFrequencyMinutes: number;
  maxReminderAttempts: number;
}

export interface EmergencyContact {
  id?: number;
  name: string;
  phoneNumber: string;
  relationship: string;
}

export interface UserSettings {
  id: number;
  userId: number;
  medicationSettings: MedicationSettings;
  emergencyContacts: EmergencyContact[];
}
