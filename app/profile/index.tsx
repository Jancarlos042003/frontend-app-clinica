import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import LogoutButton from '../../components/buttons/LogoutButton';
import {
  Calendar,
  DniIcon,
  MailIcon,
  PhoneIcon,
  UserCircle,
  UserIcon,
} from '../../components/icons/icons';
import UserProfileInfo from '../../components/profile/UserProfileInfo';
import { useUser } from '../../hooks/useUser';

const Index = () => {
  const { user } = useUser();
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      lastname: user?.lastname || '',
      dni: user?.dni || '',
      birthDate: user?.birthDate || '',
      phone: user?.phone || '',
      email: user?.email || '',
    },
  });

  const handlePhone = () => {
    router.push({
      pathname: '/profile/modal-edit-phone',
    });
  };

  const handleEmail = () => {
    router.push('/profile/modal-edit-email');
  };

  return (
    <View className="flex-1 p-5">
      <View className="mb-5 items-center justify-center pt-8">
        <UserCircle color="#32729F" size={110} />
      </View>
      <View className="w-full rounded-lg border border-gray-300 p-4">
        <View className="gap-6">
          <UserProfileInfo
            content={`${user?.name} ${user?.lastname}`}
            icon={<UserIcon color="#32729F" size={24} />}
            title="Nombre completo"
          />

          <UserProfileInfo
            content={`${user?.dni}`}
            icon={<DniIcon color="#32729F" size={21} />}
            title="DNI"
          />

          <UserProfileInfo
            content={`${user?.birthDate}`}
            icon={<Calendar color="#32729F" size={24} />}
            title="Fecha de nacimiento"
          />

          {/*AGREGAR EL GENERO DEL PACIENTE*/}

          <Pressable onPress={handlePhone}>
            <UserProfileInfo
              content={`${user?.phone}`}
              icon={<PhoneIcon color="#32729F" size={24} />}
              title="Teléfono"
            />
          </Pressable>

          <Pressable onPress={handleEmail}>
            <UserProfileInfo
              content={`${user?.email}`}
              icon={<MailIcon color="#32729F" size={24} />}
              title="Correo"
            />
          </Pressable>
        </View>
      </View>
      <View className="mt-5">
        <LogoutButton />
      </View>
    </View>
  );
};

export default Index;
