
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useUser } from '../../hooks/useUser'; 

const Sos = () => {  
  const { user } = useUser();  
  console.log('Datos del usuario:', user); 
  const [modalVisible, setModalVisible] = useState(false);
  const [patientMessage, setPatientMessage] = useState('Necesito ayuda médica urgente');
  const [showDetails, setShowDetails] = useState(false);
  const [lastData, setLastData] = useState<any>(null);
  const [modalMsg, setModalMsg] = useState<string | null>(null);

  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (modalVisible) {
      timeoutId = setTimeout(() => {
        setModalVisible(false); 
        setModalMsg(null);
      }, 10000); 
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [modalVisible]);

  const handleSos = async () => {
    console.log('SOS presionado');
    
    
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log('Permiso ubicación:', status);
    
    if (status !== 'granted') {
      setModalMsg('Debes dar permiso de ubicación en tu perfil antes de usar el SOS.');
      setLastData(null);
      setShowDetails(false);
      setModalVisible(true);
      return;
    }
    
    try {
      
      let location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación:', location);
      
      let address = ''; 
      try {
        const geo = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (geo && geo[0]) {
          
          address = `${geo[0].street || ''} ${geo[0].name || ''}, ${geo[0].district || ''}, ${geo[0].city || ''}`;
        }
      } catch {
        address = 'Dirección no disponible';
      }

      
      const data = {
        patientId: user?.patientId || 'sin-id', 
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address || 'Dirección no disponible',  
        patientMessage,  
      };

      console.log('JSON SOS:', JSON.stringify(data, null, 2)); 


      setLastData(data);
      setModalMsg(null);
      setShowDetails(false);
      setModalVisible(true); 
    } catch (error) {
      console.log('Error obteniendo ubicación:', error);
      setModalMsg('Error obteniendo ubicación');
      setLastData(null);
      setShowDetails(false);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalMsg(null);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <TextInput
        placeholder="Mensaje para el médico"
        value={patientMessage}
        onChangeText={setPatientMessage}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
          width: '100%',
        }}
      />
      <Button title="Enviar SOS" onPress={handleSos} />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '85%' }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>SOS enviado</Text>
            {modalMsg ? (
              <Text style={{ fontSize: 16, marginBottom: 10 }}>{modalMsg}</Text>
            ) : (
              <>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>{patientMessage}</Text>
                {lastData && (
                  <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    <Text style={{ color: '#32729F', marginBottom: 10 }}>
                      {showDetails ? '▲ Ocultar detalles' : '▼ Más información'}
                    </Text>
                  </TouchableOpacity>
                )}
                {showDetails && lastData && (
                  <Text selectable style={{ fontFamily: 'monospace', fontSize: 13, marginBottom: 10 }}>
                    {JSON.stringify(lastData, null, 2)} 
                  </Text>
                )}
              </>
            )}
            <View style={{ marginTop: 10 }}>
              <Button title="Cerrar" onPress={handleCloseModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sos;

