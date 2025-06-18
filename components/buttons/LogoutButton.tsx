import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Pressable } from 'react-native';

import { clearTokens } from '../../auth/tokenService';

const LogoutButton = () => {
  const router = useRouter();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleLogout = async () => {
    await clearTokens();
    router.replace('/(onboarding)/start');
  };

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const animatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#ef4444'], // transparent to red-500
  });

  const animatedTextColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ef4444', '#ffffff'], // red-500 to white
  });

  /**
   * Pressable (solo maneja los eventos de toque)
   * Animated.View (contenedor principal con todos los estilos)
   */

  return (
    <Pressable
      className="w-full"
      onPress={handleLogout}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={{
          backgroundColor: animatedBackgroundColor,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderRadius: 16,
          borderColor: '#ef4444',
          padding: 12,
        }}>
        <Animated.Text style={{ color: animatedTextColor, fontWeight: 'bold' }}>
          Cerrar sesión
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default LogoutButton;
