import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAvoidingWrapper from '../../components/layouts/KeyboardAvoidingWrapper';
import { useUser } from '../../hooks/useUser';

const ModalEditPhone = () => {
  const { user } = useUser();

  const { control } = useForm({
    defaultValues: {
      phone: user?.phone || '',
    },
  });

  const handleSubmit = () => {
    console.log('Se presionó el botón');
  };

  return (
    <KeyboardAvoidingWrapper>
      <View className="flex-1 justify-between p-6">
        <View>
          <Text className="text-base font-bold text-primary">Tu teléfono</Text>
          <TextInputController
            name="phone"
            control={control}
            placeholder="Ingrese su número de teléfono"
            keyboardType="number-pad"
            autoFocus
          />
        </View>

        <SubmitButton onPress={handleSubmit} text="Guardar" />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default ModalEditPhone;
