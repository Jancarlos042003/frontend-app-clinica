import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ClockIcon, PlusCircleIcon } from '../icons/icons';

interface ChatHeaderProps {
  onHistoryPress: () => void;
  onNewChatPress: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onHistoryPress, onNewChatPress }) => {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <TouchableOpacity
        onPress={onHistoryPress}
        className="flex-row items-center rounded-lg bg-gray-100 px-3 py-2">
        <ClockIcon size={20} color="#6B7280" />
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-gray-800">Chat Assistant</Text>

      <TouchableOpacity
        onPress={onNewChatPress}
        className="flex-row items-center rounded-lg bg-blue-500 px-3 py-2">
        <PlusCircleIcon color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
};
