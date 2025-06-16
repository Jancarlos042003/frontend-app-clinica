import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

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
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Tu teléfono</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#32729F',
    marginBottom: 8,
  },
});

export default ModalEditPhone;
