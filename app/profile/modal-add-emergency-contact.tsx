import { useRouter } from 'expo-router';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import ModalContainer from '~/components/modal/ModalContainer';
import { useForm, Controller } from 'react-hook-form'; // Importa Controller
import * as z from 'zod';  // Importando Zod para validación
import { zodResolver } from '@hookform/resolvers/zod';

// Usamos Zod para validar los datos del formulario
const emergencyContactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),  // Nombre obligatorio
  phoneNumber: z
    .string()
    .min(1, "El teléfono es obligatorio.")
    .regex(/^9\d{8}$/, "El teléfono debe tener 9 dígitos y empezar con 9."), // Validación para que el teléfono empiece con 9 y tenga 9 dígitos
  relationship: z.string().optional(),  // La relación es opcional
});

export default function ModalAddEmergencyContact() {
  const router = useRouter();

  // Usando React Hook Form con Zod
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(emergencyContactSchema),
  });

  // Función de manejar la acción de guardar
  const handleSave = (data: any) => {
    console.log("Nuevo contacto de emergencia guardado:", data);
    // Aquí puedes hacer una llamada para guardar el contacto, por ejemplo, enviarlo a un backend o al contexto global.
    router.back();  // Cerrar el modal después de guardar
  };

  const handleCancel = () => {
    router.back();  // Solo cierra el modal
  };

  return (
    <ModalContainer visible={true} setVisible={() => {}}>
      <View className="rounded-lg border border-gray-300 bg-white p-6">
        <Text className="mb-4 text-center text-xl font-bold">Agregar contacto de emergencia</Text>

        {/* Campo para el nombre */}
        <View className="mb-4">
          <Text className="mb-1 font-medium">Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Nombre completo"
                className="rounded border px-3 py-2"
              />
            )}
          />
          {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
        </View>

        {/* Campo para el teléfono */}
        <View className="mb-4">
          <Text className="mb-1 font-medium">Teléfono</Text>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Número de teléfono"
                keyboardType="phone-pad"
                maxLength={9}  // Limitar a 9 dígitos
                className="rounded border px-3 py-2"
              />
            )}
          />
          {errors.phoneNumber && <Text className="text-red-500">{errors.phoneNumber.message}</Text>}
        </View>

        {/* Campo para la relación */}
        <View className="mb-6">
          <Text className="mb-1 font-medium">Relación</Text>
          <Controller
            control={control}
            name="relationship"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Ej: Madre, Padre, Amigo..."
                className="rounded border px-3 py-2"
              />
            )}
          />
          {errors.relationship && <Text className="text-red-500">{errors.relationship.message}</Text>}
        </View>

        {/* Botones para guardar o cancelar */}
        <View className="flex-row justify-between">
          <Pressable
            onPress={handleCancel}
            className="bg-gray-300 p-3 rounded-lg flex-1 mr-2"
          >
            <Text className="text-center text-lg">Cancelar</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit(handleSave)}  // Usamos handleSubmit para validar y ejecutar handleSave
            className="bg-blue-500 p-3 rounded-lg flex-1 ml-2"
          >
            <Text className="text-center text-lg text-white">Guardar</Text>
          </Pressable>
        </View>
      </View>
    </ModalContainer>
  );
}
