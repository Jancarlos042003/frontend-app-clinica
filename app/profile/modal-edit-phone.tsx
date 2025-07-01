import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import SubmitButton from '../../components/buttons/SubmitButton';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { useUser } from '../../hooks/useUser';
import ModalContainer from '~/components/modal/ModalContainer';

type ModalEditPhoneProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

const ModalEditPhone = ({ showModal, setShowModal }: ModalEditPhoneProps) => {
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
    <ModalContainer showModal={showModal} setShowModal={setShowModal} title="Editar teléfono">
      <KeyboardAwareFormLayout>
        <View className="flex-1 justify-between px-6 pb-20 pt-6">
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
      </KeyboardAwareFormLayout>
    </ModalContainer>
  );
};

export default ModalEditPhone;
