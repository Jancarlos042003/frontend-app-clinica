import { useState } from 'react';
import { Pressable, View, Text } from 'react-native';

import UserProfileInfo from './UserProfileInfo';
import ModalEditAttempts from '../../app/profile/modal-edit-attempts';
import ModalEditFrequency from '../../app/profile/modal-edit-frequency';
import ModalEditTolerance from '../../app/profile/modal-edit-tolerance';
import { UserSettings } from '../../types/settings';
import { BellIcon } from '../icons/icons';

interface MedicationSettingsCardProps {
  userSettings: UserSettings | null;
  onSaveAttempts: (value: number) => Promise<void>;
}

const MedicationSettingsCard = ({ userSettings, onSaveAttempts }: MedicationSettingsCardProps) => {
  const [showModalFrequency, setShowModalFrequency] = useState(false);
  const [showModalTolerance, setShowModalTolerance] = useState(false);
  const [showModalAttempts, setShowModalAttempts] = useState(false);

  const handleEditTolerance = () => {
    setShowModalTolerance(true);
  };

  const handleEditFrequency = () => {
    setShowModalFrequency(true);
  };

  const handleEditAttempts = () => {
    setShowModalAttempts(true);
  };

  return (
    <View className="shadow-xs mx-4 mb-6 rounded-2xl bg-white p-5">
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 rounded-full bg-orange-100 p-2">
          <BellIcon color="#F97316" size={20} />
        </View>
        <Text className="text-xl font-bold text-gray-800">Config. de Recordatorios</Text>
      </View>

      <View className="gap-4">
        <Pressable
          onPress={handleEditTolerance}
          className="rounded-xl bg-orange-100/80 p-4 active:bg-orange-200/70">
          <UserProfileInfo
            content={`${userSettings?.medicationSettings?.toleranceWindowMinutes || 0} minutos`}
            icon={<BellIcon color="#F97316" size={24} />}
            title="Ventana de tolerancia"
          />
        </Pressable>

        <Pressable
          onPress={handleEditFrequency}
          className="rounded-xl bg-orange-100/80 p-4 active:bg-orange-200/70">
          <UserProfileInfo
            content={`${userSettings?.medicationSettings?.reminderFrequencyMinutes || 0} minutos`}
            icon={<BellIcon color="#F97316" size={24} />}
            title="Frecuencia de recordatorios"
          />
        </Pressable>

        <Pressable
          onPress={handleEditAttempts}
          className="rounded-xl bg-orange-100/80 p-4 active:bg-orange-200/70">
          <UserProfileInfo
            content={`${userSettings?.medicationSettings?.maxReminderAttempts || 0} intentos`}
            icon={<BellIcon color="#F97316" size={24} />}
            title="Máximo de intentos"
          />
        </Pressable>
      </View>

      {/* Modales de configuración */}
      <ModalEditTolerance showModal={showModalTolerance} setShowModal={setShowModalTolerance} />
      <ModalEditFrequency showModal={showModalFrequency} setShowModal={setShowModalFrequency} />
      <ModalEditAttempts
        showModal={showModalAttempts}
        setShowModal={setShowModalAttempts}
        currentSettings={userSettings}
        onSave={onSaveAttempts}
      />
    </View>
  );
};

export default MedicationSettingsCard;
