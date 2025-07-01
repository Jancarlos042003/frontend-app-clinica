import axios from 'axios';
import { Router } from 'expo-router';

import { isTokenValid } from './jwt';
import { getAccessToken, getRefreshToken, saveTokens } from '../../auth/tokenService';
import { API_URL } from '../../config/env';

export const checkAuthStatus = async (loginUser: (token: string) => void, router: Router) => {
  try {
    const token = await getAccessToken();
    if (token && isTokenValid(token)) {
      loginUser(token);
      router.replace('/(tabs)/home');
    } else {
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
      router.replace('/(onboarding)/start');
    }
  } catch (error) {
    console.error('Error al verificar el estado de autenticación:', error);
    router.replace('/(onboarding)/start');
  }
};
