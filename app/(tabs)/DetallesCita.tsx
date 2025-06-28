import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Modal, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';  

type RootStackParamList = {
  Home: undefined;
  DetallesCita: { cita: { especialidad: string; doctor: string; fecha: string; hora: string; lugar: string } };
};

type Props = StackScreenProps<RootStackParamList, 'DetallesCita'>;

const DetallesCita = ({ route, navigation }: Props) => {
  const { cita } = route.params;  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>(''); // Para diferenciar las notificaciones

  const handleNotification = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleSendAlert = () => {
    Alert.alert('¡ALERTA ENVIADA!', 'Su ubicación ha sido enviada a la clínica, por favor mantenga la calma.');
    setShowModal(false);
  };

  const renderModalContent = () => {
    let title = '';
    let message = '';
    let buttonColor = '';
    let icon = null;

    switch (modalType) {
      case 'noAsistire':
        title = 'No Asistiré';
        message = 'Acaba de cancelar su cita, esperamos verlo pronto. ¡Recuerde cuidar de su salud!';
        buttonColor = 'red';
        icon = require('../../assets/images/NotificaciónA.png'); // Asegúrate de tener esta imagen
        break;
      case 'asistire':
        title = 'Asistiré';
        message = 'Acaba de confirmar su cita exitosamente. ¡Lo(a) esperamos!';
        buttonColor = 'green';
        icon = require('../../assets/images/NotificaciónNA.png'); // Asegúrate de tener esta imagen
        break;
      case 'reprogramar':
        title = 'Reprogramar';
        message = 'Acaba de reprogramar su cita. La fecha de su próxima cita será en una semana.';
        buttonColor = 'purple';
        icon = require('../../assets/images/NotificaciónR.png'); // Asegúrate de tener esta imagen
        break;
      default:
        return null;
    }

    return (
      <View style={styles.modalContent}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{message}</Text>
        <Button title="Aceptar" onPress={handleSendAlert} color={buttonColor} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Cita</Text>
      <Text>Especialidad: {cita.especialidad}</Text>
      <Text>Médico: {cita.doctor}</Text>
      <Text>Fecha: {cita.fecha}</Text>
      <Text>Hora: {cita.hora}</Text>
      <Text>Lugar: {cita.lugar}</Text>

      <View style={styles.buttonsContainer}>
        <Button title="NO ASISTIRÉ" color="red" onPress={() => handleNotification('noAsistire')} />
        <Button title="ASISTIRÉ" color="green" onPress={() => handleNotification('asistire')} />
        <Button title="REPROGRAMAR" color="purple" onPress={() => handleNotification('reprogramar')} />
      </View>

      {/* Notificación */}
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          {renderModalContent()}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C5F0FF33',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    marginTop: 20,
    justifyContent: 'space-evenly',
    height: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});

export default DetallesCita;
