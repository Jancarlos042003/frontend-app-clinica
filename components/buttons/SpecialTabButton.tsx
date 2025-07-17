import { useRef, useState } from 'react';
import { Pressable, Animated, Alert, Linking } from 'react-native';

import { SosIcon } from '../icons/icons';
import ModalMessageSos from '../modal/ModalMessageSos';

import {
  requestPermission,
  checkLocationPermission,
  wasPermissionDeniedPermanently,
} from '~/services/permissionsService';

const SpecialTabButton = () => {
  const [showSOSModal, setShowSOSModal] = useState(false);

  const animScala = useRef(new Animated.Value(1)).current;

  // Función para abrir la configuración de la aplicación
  const openAppSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error('Error al abrir configuración:', error);
      Alert.alert(
        'Error',
        'No se pudo abrir la configuración. Ve manualmente a Configuración > Aplicaciones > PostCare > Permisos > Ubicación.',
        [{ text: 'Entendido' }]
      );
    }
  };

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

  const handleRequestPermission = async () => {
    // Verificar si el permiso fue denegado permanentemente
    const permanentlyDenied = await wasPermissionDeniedPermanently();

    if (permanentlyDenied) {
      Alert.alert(
        'Permiso de Ubicación Requerido',
        'Los permisos de ubicación fueron denegados. Para usar el SOS, debes habilitarlos manualmente en la configuración de la aplicación.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Ir a Configuración',
            onPress: openAppSettings,
          },
        ]
      );
      return;
    }

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
            const result = await requestPermission();

            if (result.success) {
              handleSOS();
            } else if (result.permanentlyDenied) {
              Alert.alert(
                'Permiso Denegado Permanentemente',
                'Has denegado el permiso de ubicación. Para usar el SOS, debes habilitarlo manualmente en la configuración.',
                [{ text: 'Entendido' }]
              );
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
    // Verificar directamente el estado real del permiso (sin AsyncStorage)
    const hasPermission = await checkLocationPermission();

    if (hasPermission) {
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
