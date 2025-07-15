import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import * as z from 'zod';

import SubmitButton from '~/components/buttons/SubmitButton';
import TextInputController from '~/components/inputs/TextInputController';
import KeyboardAwareFormLayout from '~/components/layouts/KeyboardAwareFormLayout';
import ModalContainer from '~/components/modal/ModalContainer';

// Usamos Zod para validar los datos del formulario
const emergencyContactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio.'), // Nombre obligatorio
  phoneNumber: z
    .string()
    .min(1, 'El teléfono es obligatorio.')
    .regex(/^9\d{8}$/, 'El teléfono debe tener 9 dígitos y empezar con 9.'), // Validación para que el teléfono empiece con 9 y tenga 9 dígitos
  relationship: z.string().optional(), // La relación es opcional
});

type ModalAddEmergencyContactProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

export default function ModalAddEmergencyContact({
  showModal,
  setShowModal,
}: ModalAddEmergencyContactProps) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emergencyContactSchema),
  });

  // Función de manejar la acción de guardar
  const handleSave = (data: any) => {
    console.log('Nuevo contacto de emergencia guardado:', data);
    // Aquí puedes hacer una llamada para guardar el contacto, por ejemplo, enviarlo a un backend o al contexto global.
    router.back(); // Cerrar el modal después de guardar
  };

  return (
    <ModalContainer
      title="Agregar contacto de emergencia"
      showModal={showModal}
      setShowModal={setShowModal}>
      <KeyboardAwareFormLayout>
        <View>
          <View className="rounded-lg border border-gray-300 bg-white p-6">
            <Text className="mb-4 text-center text-xl font-bold">
              Agregar contacto de emergencia
            </Text>

            <View className="mb-4">
              <Text className="mb-1 font-medium">Nombre</Text>
              <TextInputController control={control} name="name" placeholder="Ej: Juan Pérez" />

              {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
            </View>

            <View className="mb-4">
              <Text className="mb-1 font-medium">Teléfono</Text>
              <TextInputController
                control={control}
                name="phoneNumber"
                placeholder="Ej: 912345678"
                keyboardType="phone-pad"
                maxLength={9}
              />

              {errors.phoneNumber && (
                <Text className="text-red-500">{errors.phoneNumber.message}</Text>
              )}
            </View>

            <View className="mb-6">
              <Text className="mb-1 font-medium">Relación</Text>
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
