import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAvoidingWrapper from '../../components/layouts/KeyboardAvoidingWrapper';
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
    <KeyboardAvoidingWrapper>
      <View className="flex-1 justify-between p-6">
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
    </KeyboardAvoidingWrapper>
  );
};

export default ModalEditEmail;
