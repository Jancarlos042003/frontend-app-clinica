import type React from 'react';
import { FlatList, View } from 'react-native';

import { MessageBubble } from './MessageBubble';
import type { Message } from '../../types/chat';

interface ChatListProps {
  messages: Message[];
  onEndReached?: () => void;
}

export const ChatList: React.FC<ChatListProps> = ({ messages, onEndReached }) => {
  const renderMessage = ({ item }: { item: Message }) => <MessageBubble message={item} />;

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
