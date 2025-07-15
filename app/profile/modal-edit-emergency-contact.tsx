import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';

import SubmitButton from '~/components/buttons/SubmitButton';
import LabelWithRequired from '~/components/inputs/LabelWithRequired';
import TextInputController from '~/components/inputs/TextInputController';
import KeyboardAwareFormLayout from '~/components/layouts/KeyboardAwareFormLayout';
import ModalContainer from '~/components/modal/ModalContainer';
import { emergencyContactSchema, EmergencyContact } from '~/types/emergency-contact'; // Importamos el esquema de validación
import { EmergencyContact as SettingsEmergencyContact } from '~/types/settings';

type ModalEditEmergencyContactProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  contactToEdit?: SettingsEmergencyContact | null;
};

export default function ModalEditEmergencyContact({
  showModal,
  setShowModal,
  contactToEdit,
}: ModalEditEmergencyContactProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmergencyContact>({
    resolver: zodResolver(emergencyContactSchema),
  });

  // Efecto para cargar los datos del contacto cuando se abre el modal
  useEffect(() => {
    if (showModal && contactToEdit) {
      reset({
        name: contactToEdit.name,
        phoneNumber: contactToEdit.phoneNumber,
        relationship: contactToEdit.relationship,
      });
    }
  }, [showModal, contactToEdit, reset]);

  // Función de manejar la acción de guardar
  const handleSave = (data: EmergencyContact) => {
    console.log('Contacto de emergencia editado:', data);
    console.log('ID del contacto:', contactToEdit?.id);
    // Aquí puedes hacer una llamada para actualizar el contacto, por ejemplo, enviarlo a un backend o al contexto global.
    // Incluye el ID del contacto para la actualización: { ...data, id: contactToEdit?.id }
    setShowModal(false); // Cerrar el modal después de guardar
  };

  return (
    <ModalContainer
      title="Editar contacto de emergencia"
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
          </View>
          <SubmitButton onPress={handleSubmit(handleSave)} text="Guardar" />
        </View>
      </KeyboardAwareFormLayout>
    </ModalContainer>
  );
}
