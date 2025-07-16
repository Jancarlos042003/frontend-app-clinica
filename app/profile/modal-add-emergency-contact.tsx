import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Alert } from 'react-native';

import SubmitButton from '~/components/buttons/SubmitButton';
import LabelWithRequired from '~/components/inputs/LabelWithRequired';
import TextInputController from '~/components/inputs/TextInputController';
import KeyboardAwareFormLayout from '~/components/layouts/KeyboardAwareFormLayout';
import ModalContainer from '~/components/modal/ModalContainer';
import useApi from '~/hooks/useApi';
import { useUser } from '~/hooks/useUser';
import { emergencyContactSchema, EmergencyContact } from '~/types/emergency-contact'; // Importamos el esquema de validación
import { EmergencyContact as SettingsEmergencyContact } from '~/types/settings';

type ModalAddEmergencyContactProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  emergencyContacts: SettingsEmergencyContact[];
  setEmergencyContacts: (contacts: SettingsEmergencyContact[]) => void;
};

export default function ModalAddEmergencyContact({
  showModal,
  setShowModal,
  emergencyContacts,
  setEmergencyContacts,
}: ModalAddEmergencyContactProps) {
  const { fetchData, data, error } = useApi();
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmergencyContact>({
    resolver: zodResolver(emergencyContactSchema),
  });

  // Efecto para manejar la respuesta exitosa de la API
  useEffect(() => {
    if (data && isSaving) {
      console.log('Contacto guardado exitosamente:', data);

      // Agregar el nuevo contacto a la lista
      const newContact = data as SettingsEmergencyContact;
      setEmergencyContacts([...emergencyContacts, newContact]);

      console.log('Nueva lista de contactos de emergencia:', [...emergencyContacts, newContact]);

      // Limpiar el formulario y cerrar el modal
      reset();
      setIsSaving(false);
      Alert.alert('Éxito', 'El contacto de emergencia ha sido agregado correctamente', [
        { text: 'Aceptar', onPress: () => setShowModal(true) }, // Mantener el modal abierto
      ]);
    }
  }, [data, isSaving, emergencyContacts, setEmergencyContacts, reset, setShowModal]);

  // Efecto para manejar errores de la API
  useEffect(() => {
    if (error && isSaving) {
      console.error('Error al guardar contacto:', error);
      setIsSaving(false);
      Alert.alert('Error', 'Ocurrió un error al guardar el contacto. Inténtalo de nuevo.');
    }
  }, [error, isSaving]);

  // Función de manejar la acción de guardar
  const handleSave = async (contactData: EmergencyContact) => {
    try {
      console.log('Guardando nuevo contacto de emergencia:', contactData);
      setIsSaving(true);

      // Llamar a la API para crear el contacto
      await fetchData(
        `/api/users/${user?.patientId}/settings/emergency-contacts`,
        'POST',
        contactData
      );
    } catch (err) {
      console.error('Error en la llamada a la API:', err);
      setIsSaving(false);
      Alert.alert('Error', 'Ocurrió un error al guardar el contacto. Inténtalo de nuevo.');
    }
  };

  return (
    <ModalContainer
      title="Agregar contacto de emergencia"
      showModal={showModal}
      setShowModal={setShowModal}>
      <KeyboardAwareFormLayout>
        <View className="flex-1 justify-between px-6 pb-20 pt-6">
          <View>
            <View className="mb-4">
              <LabelWithRequired text="Nombre" required />
              <TextInputController control={control} name="name" placeholder="Ej: Juan Pérez" />

              {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
            </View>

            <View className="mb-4">
              <LabelWithRequired text="Teléfono" required />
              <TextInputController
                control={control}
                name="phoneNumber"
                placeholder="Ej: 912345678"
                keyboardType="numeric"
                maxLength={9}
              />

              {errors.phoneNumber && (
                <Text className="text-red-500">{errors.phoneNumber.message}</Text>
              )}
            </View>

            <View className="mb-6">
              <LabelWithRequired text="Relación" />
              <TextInputController
                control={control}
                name="relationship"
                placeholder="Ej: Madre, Padre, Amigo..."
              />

              {errors.relationship && (
                <Text className="text-red-500">{errors.relationship.message}</Text>
              )}
            </View>

            {error && <Text className="text-red-500">{error}</Text>}
          </View>
          <SubmitButton
            onPress={handleSubmit(handleSave)}
            text={isSaving ? 'Guardando...' : 'Guardar'}
            loading={isSaving}
          />
        </View>
      </KeyboardAwareFormLayout>
    </ModalContainer>
  );
}
