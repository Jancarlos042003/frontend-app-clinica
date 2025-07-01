import type React from 'react';
import { Alert, Platform, View } from 'react-native';

import { ChatHeader } from '../../components/headers/ChatHeader';
import { ChatInput } from '../../components/inputs/ChatInput';
import { ChatList } from '../../components/iu/ChatList';
import { useChat } from '../../hooks/useChat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatScreen: React.FC = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const insets = useSafeAreaInsets();

  const MARGIN_BOTTOM = (Platform.OS === 'android' ? 70 : 60) + insets.bottom; // Ajuste para margen inferior

  const handleHistoryPress = () => {
    Alert.alert('Historial', 'Funcionalidad de historial próximamente');
  };

  const handleNewChatPress = () => {
    Alert.alert(
      'Nuevo Chat',
      '¿Estás seguro de que quieres iniciar un nuevo chat? Se perderá la conversación actual.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: clearChat },
      ]
    );
  };

  const handleSendMessage = (message: string, imageUri?: string) => {
    sendMessage(message, imageUri);
  };

  return (
    <View className="flex-1 bg-white" style={{ marginBottom: MARGIN_BOTTOM }}>
      <ChatHeader onHistoryPress={handleHistoryPress} onNewChatPress={handleNewChatPress} />

      <ChatList messages={messages} />

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </View>
  );
};

export default ChatScreen;
