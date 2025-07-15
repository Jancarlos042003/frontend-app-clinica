import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { API_URL } from '~/config/env';
import useApi from '~/hooks/useApi';
import { useUser } from '~/hooks/useUser';
import {
  formatAddress,
  getCurrentLocation,
  getReverseGeocode,
} from '~/services/permissionsService';

type MessageSosProps = {
  showSOSModal: boolean;
  setShowSOSModal: (show: boolean) => void;
};

const ModalMessageSos = ({ showSOSModal = false, setShowSOSModal }: MessageSosProps) => {
  const [sosMessage, setSOSMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { fetchData } = useApi();
  const { user } = useUser();

  const handleSendSOS = async () => {
    if (isProcessing) return; // Prevenir múltiples envíos

    setIsProcessing(true);

    try {
      // Obtener ubicación con manejo de errores
      const { latitude, longitude } = await getCurrentLocation();
      const reverseGeocode = await getReverseGeocode(latitude, longitude);
      const address = formatAddress(reverseGeocode);

      const dataLocation = {
        patientId: user?.patientId,
        latitude,
        longitude,
        address,
        patientMessage: sosMessage.trim(),
      };

      console.log('Enviando SOS con datos:', dataLocation);

      const response = await fetchData(`${API_URL}/api/sos`, 'POST', dataLocation);

      if (response) {
        // Mostrar confirmación
        Alert.alert(
          'SOS Activado',
          `Se ha enviado la alerta a tus contactos de emergencia.${sosMessage.trim() ? `\n\nMensaje: "${sosMessage.trim()}"` : ''}`,
          [
            {
              text: 'Entendido',
              onPress: () => {
                // Cerrar el modal y limpiar el mensaje
                setShowSOSModal(false);
                setSOSMessage('');
              },
            },
          ]
        );
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje SOS:', error);

      let errorMessage = 'No se pudo enviar el mensaje SOS. Inténtalo de nuevo.';

      // Manejar diferentes tipos de errores
      if (error instanceof Error) {
        if (error.message?.includes('Location')) {
          errorMessage = 'Error al obtener tu ubicación. Verifica que el GPS esté activado.';
        } else if (error.message?.includes('Network')) {
          errorMessage = 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.';
        }
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSOS = () => {
    setShowSOSModal(false);
    setSOSMessage('');
  };

  return (
    <Modal visible={showSOSModal} transparent animationType="fade" onRequestClose={handleCancelSOS}>
      <View className="flex-1 items-center justify-center bg-black/50 px-5">
        <View className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg shadow-black/25">
          <Text className="mb-2.5 text-center text-2xl font-bold text-red-700">
            🚨 Emergencia Activada
          </Text>
          <Text className="mb-5 text-center text-base leading-6 text-gray-600">
            Describe brevemente lo que está sucediendo (opcional)
          </Text>

          <TextInput
            className="mb-2.5 min-h-24 rounded-xl border border-gray-300 bg-gray-50 p-4 text-base"
            style={{ textAlignVertical: 'top' }}
            placeholder="Ej: Me encuentro en situación de riesgo, necesito ayuda urgente..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={sosMessage}
            onChangeText={setSOSMessage}
            maxLength={250}
          />

          <Text className="mb-5 text-right text-xs text-gray-500">
            {sosMessage.length}/250 caracteres
          </Text>

          <View className="flex-row justify-between gap-4">
            <TouchableOpacity
              className={`flex-1 items-center rounded-xl border border-gray-300 py-4 ${
                isProcessing ? 'bg-gray-200' : 'bg-gray-100'
              }`}
              onPress={handleCancelSOS}
              disabled={isProcessing}>
              <Text
                className={`text-base font-semibold ${
                  isProcessing ? 'text-gray-400' : 'text-gray-600'
                }`}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 items-center rounded-xl py-4 ${
                isProcessing ? 'bg-red-400' : 'bg-red-700'
              }`}
              onPress={handleSendSOS}
              disabled={isProcessing}>
              {isProcessing ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="ml-2 text-base font-semibold text-white">Enviando...</Text>
                </View>
              ) : (
                <Text className="text-base font-semibold text-white">Enviar SOS</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMessageSos;
