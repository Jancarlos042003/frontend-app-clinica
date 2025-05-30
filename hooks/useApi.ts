import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

const useApi = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clearError = () => {
    setError(null);
  };

  const fetchData = async (
    url: string,
    token: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    requestData?: any,
    config?: AxiosRequestConfig
  ) => {
    setLoading(true);
    setError(null);

    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url,
        data: requestData,
        ...config,
        headers: {
          ...config?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      const response = await axios.request<T>(axiosConfig);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      // Usar el mensaje del backend si está disponible
      console.log(err.response?.data);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setError('No autorizado. Verifica tus credenciales.');
      } else if (err.response?.status === 403) {
        setError('Prohibido. No tienes acceso a este recurso.');
      } else {
        setError(err.message || 'Error al realizar la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData, clearError };
};

export default useApi;
