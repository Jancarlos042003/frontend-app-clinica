import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetch } from 'expo/fetch';
import uuid from 'react-native-uuid';

import { API_URL } from '../config/env';

export class ChatService {
  private baseUrl: string;
  private sessionId: string = uuid.v4() as string;
  private conversationId: string = uuid.v4() as string; // ID único para toda la conversación
  private initialized: boolean = false;

  constructor(baseUrl = `${API_URL}`) {
    this.baseUrl = baseUrl;
    // Inicializamos valores por defecto y luego intentamos cargar desde AsyncStorage
    this.initializeStorage();
  }

  private async initializeStorage(): Promise<void> {
    try {
      // Intentamos recuperar los valores almacenados
      const storedSessionId = await AsyncStorage.getItem('chatSessionId');
      const storedConversationId = await AsyncStorage.getItem('chatConversationId');

      // Si existen, los usamos
      if (storedSessionId) {
        this.sessionId = storedSessionId;
      } else {
        await AsyncStorage.setItem('chatSessionId', this.sessionId);
      }

      if (storedConversationId) {
        this.conversationId = storedConversationId;
      } else {
        await AsyncStorage.setItem('chatConversationId', this.conversationId);
      }

      this.initialized = true;
    } catch (error) {
      console.error('Error al inicializar el almacenamiento:', error);
    }
  }

  async sendMessageStream(
    message: string,
    imageUri?: string,
    onChunk?: (chunk: string) => void,
    onComplete?: () => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      // Esperamos a que la inicialización se complete si es necesario
      if (!this.initialized) {
        await this.initializeStorage();
      }

      // Creamos el payload en el formato requerido por el backend Spring Boot
      const payload = {
        sessionId: this.conversationId, // Usamos el conversationId como sessionId
        message,
      };

      // Nota: Por ahora no estamos enviando la imagen ya que el backend aún no la soporta
      // Cuando se implemente soporte para imágenes, se podría enviar aquí

      const response = await fetch(`${this.baseUrl}/api/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No se pudo obtener el reader del stream');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let contentAccumulator = ''; // Acumula todo el contenido para preservar estructura

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Enviar contenido final acumulado
            if (contentAccumulator.trim()) {
              onChunk?.(contentAccumulator);
            }
            onComplete?.();
            break;
          }

          // Decodificamos cada chunk del stream
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Procesamos las líneas completas en el buffer
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Guardamos la línea incompleta para el próximo chunk

          let hasNewContent = false;

          for (const line of lines) {
            if (line.trim() === '') continue;

            // Procesamos las líneas que empiezan con "data:"
            if (line.startsWith('data:')) {
              const data = line.slice(5); // Removemos "data:"

              // Verificamos si es la señal de finalización
              if (data.trim() === '[DONE]') {
                if (contentAccumulator.trim()) {
                  onChunk?.(contentAccumulator);
                }
                onComplete?.();
                return;
              }

              // Si la línea está vacía después de "data:", es un salto de línea
              if (data.trim() === '') {
                contentAccumulator += '\n';
                hasNewContent = true;
              } else {
                // Agregar el contenido
                contentAccumulator += data;
                hasNewContent = true;
              }
            }
          }

          // Enviar actualizaciones para el streaming en tiempo real
          if (hasNewContent) {
            onChunk?.(contentAccumulator);
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error('Error en sendMessageStream:', error);
      onError?.(error as Error);
    }
  }

  // Método para limpiar la sesión del chat
  async clearSession(): Promise<void> {
    try {
      // Limpiar la sesión actual
      await AsyncStorage.removeItem('chatSessionId');
      this.sessionId = uuid.v4() as string;
      await AsyncStorage.setItem('chatSessionId', this.sessionId);

      // Generar un nuevo ID de conversación para próximas interacciones
      await AsyncStorage.removeItem('chatConversationId');
      this.conversationId = uuid.v4() as string;
      await AsyncStorage.setItem('chatConversationId', this.conversationId);
    } catch (error) {
      console.error('Error al limpiar la sesión:', error);
    }
  }

  // Método para obtener el ID de conversación actual
  getConversationId(): string {
    return this.conversationId;
  }
}
