import { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

type MessageSosProps = {
  showSOSModal: boolean;
  setShowSOSModal: (show: boolean) => void;
};

const ModalMessageSos = ({ showSOSModal = false, setShowSOSModal }: MessageSosProps) => {
  const [sosMessage, setSOSMessage] = useState('');

  const handleSendSOS = () => {
    // Aquí puedes agregar la lógica para activar el SOS con el mensaje
    console.log('SOS Activado con mensaje:', sosMessage);

    // Cerrar el modal y limpiar el mensaje
    setShowSOSModal(false);
    setSOSMessage('');

    // Mostrar confirmación
    Alert.alert(
      'SOS Activado',
      `Se ha enviado la alerta a tus contactos de emergencia.${sosMessage ? `\n\nMensaje: "${sosMessage}"` : ''}`
    );
  };

  const handleCancelSOS = () => {
    setShowSOSModal(false);
    setSOSMessage('');
  };

  return (
    <Modal
      visible={showSOSModal}
      transparent
      animationType="slide"
      onRequestClose={handleCancelSOS}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🚨 Emergencia Activada</Text>
          <Text style={styles.modalSubtitle}>
            Describe brevemente lo que está sucediendo (opcional)
          </Text>

          <TextInput
            style={styles.messageInput}
            placeholder="Ej: Me encuentro en situación de riesgo, necesito ayuda urgente..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={sosMessage}
            onChangeText={setSOSMessage}
            maxLength={250}
          />

          <Text style={styles.characterCount}>{sosMessage.length}/250 caracteres</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCancelSOS}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.sendButton]}
              onPress={handleSendSOS}>
              <Text style={styles.sendButtonText}>Enviar SOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMessageSos;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#d32f2f',
  },
  modalSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 22,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButton: {
    backgroundColor: '#d32f2f',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
