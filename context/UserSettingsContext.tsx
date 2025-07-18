import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

import { useUser } from '~/hooks/useUser';
import { apiService } from '~/services/apiService';
import { UserSettings } from '~/types/settings';

interface UserSettingsContextType {
  userSettings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
  refetchUserSettings: () => Promise<void>;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

interface UserSettingsProviderProps {
  children: ReactNode;
}

export const UserSettingsProvider = ({ children }: UserSettingsProviderProps) => {
  const { user, token } = useUser();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserSettings = async () => {
    if (!user?.patientId) {
      setUserSettings(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiService.get(`/user-settings/patient/${user.patientId}`);
      setUserSettings(data as UserSettings);
    } catch (err) {
      console.error('Error fetching user settings:', err);
      setError('Error al cargar configuración del usuario');
      setUserSettings(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchUserSettings = async () => {
    await fetchUserSettings();
  };

  useEffect(() => {
    fetchUserSettings();
  }, [user?.patientId, token]);

  const value: UserSettingsContextType = {
    userSettings,
    isLoading,
    error,
    refetchUserSettings,
  };

  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>;
};

export const useUserSettings = (): UserSettingsContextType => {
  const context = useContext(UserSettingsContext);

  if (context === undefined) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }

  return context;
};
