import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LogoutButton from '../../components/buttons/LogoutButton';
import EmergencyContactsCard from '../../components/profile/EmergencyContactsCard';
import MedicationSettingsCard from '../../components/profile/MedicationSettingsCard';
import PersonalInfoCard from '../../components/profile/PersonalInfoCard';
import ProfileHeader from '../../components/profile/ProfileHeader';
import useApi from '../../hooks/useApi';
import { useUser } from '../../hooks/useUser';
import { EmergencyContact, UserSettings } from '../../types/settings';

import Loader from '~/components/iu/Loader';

const Index = () => {
  const { fetchData, data, loading } = useApi();
  const { user } = useUser();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const inset = useSafeAreaInsets();

  useEffect(() => {
    console.log('ID del paciente:', user?.patientId);
    // Esta es una funcion asíncrona
    fetchData(`/api/users/${user?.patientId}/settings`, 'GET');
  }, [user]);

  useEffect(() => {
    // Se actualiza el estado de userSettings y emergencyContacts cuando se obtienen los datos
    console.log('Datos obtenidos:', data);
    if (data && typeof data === 'object') {
      const settings = data as UserSettings;
      setUserSettings(settings);
      setEmergencyContacts(settings.emergencyContacts || []);
    }
  }, [data]);

  // Agrega esta función para manejar el guardado
  const handleSaveAttempts = async (newValue: number) => {
    try {
      console.log('Guardando nuevo valor de intentos:', newValue);

      // Llamar a la API

      // Actualizar el estado local
      setUserSettings((prev) =>
        prev
          ? {
              ...prev,
              medicationSettings: {
                ...prev.medicationSettings,
                maxReminderAttempts: newValue,
              },
            }
          : null
      );

      console.log('Valor guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <View className="flex-1" style={{ paddingBottom: inset.bottom }}>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-[#d9eff4]] flex-1">
        {/* Header con información del usuario */}
        <ProfileHeader user={user} />

        {/* Información personal */}
        <PersonalInfoCard user={user} />

        {/* Configuración de medicamentos */}
        <MedicationSettingsCard userSettings={userSettings} onSaveAttempts={handleSaveAttempts} />

        {/* Contactos de emergencia */}
        <EmergencyContactsCard
          emergencyContacts={emergencyContacts}
          setEmergencyContacts={setEmergencyContacts}
        />

        {/* Botón de logout */}
        <View className="mx-4 mb-8">
          <LogoutButton />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
