import { useRouter } from 'expo-router';
import { useState } from 'react';
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

import { API_URL } from '../../config/env';
import useApi from '../../hooks/useApi';

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  dni: number;
};

const VerificationModal = ({ visible, onClose, dni }: VerificationModalProps) => {
  const [code, setCode] = useState('');
  const router = useRouter();
  const { error, loading, fetchData } = useApi<any>();

  const verifyCode = async (code: number, dni: number) => {
    const requestData = {
      identifier: dni,
      code,
    };

    fetchData(`${API_URL}/api/auth/verify-code`, '', 'POST', requestData)
      .then((response) => {
        console.log(response);

        // Verifica si la respuesta confirma que el código es válido
        if (response && !response.error) {
          onClose(); // Cierra el modal
          router.push({
            pathname: 'signup', // Ruta a la que redirigir
            params: { dni },
          });
        }
      })
      .catch((error) => {
        console.error('Error al verificar el código:', error);
      });
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

          {error && <Text className="mb-1 text-center text-sm text-red-500">{error}</Text>}

          <TextInput
            className="mb-5 rounded-lg border-2 border-[#ddd] p-3 text-base focus:border-primary focus:outline-none"
            value={code}
            onChangeText={setCode}
            placeholder="Código de verificación"
            keyboardType="number-pad"
            maxLength={6}
          />

          <View className="flex-row justify-between">
            <TouchableOpacity className="rounded-lg bg-[#f2f2f2] px-5 py-3" onPress={onClose}>
              <Text className="font-semibold text-[#7f7f83]">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-lg bg-[#4189b6] px-5 py-3"
              onPress={() => verifyCode(parseInt(code, 10), dni)}>
              {loading ? (
                <ActivityIndicator color="#4C4DDC" />
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
