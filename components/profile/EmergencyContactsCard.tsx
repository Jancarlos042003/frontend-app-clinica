import { useState } from 'react';
import { Pressable, View, Text, Alert } from 'react-native';

import ModalAddEmergencyContact from '../../app/profile/modal-add-emergency-contact';
import ModalEditEmergencyContact from '../../app/profile/modal-edit-emergency-contact';
import useApi from '../../hooks/useApi';
import { useUser } from '../../hooks/useUser';
import { EmergencyContact } from '../../types/settings';
import EmergencyContactCard from '../card/EmergencyContactCard';
import { ContactsIcon, PlusCircleIcon } from '../icons/icons';

interface EmergencyContactsCardProps {
  emergencyContacts: EmergencyContact[];
  setEmergencyContacts: React.Dispatch<React.SetStateAction<EmergencyContact[]>>;
}

const EmergencyContactsCard = ({
  emergencyContacts,
  setEmergencyContacts,
}: EmergencyContactsCardProps) => {
  const { user } = useUser();
  const deleteApi = useApi();

  const [showModalEmergencyContact, setShowModalEmergencyContact] = useState(false);
  const [showModalEditEmergencyContact, setShowModalEditEmergencyContact] = useState(false);
  const [contactData, setContactData] = useState<EmergencyContact | null>(null);

  const handleAddEmergencyContact = () => {
    setShowModalEmergencyContact(true);
  };

  const handleEditEmergencyContact = (contact: EmergencyContact) => {
    setShowModalEditEmergencyContact(true);
    setContactData(contact);
  };

  const executeDeleteEmergencyContact = async (contact: EmergencyContact) => {
    try {
      console.log('Eliminando contacto:', contact.name);

      // Llamar a la API para eliminar el contacto usando el hook separado
      await deleteApi.fetchData(
        `/api/users/${user?.patientId}/settings/emergency-contacts/${contact.id}`,
        'DELETE'
      );

      // Actualizar el estado local para remover el contacto eliminado
      setEmergencyContacts((prevContacts) => prevContacts.filter((c) => c.id !== contact.id));

      console.log('Contacto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
      Alert.alert('Error', 'No se pudo eliminar el contacto. Por favor, intenta nuevamente.', [
        { text: 'OK' },
      ]);
    }
  };

  const handleDeleteEmergencyContact = (contact: EmergencyContact) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar a ${contact.name} de tus contactos de emergencia?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => executeDeleteEmergencyContact(contact),
        },
      ]
    );
  };

  return (
    <View className="shadow-xs mx-4 mb-6 rounded-2xl bg-white p-6">
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 rounded-full bg-green-100 p-2">
          <ContactsIcon color="#10B981" size={20} />
        </View>
        <Text className="text-xl font-bold text-gray-800">Contactos de Emergencia</Text>
      </View>

      {emergencyContacts && emergencyContacts.length > 0 ? (
        <View className="gap-3">
          {emergencyContacts.map((contact, index) => (
            <EmergencyContactCard
              key={contact.id || index}
              contact={contact}
              onPress={() => handleEditEmergencyContact(contact)}
              onDelete={() => handleDeleteEmergencyContact(contact)}
            />
          ))}
          <ModalEditEmergencyContact
            showModal={showModalEditEmergencyContact}
            setShowModal={setShowModalEditEmergencyContact}
            contactToEdit={contactData}
            emergencyContacts={emergencyContacts}
            setEmergencyContacts={setEmergencyContacts}
          />
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

      {emergencyContacts && emergencyContacts.length > 0 && (
        <Pressable
          onPress={handleAddEmergencyContact}
          className="mt-4 flex-row items-center justify-center rounded-xl bg-primary px-6 py-4 shadow-sm active:bg-[#2A5F85]">
          <PlusCircleIcon color="#ffffff" size={20} />
          <Text className="ml-2 font-semibold text-white">Agregar nuevo contacto</Text>
        </Pressable>
      )}

      <ModalAddEmergencyContact
        showModal={showModalEmergencyContact}
        setShowModal={setShowModalEmergencyContact}
        emergencyContacts={emergencyContacts}
        setEmergencyContacts={setEmergencyContacts}
      />
    </View>
  );
};

export default EmergencyContactsCard;
