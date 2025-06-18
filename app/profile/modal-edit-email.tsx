import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { useUser } from '../../hooks/useUser';

const ModalEditEmail = () => {
  const { user } = useUser();

  const { control } = useForm({
    defaultValues: {
      phone: user?.email || '',
    },
  });

  const handleSubmit = () => {
    console.log('Se presionó el botón');
  };

  return (
    <KeyboardAwareFormLayout>
      <View className="flex-1 justify-between px-6 pb-20 pt-6">
        <View>
          <Text className="text-base font-bold text-primary">Tu correo electrónico</Text>
          <TextInputController
            name="email"
            control={control}
            placeholder="Ingrese su correo electrónico"
            keyboardType="email-address"
            autoFocus
          />
        </View>

        <SubmitButton onPress={handleSubmit} text="Guardar" />
      </View>
    </KeyboardAwareFormLayout>
  );
};

export default ModalEditEmail;
