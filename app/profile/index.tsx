import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Pressable, View, Text, ScrollView } from 'react-native';

import LogoutButton from '../../components/buttons/LogoutButton';
import {
  Calendar,
  DniIcon,
  MailIcon,
  PhoneIcon,
  UserCircle,
  UserIcon,
  BellIcon,
  ContactsIcon,
  PlusCircleIcon,
} from '../../components/icons/icons';
import UserProfileInfo from '../../components/profile/UserProfileInfo';
import useApi from '../../hooks/useApi';
import { useUser } from '../../hooks/useUser';
import { UserSettings } from '../../types/settings';
import Loader from '~/components/iu/Loader';
import ModalEditFrequency from './modal-edit-frequency';
import ModalEditTolerance from './modal-edit-tolerance';
import ModalEditAttempts from './modal-edit-attempts';
import ModalEditEmail from './modal-edit-email';
import ModalEditPhone from './modal-edit-phone';

const Index = () => {
  const router = useRouter();
  const { fetchData, data, error, loading } = useApi();
  const { user } = useUser();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [showModalFrecuency, setShowModalFrecuency] = useState(false);
  const [showModalTolerance, setShowModalTolerance] = useState(false);
  const [showModalAttempts, setShowModalAttempts] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalPhone, setShowModalPhone] = useState(false);

  useEffect(() => {
    console.log('ID del paciente:', user?.patientId);
    // Esta es una funcion asíncrona
    fetchData(`/api/users/${user?.patientId}/settings`, 'GET');
  }, [user]);

  useEffect(() => {
    // Se llama a setUserSettings cuando data tiene un valor actualizado
    console.log('Datos obtenidos:', data);
    if (data) {
      setUserSettings(data);
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

  const handlePhone = () => {
    setShowModalPhone(true);
  };

  const handleEmail = () => {
    setShowModalEmail(true);
  };

  const handleEditTolerance = () => {
    setShowModalTolerance(true);
  };

  const handleEditFrequency = () => {
    setShowModalFrecuency(true);
  };

  const handleEditAttempts = () => {
    setShowModalAttempts(true);
  };

  const handleAddContact = () => {
    router.push('/profile/modal-add-emergency-contact');
  };

  const handleMedicationSettings = () => {
    router.push({
      pathname: '/profile/modal-edit-medication-settings',
      params: {
        toleranceWindowMinutes: userSettings?.medicationSettings.toleranceWindowMinutes,
        reminderFrequencyMinutes: userSettings?.medicationSettings.reminderFrequencyMinutes,
        maxReminderAttempts: userSettings?.medicationSettings.maxReminderAttempts,
      },
    });
  };

  const handleAddEmergencyContact = () => {
    router.push('/profile/modal-add-emergency-contact');
  };

  const handleEditEmergencyContact = (contactId: number) => {
    const contact = userSettings?.emergencyContacts.find((c) => c.id === contactId);
    if (contact) {
      router.push({
        pathname: '/profile/modal-edit-emergency-contact',
        params: {
          contactId: contact.id,
          name: contact.name,
          phone: contact.phone,
          relationship: contact.relationship,
        },
      });
    }
  };

  if (loading) return <Loader message="Cargando perfil..." />;

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-5">
      <View className="mb-5 items-center justify-center pt-8">
        <UserCircle color="#32729F" size={110} />
      </View>

      {/* Información personal */}
      <View className="mb-4 w-full rounded-lg border border-gray-300 p-4">
        <Text className="mb-2 text-xl font-bold text-gray-800">Información Personal</Text>
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
          <ModalEditPhone showModal={showModalPhone} setShowModal={setShowModalPhone} />

          <Pressable onPress={handleEmail}>
            <UserProfileInfo
              content={`${user?.email}`}
              icon={<MailIcon color="#32729F" size={24} />}
              title="Correo"
            />
          </Pressable>
          <ModalEditEmail showModal={showModalEmail} setShowModal={setShowModalEmail} />
        </View>
      </View>

      {/* Configuración de medicamentos */}
      <View className="mb-4 w-full rounded-lg border border-gray-300 p-4">
        <Text className="mb-2 text-xl font-bold text-gray-800">Configuración de Recordatorios</Text>
        <View className="gap-6">
          <Pressable onPress={handleEditTolerance}>
            <UserProfileInfo
              content={`${userSettings?.medicationSettings?.toleranceWindowMinutes || 0} minutos`}
              icon={<BellIcon color="#32729F" size={24} />}
              title="Ventana de tolerancia"
            />
          </Pressable>
          <ModalEditTolerance showModal={showModalTolerance} setShowModal={setShowModalTolerance} />

          <Pressable onPress={handleEditFrequency}>
            <UserProfileInfo
              content={`${userSettings?.medicationSettings?.reminderFrequencyMinutes || 0} minutos`}
              icon={<BellIcon color="#32729F" size={24} />}
              title="Frecuencia de recordatorios"
            />
          </Pressable>
          <ModalEditFrequency showModal={showModalFrecuency} setShowModal={setShowModalFrecuency} />

          <Pressable onPress={handleEditAttempts}>
            <UserProfileInfo
              content={`${userSettings?.medicationSettings?.maxReminderAttempts || 0} intentos`}
              icon={<BellIcon color="#32729F" size={24} />}
              title="Máximo de intentos"
            />
          </Pressable>
          <ModalEditAttempts
            showModal={showModalAttempts}
            setShowModal={setShowModalAttempts}
            currentSettings={userSettings}
            onSave={handleSaveAttempts}
          />
        </View>
      </View>

      {/* Contactos de emergencia */}
      <View className="mb-4 w-full rounded-lg border border-gray-300 p-4">
        <Text className="mb-2 text-xl font-bold text-gray-800">Contactos de Emergencia</Text>

        {userSettings?.emergencyContacts && userSettings.emergencyContacts.length > 0 ? (
          userSettings.emergencyContacts.map((contact, index) => (
            <Pressable
              key={contact.id || index}
              onPress={() => contact.id && handleEditEmergencyContact(contact.id)}>
              <View className="border-b border-gray-200 py-3 last:border-b-0">
                <UserProfileInfo
                  content={contact.name}
                  icon={<ContactsIcon color="#32729F" size={24} />}
                  title={contact.relationship}
                  subtitle={contact.phone}
                />
              </View>
            </Pressable>
          ))
        ) : (
          <View className="items-center py-4">
            <Text className="mb-4 text-gray-500">No hay contactos de emergencia registrados</Text>
            <Pressable
              onPress={handleAddEmergencyContact}
              className="flex-row items-center rounded-md bg-[#32729F] px-4 py-2">
              <PlusCircleIcon color="#ffffff" size={20} />
              <Text className="ml-2 font-medium text-white">Agregar contacto</Text>
            </Pressable>
          </View>
        )}

        {userSettings?.emergencyContacts && userSettings.emergencyContacts.length > 0 && (
          <Pressable
            onPress={handleAddEmergencyContact}
            className="mt-4 flex-row items-center justify-center rounded-md bg-[#32729F] px-4 py-2">
            <PlusCircleIcon color="#ffffff" size={20} />
            <Text className="ml-2 font-medium text-white">Agregar nuevo contacto</Text>
          </Pressable>
        )}
      </View>
      <View className="mb-8 mt-2">
        <LogoutButton />
      </View>
    </ScrollView>
  );
};

export default Index;
