import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { ReminderFrequencySchema } from '../../schemas/SettingsSchema';
import { z } from 'zod';
import ValidationError from '../../components/card/ValidationError';
import ModalContainer from '~/components/modal/ModalContainer';

const formSchema = z.object({
  reminderFrequencyMinutes: ReminderFrequencySchema,
});

type FormValues = {
  reminderFrequencyMinutes: string;
};

type ModalEditFrequencyProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

const ModalEditFrequency = ({ showModal, setShowModal }: ModalEditFrequencyProps) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const prevValue = params.reminderFrequencyMinutes || 10;
  const tolerance = params.toleranceWindowMinutes || 30;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      reminderFrequencyMinutes: String(prevValue),
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    // Aquí deberías guardar el valor
    router.back();
  };

  return (
    <ModalContainer
      showModal={showModal}
      setShowModal={setShowModal}
      title="Editar frecuencia de recordatorio">
      <KeyboardAwareFormLayout>
        <View className="flex-1 justify-between px-6 pb-20 pt-6">
          <View>
            <Text className="text-base font-bold text-primary">Frecuencia de recordatorio</Text>
            <Text className="mb-1 text-xs text-gray-500">Valor actual: {prevValue} minutos</Text>
            <TextInputController
              name="reminderFrequencyMinutes"
              control={control}
              placeholder={`Ingrese minutos (<${tolerance})`}
              keyboardType="number-pad"
              maxLength={2}
              autoFocus
            />
            <ValidationError message={errors.reminderFrequencyMinutes?.message} />
          </View>
          <SubmitButton onPress={handleSubmit(onSubmit)} text="Guardar" />
        </View>
      </KeyboardAwareFormLayout>
    </ModalContainer>
  );
};

export default ModalEditFrequency;
