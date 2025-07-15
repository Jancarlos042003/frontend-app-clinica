import type React from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatInput } from '../../components/inputs/ChatInput';
import { ChatList } from '../../components/iu/ChatList';
import { useChat } from '../../hooks/useChat';
import { useUser } from '~/hooks/useUser';

const ChatScreen: React.FC = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const { user } = useUser();
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
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}>
        <View className="flex-1 bg-[#ededed]" style={{ marginBottom: MARGIN_BOTTOM }}>
          {/*<ChatHeader onHistoryPress={handleHistoryPress} onNewChatPress={handleNewChatPress} /> */}

          {messages.length === 0 ? (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              keyboardShouldPersistTaps="handled"
              bounces>
              <View className="flex-1 items-center justify-center px-8">
                <View className="mb-6 h-20 w-20 items-center justify-center self-center rounded-full bg-primary_200">
                  <Text className="text-3xl">🤖</Text>
                </View>
                <Text className="mb-4 text-center text-2xl font-bold text-gray-800">
                  ¡Hola {user?.name}! 👋
                </Text>
                <Text className="mb-6 text-center text-lg leading-6 text-gray-600">
                  Soy tu asistente médico virtual. Estoy aquí para ayudarte.
                </Text>
                <Text className="mt-6 text-center text-sm italic text-gray-500">
                  ¿En qué puedo ayudarte hoy?
                </Text>
              </View>
            </ScrollView>
          ) : (
            <View style={{ flex: 1 }}>
              <ChatList messages={messages} />
            </View>
          )}
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
