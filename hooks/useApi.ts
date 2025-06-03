import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

import { apiService } from '../services/apiService';

const useApi = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clearError = () => {
    setError(null);
  };

  const fetchData = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    requestData?: object,
    config?: AxiosRequestConfig
  ) => {
    setLoading(true);
    setError(null);

    console.log('Fetching data from:', url);
    console.log('Request method:', method);
    console.log('Request data:', requestData);

    try {
      let response: T;

      switch (method) {
        case 'GET':
          response = await apiService.get<T>(url, config);
          break;
        case 'POST':
          response = await apiService.post<T>(url, requestData, config);
          break;
        case 'PUT':
          response = await apiService.put<T>(url, requestData, config);
          break;
        case 'DELETE':
          response = await apiService.delete<T>(url, config);
          break;
        default:
          throw new Error('Método HTTP no soportado');
      }

      setData(response);
      return response;
    } catch (err: any) {
      // Usar el mensaje del backend si está disponible
      console.log('Error completo:', err.response?.data);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
      } else if (err.response?.status === 403) {
        setError('Prohibido. No tienes acceso a este recurso.');
      } else if (err.response?.status >= 500) {
        setError('Error del servidor. Intenta más tarde.');
      } else {
        setError(err.message || 'Error al realizar la solicitud');
      }

      throw err; // Re-lanzar el error para que pueda ser manejado por el componente que llama
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData, clearError };
};

export default useApi;
