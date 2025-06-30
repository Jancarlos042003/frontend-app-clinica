import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export default function ModalEditMedicationSettings() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [toleranceWindowMinutes, setToleranceWindowMinutes] = useState(
    clamp(Number(params.toleranceWindowMinutes) || 30, 10, 60)
  );
  const [reminderFrequencyMinutes, setReminderFrequencyMinutes] = useState(
    clamp(Number(params.reminderFrequencyMinutes) || 10, 1, toleranceWindowMinutes - 1)
  );
  const [maxReminderAttempts, setMaxReminderAttempts] = useState(
    clamp(Number(params.maxReminderAttempts) || 3, 1, 5)
  );

  const handleSave = () => {
    if (
      reminderFrequencyMinutes >= toleranceWindowMinutes ||
      toleranceWindowMinutes < 10 ||
      toleranceWindowMinutes > 60 ||
      maxReminderAttempts < 1 ||
      maxReminderAttempts > 5
    ) {
      Alert.alert(
        'Valores inválidos',
        'Verifica que la frecuencia sea menor a la ventana de tolerancia y los valores estén en el rango permitido.'
      );
      return;
    }
    // Aquí deberías guardar los datos en el backend o contexto
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-white px-6">
      <View className="rounded-lg border border-gray-300 bg-white p-6">
        <Text className="mb-4 text-center text-xl font-bold">Editar recordatorios</Text>
        <View className="mb-4">
          <Text className="mb-1 font-medium">Ventana de tolerancia (minutos)</Text>
          <TextInput
            keyboardType="numeric"
            value={String(toleranceWindowMinutes)}
            onChangeText={(v) => setToleranceWindowMinutes(clamp(Number(v), 10, 60))}
            className="rounded border px-3 py-2"
            maxLength={2}
          />
          <Text className="text-xs text-gray-500">Entre 10 y 60 minutos</Text>
        </View>
        <View className="mb-4">
          <Text className="mb-1 font-medium">Frecuencia de recordatorio (minutos)</Text>
          <TextInput
            keyboardType="numeric"
            value={String(reminderFrequencyMinutes)}
            onChangeText={(v) =>
              setReminderFrequencyMinutes(clamp(Number(v), 1, toleranceWindowMinutes - 1))
            }
            className="rounded border px-3 py-2"
            maxLength={2}
          />
          <Text className="text-xs text-gray-500">Debe ser menor a la ventana de tolerancia</Text>
        </View>
        <View className="mb-6">
          <Text className="mb-1 font-medium">Máximo de intentos</Text>
          <TextInput
            keyboardType="numeric"
            value={String(maxReminderAttempts)}
            onChangeText={(v) => setMaxReminderAttempts(clamp(Number(v), 1, 5))}
            className="rounded border px-3 py-2"
            maxLength={1}
          />
          <Text className="text-xs text-gray-500">Máximo 5 intentos</Text>
        </View>
        <View className="flex-row justify-between">
          <Pressable className="rounded bg-gray-200 px-4 py-2" onPress={() => router.back()}>
            <Text className="font-medium text-gray-700">Cancelar</Text>
          </Pressable>
          <Pressable className="rounded bg-[#32729F] px-4 py-2" onPress={handleSave}>
            <Text className="font-medium text-white">Guardar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
