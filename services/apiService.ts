import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { getAccessToken, getRefreshToken, saveTokens } from '../auth/tokenService';
import { API_URL } from '../config/env';
console.log('✅ API_URL cargado desde .env:', API_URL);

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string = API_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 10000, // 10 segundos
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Interceptor para requests - agrega el token automáticamente
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getAccessToken();

          // Solo agregar el token si existe
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.warn('Error al obtener token:', error);
        }
        return config;
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
      }
    );

    // Interceptor para responses - maneja errores de autenticación
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config; // Configuración de la solicitud original

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Para evitar bucles infinitos

          try {
            const refreshToken = await getRefreshToken();

            // Solo intentar refresh si existe un refreshToken
            if (refreshToken) {
              const config: AxiosRequestConfig = {
                method: 'POST',
                url: `${API_URL}/api/auth/refresh-token`,
                data: { refreshToken },
              };

              const response = await axios(config);

              if (response.data) {
                const { token, refreshToken: newRefreshToken } = response.data;
                await saveTokens(token, newRefreshToken); // Guardar los nuevos tokens
                originalRequest.headers.Authorization = `Bearer ${token}`; // Actualizar el token en la solicitud original

                // Reintentar la solicitud original con el nuevo token
                return this.axiosInstance(originalRequest);
              }
            }
          } catch (refreshError) {
            console.error('Error al refrescar el token:', refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Métodos públicos para hacer requests
  async get<T>(url: string, config?: AxiosRequestConfig) {
    console.log('Fetching data from:', url);

    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export const apiService = new ApiService();
