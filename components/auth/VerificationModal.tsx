import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import useApi from '../../hooks/useApi';
import { codeSchema, CodeSchema } from '../../schemas/CodeSchema';

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  dni: number;
};

const VerificationModal = ({ visible, onClose, dni }: VerificationModalProps) => {
  const router = useRouter();
  const { error, loading, fetchData, clearError } = useApi<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeSchema>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(codeSchema),
  });

  const verifyCode = async (data: any) => {
    const requestData = {
      identifier: dni,
      code: data.code,
    };

    try {
      const response = await fetchData('/api/auth/verify-code', 'POST', requestData);

      if (response && !response.error) {
        onClose(); // Cierra el modal
        router.push({
          pathname: 'signup', // Ruta a la que redirigir
          params: { dni },
        });
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View
        className="flex-1 items-center justify-center p-8"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
        <View style={styles.modalContent}>
          <Text className="mb-2 text-center text-xl font-bold text-[#4189b6]">Verificación</Text>
          <Text className="mb-5 text-center text-sm text-[#7f7f83]">
            Ingresa el código enviado a tu dispositivo
          </Text>

          {errors.code && (
            <Text className="mt-1 text-center text-sm text-red-500">
              {errors.code.message?.toString()}
            </Text>
          )}

          {error && <Text className="mb-1 text-center text-sm text-red-500">{error}</Text>}

          <View className="mb-5">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="h-14 w-full rounded-lg border border-[#D4D4D8] bg-white text-center text-2xl font-bold text-[#101010] focus:border-primary"
                  keyboardType="number-pad"
                  maxLength={6}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(text) => {
                    // Solo permitir números
                    onChange(text.replace(/[^0-9]/g, ''));
                    clearError();
                  }}
                  selectTextOnFocus
                  autoFocus // Enfocar automáticamente el campo de entrada
                />
              )}
              name="code"
            />
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity className="rounded-lg bg-[#f2f2f2] px-5 py-3" onPress={onClose}>
              <Text className="font-semibold text-[#7f7f83]">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-lg bg-primary px-5 py-3"
              onPress={handleSubmit(verifyCode)}>
              {loading ? (
                <ActivityIndicator color="#65a5cb" />
              ) : (
                <Text className="font-semibold text-white">Verificar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VerificationModal;

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
