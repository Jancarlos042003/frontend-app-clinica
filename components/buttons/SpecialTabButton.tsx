import { useRef, useState } from 'react';
import { Pressable, Animated, Alert } from 'react-native';
import { SosIcon } from '../icons/icons';
import ModalMessageSos from '../modal/ModalMessageSos';

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

  const handleSOSPress = () => {
    Alert.alert(
      '🚨 Alerta de Emergencia',
      '¿Estás seguro de que quieres activar la alerta SOS? Se notificará a tus contactos de emergencia.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Activar SOS',
          style: 'destructive',
          onPress: () => {
            // Mostrar el modal para el mensaje opcional
            setShowSOSModal(true);
          },
        },
      ]
    );
  };

  return (
    <>
      <Animated.View
        style={{
          transform: [{ scale: animScala }],
          backgroundColor: '#e31f1f',
          borderRadius: 50,
          padding: 17,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5, // Sombra para Android
          shadowColor: '#000', // Sombra para iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
        }}>
        <Pressable onPress={handleSOSPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <SosIcon size={30} color="white" />
        </Pressable>
      </Animated.View>

      <ModalMessageSos showSOSModal={showSOSModal} setShowSOSModal={setShowSOSModal} />
    </>
  );
};

export default SpecialTabButton;
