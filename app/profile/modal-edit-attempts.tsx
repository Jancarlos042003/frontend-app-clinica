import { Text, View } from 'react-native';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import ValidationError from '../../components/card/ValidationError';
import ModalContainer from '~/components/modal/ModalContainer';
import { AttemptsSchema, AttemptsType } from '~/schemas/SettingsSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSettings } from '~/types/settings';

type ModalEditAttemptsProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  currentSettings: UserSettings | null;
  onSave: (data: number) => void;
};

const ModalEditAttempts = ({
  showModal,
  setShowModal,
  currentSettings,
  onSave,
}: ModalEditAttemptsProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AttemptsType>({
    resolver: zodResolver(AttemptsSchema),
    defaultValues: {
      maxAttempts: currentSettings?.medicationSettings.maxReminderAttempts.toString() || '3', // Valor por defecto
    },
  });

  const onSubmit = (data: AttemptsType) => {
    onSave(Number(data.maxAttempts));
    setShowModal(false);
  };

  return (
    <ModalContainer
      showModal={showModal}
      setShowModal={setShowModal}
      title="Editar máximo de intentos">
      <KeyboardAwareFormLayout>
        <View className="flex-1 justify-between px-6 pb-20 pt-6">
          <View>
            <Text className="text-base font-bold text-primary">Máximo de intentos</Text>
            <Text className="mb-1 text-xs text-gray-500">
              Valor actual: {currentSettings?.medicationSettings.maxReminderAttempts || 3}
            </Text>
            <TextInputController
              name="maxAttempts"
              control={control}
              placeholder="Ingrese un número (1-5)"
              keyboardType="number-pad"
              maxLength={1}
              autoFocus
            />
            {errors.maxAttempts && <ValidationError message={errors.maxAttempts.message} />}
          </View>
          <SubmitButton onPress={handleSubmit(onSubmit)} text="Guardar" />
        </View>
      </KeyboardAwareFormLayout>
    </ModalContainer>
  );
};

export default ModalEditAttempts;
