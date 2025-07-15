import { useRef, useState } from 'react';
import { Pressable, Animated, Alert } from 'react-native';
import { SosIcon } from '../icons/icons';
import ModalMessageSos from '../modal/ModalMessageSos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestPermission } from '~/services/permissionsService';

const SpecialTabButton = () => {
  const [showSOSModal, setShowSOSModal] = useState(false);

  const animScala = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(animScala, {
      toValue: 0.9,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animScala, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleSOS = () => {
    Alert.alert(
      '🚨 Alerta de Emergencia',
      '¿Seguro de activar la alerta SOS? Se notificará a tus contactos de emergencia.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Activar',
          style: 'destructive',
          onPress: () => {
            // Mostrar el modal para el mensaje opcional
            setShowSOSModal(true);
          },
        },
      ]
    );
  };

  const handleRequestPermission = () => {
    Alert.alert(
      'Permiso de Ubicación',
      'Para usar el botón SOS, necesitas permitir el acceso a tu ubicación.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Permitir',
          onPress: async () => {
            await requestPermission();

            // Verificar si el permiso fue concedido después de la solicitud
            const updatedPermission = await AsyncStorage.getItem('locationPermission');

            if (updatedPermission === 'true') {
              handleSOS();
            } else {
              Alert.alert(
                'Permiso denegado',
                'No se pudo activar el SOS sin acceso a la ubicación.',
                [{ text: 'Entendido' }]
              );
            }
          },
        },
      ]
    );
  };

  const handleOnPress = async () => {
    const permission = await AsyncStorage.getItem('locationPermission');

    if (permission === 'true') {
      console.log('Permiso de ubicación concedido - Activando SOS');
      handleSOS();
    } else {
      handleRequestPermission();
    }
  };

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: '#e31f1f',
          borderRadius: 50,
          width: 80,
          height: 80,
          position: 'absolute',
          bottom: 5,
          left: '50%',
          marginLeft: -40, // Centrar usando marginLeft en lugar de translateX
          transform: [{ scale: animScala }], // Solo la escala
          padding: 17,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5, // Sombra para Android
          shadowColor: '#000', // Sombra para iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
        }}>
        <Pressable onPress={handleOnPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <SosIcon size={35} color="white" />
        </Pressable>
      </Animated.View>

      <ModalMessageSos showSOSModal={showSOSModal} setShowSOSModal={setShowSOSModal} />
    </>
  );
};

export default SpecialTabButton;
