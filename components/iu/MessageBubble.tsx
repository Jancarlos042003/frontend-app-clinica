import type React from 'react';
import { Image, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

import type { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming && !message.isComplete;

  // Estilos para el Markdown
  const markdownStyles = {
    body: {
      color: isUser ? '#FFFFFF' : '#1F2937',
      fontSize: 16,
      lineHeight: 24,
    },
    paragraph: {
      marginTop: 0,
      marginBottom: 8,
      color: isUser ? '#FFFFFF' : '#1F2937',
    },
    strong: {
      color: isUser ? '#FFFFFF' : '#111827',
      fontWeight: 'bold' as const,
    },
    em: {
      color: isUser ? '#FFFFFF' : '#374151',
      fontStyle: 'italic' as const,
    },
    code_inline: {
      backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : '#F3F4F6',
      color: isUser ? '#FFFFFF' : '#DC2626',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
      fontSize: 14,
    },
    code_block: {
      backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : '#F9FAFB',
      color: isUser ? '#FFFFFF' : '#111827',
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
      fontSize: 14,
    },
    bullet_list: {
      marginTop: 4,
      marginBottom: 4,
    },
    ordered_list: {
      marginTop: 4,
      marginBottom: 4,
    },
    list_item: {
      color: isUser ? '#FFFFFF' : '#1F2937',
      marginBottom: 4,
    },
    heading1: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      color: isUser ? '#FFFFFF' : '#111827',
      marginTop: 8,
      marginBottom: 8,
    },
    heading2: {
      fontSize: 18,
      fontWeight: 'bold' as const,
      color: isUser ? '#FFFFFF' : '#111827',
      marginTop: 6,
      marginBottom: 6,
    },
    heading3: {
      fontSize: 16,
      fontWeight: 'bold' as const,
      color: isUser ? '#FFFFFF' : '#111827',
      marginTop: 4,
      marginBottom: 4,
    },
  };

  return (
    <View className={`mb-4 flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser ? 'rounded-br-md bg-blue-500' : 'rounded-bl-md bg-gray-100'
        }`}>
        {message.imageUri && (
          <Image
            source={{ uri: message.imageUri }}
            className="mb-2 h-48 w-48 rounded-lg"
            resizeMode="cover"
          />
        )}

        {isUser ? (
          <Text className="text-base text-white">{message.content}</Text>
        ) : (
          <Markdown style={markdownStyles}>{message.content}</Markdown>
        )}

        {isStreaming && (
          <View className="mt-2 flex-row items-center">
            <View className="mr-1 h-2 w-2 animate-pulse rounded-full bg-gray-400" />
            <View className="mr-1 h-2 w-2 animate-pulse rounded-full bg-gray-400" />
            <View className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
          </View>
        )}
      </View>
    </View>
  );
};
