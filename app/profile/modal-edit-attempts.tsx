import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ModalEditAttempts = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const prevValue = params.maxReminderAttempts || 3;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      maxReminderAttempts: String(prevValue),
    },
  });

  const onSubmit = (data: { maxReminderAttempts: string }) => {
    // Aquí deberías guardar el valor
    router.back();
  };

  return (
    <KeyboardAwareFormLayout>
      <View className="flex-1 justify-between px-6 pb-20 pt-6">
        <View>
          <Text className="text-base font-bold text-primary">Máximo de intentos</Text>
          <Text className="mb-1 text-xs text-gray-500">Valor anterior: {prevValue}</Text>
          <TextInputController
            name="maxReminderAttempts"
            control={control}
            placeholder="Ingrese un número (1-5)"
            keyboardType="number-pad"
            maxLength={1}
            autoFocus
          />
        </View>
        <SubmitButton onPress={handleSubmit(onSubmit)} text="Guardar" />
      </View>
    </KeyboardAwareFormLayout>
  );
};

export default ModalEditAttempts;
