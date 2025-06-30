import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ModalEditTolerance = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const prevValue = params.toleranceWindowMinutes || 30;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      toleranceWindowMinutes: String(prevValue),
    },
  });

  const onSubmit = (data: { toleranceWindowMinutes: string }) => {
    // Aquí deberías guardar el valor
    router.back();
  };

  return (
    <KeyboardAwareFormLayout>
      <View className="flex-1 justify-between px-6 pb-20 pt-6">
        <View>
          <Text className="text-base font-bold text-primary">Ventana de tolerancia</Text>
          <Text className="mb-1 text-xs text-gray-500">Valor anterior: {prevValue} minutos</Text>
          <TextInputController
            name="toleranceWindowMinutes"
            control={control}
            placeholder="Ingrese minutos (10-60)"
            keyboardType="number-pad"
            maxLength={2}
            autoFocus
          />
        </View>
        <SubmitButton onPress={handleSubmit(onSubmit)} text="Guardar" />
      </View>
    </KeyboardAwareFormLayout>
  );
};

export default ModalEditTolerance;
