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
      <View style={styles.centered}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Verificación</Text>
          <Text style={styles.subtitle}>Ingresa el código enviado a tu dispositivo</Text>

          {errors.code && <Text style={styles.errorText}>{errors.code.message?.toString()}</Text>}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
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

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.verifyButton]}
              onPress={handleSubmit(verifyCode)}>
              {loading ? (
                <ActivityIndicator color="#65a5cb" />
              ) : (
                <Text style={[styles.buttonText, styles.verifyButtonText]}>Verificar</Text>
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
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
  title: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4189b6',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#7f7f83',
  },
  errorText: {
    marginBottom: 4,
    marginTop: 4,
    textAlign: 'center',
    fontSize: 14,
    color: '#ef4444',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    height: 56,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#101010',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  verifyButton: {
    backgroundColor: '#32729F',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#7f7f83',
  },
  verifyButtonText: {
    color: '#fff',
  },
});
