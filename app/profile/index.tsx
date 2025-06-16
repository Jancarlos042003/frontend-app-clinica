import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <UserCircle color="#32729F" size={110} />
      </View>
      <View style={styles.infoCard}>
        <View style={styles.infoList}>
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
      <View style={styles.logoutButtonContainer}>
        <LogoutButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F7FA',
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
  },
  infoCard: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  infoList: {
    gap: 24,
  },
  logoutButtonContainer: {
    marginTop: 20,
  },
});

export default Index;
