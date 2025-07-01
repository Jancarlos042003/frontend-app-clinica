import type React from 'react';
import { Image, Text, View } from 'react-native';

import type { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming && !message.isComplete;

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

        <Text className={`text-base ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </Text>

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
