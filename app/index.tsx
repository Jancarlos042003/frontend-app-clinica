import '../global.css';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { getAccessToken, getRefreshToken, saveTokens } from '../auth/tokenService';
import { API_URL } from '../config/env';
import { useUser } from '../hooks/useUser';
import { isTokenValid } from '../utils/auth/jwt';

const Index = () => {
  const router = useRouter();
  const { loginUser } = useUser();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getAccessToken();
        if (token && isTokenValid(token)) {
          // Si hay un token, intenta iniciar sesión al usuario
          loginUser(token);
          router.replace('/(tabs)/home');
        } else {
          // Si hay token pero este esta vencido
          const refreshToken = await getRefreshToken();

          if (refreshToken) {
            const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {
              refreshToken,
            });

            if (response.data) {
              await saveTokens(response.data.token, response.data.refreshToken);
              loginUser(response.data.token);
              router.replace('/(tabs)/home');
              return;
            }
          }

          // Si no hay token, redirige a la pantalla de inicio
          router.replace('/(onboarding)/start');
        }
      } catch (error) {
        console.error('Error al verificar el estado de autenticación:', error);
        // En caso de error, redirige a la pantalla de inicio
        router.replace('/(onboarding)/start');
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Index;
