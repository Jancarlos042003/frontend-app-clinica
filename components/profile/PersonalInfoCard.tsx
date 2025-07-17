import { useState } from 'react';
import { Pressable, View, Text } from 'react-native';

import UserProfileInfo from './UserProfileInfo';
import ModalEditEmail from '../../app/profile/modal-edit-email';
import ModalEditPhone from '../../app/profile/modal-edit-phone';
import { User } from '../../context/UserContext';
import { Calendar, DniIcon, MailIcon, PhoneIcon, UserIcon } from '../icons/icons';

interface PersonalInfoCardProps {
  user: User | null;
}

const PersonalInfoCard = ({ user }: PersonalInfoCardProps) => {
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalPhone, setShowModalPhone] = useState(false);

  const handlePhone = () => {
    setShowModalPhone(true);
  };

  const handleEmail = () => {
    setShowModalEmail(true);
  };

  return (
    <View className="shadow-xs mx-4 -mt-6 mb-6 rounded-2xl bg-white p-5">
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 rounded-full bg-[#32729F]/10 p-2">
          <UserIcon color="#32729F" size={20} />
        </View>
        <Text className="text-xl font-bold text-gray-800">Información Personal</Text>
      </View>

      <View className="gap-4">
        <View className="rounded-xl bg-primary_200/70 p-4">
          <UserProfileInfo
            content={`${user?.dni}`}
            icon={<DniIcon color="#32729F" size={21} />}
            title="DNI"
          />
        </View>

        <View className="rounded-xl bg-primary_200/70 p-4">
          <UserProfileInfo
            content={`${user?.birthDate}`}
            icon={<Calendar color="#32729F" size={24} />}
            title="Fecha de nacimiento"
          />
        </View>

        <Pressable
          onPress={handlePhone}
          className="rounded-xl bg-primary_200/60 p-4 active:bg-primary_200">
          <UserProfileInfo
            content={`${user?.phone}`}
            icon={<PhoneIcon color="#32729F" size={24} />}
            title="Teléfono"
          />
        </Pressable>

        <Pressable
          onPress={handleEmail}
          className="rounded-xl bg-primary_200/70 p-4 active:bg-primary_200">
          <UserProfileInfo
            content={`${user?.email}`}
            icon={<MailIcon color="#32729F" size={24} />}
            title="Correo"
          />
        </Pressable>
      </View>

      {/* Modales */}
      <ModalEditPhone showModal={showModalPhone} setShowModal={setShowModalPhone} />
      <ModalEditEmail showModal={showModalEmail} setShowModal={setShowModalEmail} />
    </View>
  );
};

export default PersonalInfoCard;
