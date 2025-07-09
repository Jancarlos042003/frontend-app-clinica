import { useCallback, useRef, useState } from 'react';
import uuid from 'react-native-uuid';

import { ChatService } from '../services/chatService';
import type { Message } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatService = useRef(new ChatService()).current;

  const addMessage = useCallback((message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: uuid.v4() as string,
    };

    setMessages((prev) => [newMessage, ...prev]);
    return newMessage.id;
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)));
  }, []);

  const sendMessage = useCallback(
    async (content: string, imageUri?: string) => {
      if (isLoading) return;

      // Agregar mensaje del usuario
      addMessage({
        content,
        role: 'user',
        imageUri,
        isComplete: true,
      });

      // Agregar mensaje del asistente (inicialmente vacío y en streaming)
      const assistantMessageId = addMessage({
        content: '',
        role: 'assistant',
        isStreaming: true,
        isComplete: false,
      });

      setIsLoading(true);

      try {
        await chatService.sendMessageStream(
          content,
          imageUri,
          // onChunk - Recibe el contenido completo acumulado
          (chunk: string) => {
            updateMessage(assistantMessageId, {
              content: chunk,
              isStreaming: true,
              isComplete: false,
            });
          },
          // onComplete
          () => {
            updateMessage(assistantMessageId, {
              isStreaming: false,
              isComplete: true,
            });
            setIsLoading(false);
          },
          // onError
          (error: Error) => {
            console.error('Error en el stream:', error);
            updateMessage(assistantMessageId, {
              content: 'Error al procesar la respuesta',
              isStreaming: false,
              isComplete: true,
            });
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error('Error enviando mensaje:', error);
        updateMessage(assistantMessageId, {
          content: 'Error al enviar el mensaje',
          isStreaming: false,
          isComplete: true,
        });
        setIsLoading(false);
      }
    },
    [isLoading, addMessage, updateMessage, chatService]
  );

  const clearChat = useCallback(async () => {
    setMessages([]);
    await chatService.clearSession(); // Limpia la sesión del chat
  }, [chatService]);

  // Método para obtener el ID de conversación actual
  const getConversationId = useCallback(() => {
    return chatService.getConversationId();
  }, [chatService]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    getConversationId, // Exponemos el método para obtener el ID de conversación
  };
};
