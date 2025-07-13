import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import * as Location from 'expo-location';

const pacienteId = '123'; // Cambia esto por el id real del paciente

const Sos = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSos = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setMensaje('Permiso de ubicación denegado');
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 10000);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const data = {
      id: pacienteId,
      latitud: location.coords.latitude,
      longitud: location.coords.longitude,
      mensaje: '¡Emergencia SOS!',
    };
    setMensaje(JSON.stringify(data, null, 2));
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 10000);
    // Aquí puedes enviar el JSON a tu backend si lo necesitas
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Enviar SOS" onPress={handleSos} />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>SOS enviado</Text>
            <Text selectable>{mensaje}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sos;