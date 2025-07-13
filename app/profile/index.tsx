import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Pressable, View, Text, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';

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

import ModalEditAttempts from './modal-edit-attempts';
import ModalEditEmail from './modal-edit-email';
import ModalEditFrequency from './modal-edit-frequency';
import ModalEditPhone from './modal-edit-phone';
import ModalEditTolerance from './modal-edit-tolerance';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Index = () => {
  const router = useRouter();
  const { fetchData, data, loading } = useApi();
  const { user } = useUser();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [showModalFrecuency, setShowModalFrecuency] = useState(false);
  const [showModalTolerance, setShowModalTolerance] = useState(false);
  const [showModalAttempts, setShowModalAttempts] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalPhone, setShowModalPhone] = useState(false);
  const inset = useSafeAreaInsets();

  useEffect(() => {
    console.log('ID del paciente:', user?.patientId);
    fetchData(`/api/users/${user?.patientId}/settings`, 'GET');
  }, [user]);

  useEffect(() => {
    console.log('Datos obtenidos:', data);
    if (data && typeof data === 'object') {
      setUserSettings(data as UserSettings);
    }
  }, [data]);

  const handleSaveAttempts = async (newValue: number) => {
    try {
      console.log('Guardando nuevo valor de intentos:', newValue);
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

  // FUNCIÓN PARA PEDIR PERMISO DE UBICACIÓN
  const pedirPermisoUbicacion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de ubicación denegado');
      return false;
    }
    Alert.alert('Permiso de ubicación concedido');
    return true;
  };

  if (loading) return <Loader />;

  return (
    <View className="flex-1" style={{ paddingBottom: inset.bottom }}>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-[#d9eff4]] flex-1">
        {/* Header con gradiente visual */}
        <View className="bg-gradient-to-br from-[#32729F] to-[#4A90C2] px-6 pb-8 pt-12">
          <View className="items-center">
            <View className="mb-4 rounded-full bg-primary_300/40 p-5 shadow-lg">
              <UserCircle color="#32729F" size={80} />
            </View>
            <Text className="text-center text-2xl font-bold text-[#32729F]">
              {user?.name} {user?.lastname}
            </Text>
          </View>
        </View>

        {/* Información personal */}
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

            {/*AGREGAR EL GENERO DEL PACIENTE*/}

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

            {/* BOTÓN PARA DAR PERMISO DE UBICACIÓN */}
            <View style={{ marginTop: 8 }}>
              <Pressable
                onPress={pedirPermisoUbicacion}
                className="rounded-xl bg-blue-200 p-4 active:bg-blue-300"
                style={{ alignItems: 'center' }}
              >
                <Text style={{ color: '#32729F', fontWeight: 'bold' }}>
                  Dar permiso de ubicación
                </Text>
              </Pressable>
            </View>
            {/* FIN BOTÓN */}
          </View>
        </View>

        {/* Modales */}
        <ModalEditPhone showModal={showModalPhone} setShowModal={setShowModalPhone} />
        <ModalEditEmail showModal={showModalEmail} setShowModal={setShowModalEmail} />

        {/* Configuración de medicamentos */}
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
        </View>

        {/* Modales de configuración */}
        <ModalEditTolerance showModal={showModalTolerance} setShowModal={setShowModalTolerance} />
        <ModalEditFrequency showModal={showModalFrecuency} setShowModal={setShowModalFrecuency} />
        <ModalEditAttempts
          showModal={showModalAttempts}
          setShowModal={setShowModalAttempts}
          currentSettings={userSettings}
          onSave={handleSaveAttempts}
        />

        {/* Contactos de emergencia */}
        <View className="shadow-xs mx-4 mb-6 rounded-2xl bg-white p-6">
          <View className="mb-4 flex-row items-center">
            <View className="mr-3 rounded-full bg-green-100 p-2">
              <ContactsIcon color="#10B981" size={20} />
            </View>
            <Text className="text-xl font-bold text-gray-800">Contactos de Emergencia</Text>
          </View>

          {userSettings?.emergencyContacts && userSettings.emergencyContacts.length > 0 ? (
            <View className="gap-3">
              {userSettings.emergencyContacts.map((contact, index) => (
                <Pressable
                  key={contact.id || index}
                  onPress={() => contact.id && handleEditEmergencyContact(contact.id)}
                  className="rounded-xl bg-green-50 p-4 active:bg-green-100">
                  <UserProfileInfo
                    content={contact.name}
                    icon={<ContactsIcon color="#10B981" size={24} />}
                    title={contact.relationship}
                    subtitle={contact.phone}
                  />
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="items-center rounded-xl bg-gray-200/80 py-8">
              <View className="mb-4 rounded-full bg-gray-200 p-4">
                <ContactsIcon color="#9CA3AF" size={32} />
              </View>
              <Text className="mb-4 text-center text-gray-500">
                No hay contactos de emergencia registrados
              </Text>
              <Pressable
                onPress={handleAddEmergencyContact}
                className="flex-row items-center rounded-xl bg-[#32729F] px-6 py-3 shadow-sm active:bg-[#2A5F85]">
                <PlusCircleIcon color="#ffffff" size={20} />
                <Text className="ml-2 font-semibold text-white">Agregar contacto</Text>
              </Pressable>
            </View>
          )}

          {userSettings?.emergencyContacts && userSettings.emergencyContacts.length > 0 && (
            <Pressable
              onPress={handleAddEmergencyContact}
              className="mt-4 flex-row items-center justify-center rounded-xl bg-[#32729F] px-6 py-3 shadow-sm active:bg-[#2A5F85]">
              <PlusCircleIcon color="#ffffff" size={20} />
              <Text className="ml-2 font-semibold text-white">Agregar nuevo contacto</Text>
            </Pressable>
          )}
        </View>

        {/* Botón de logout */}
        <View className="mx-4 mb-8">
          <LogoutButton />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;