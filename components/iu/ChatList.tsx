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
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexGrow: 1, // Asegura que el contenido pueda crecer
        }}
        showsVerticalScrollIndicator // Mostrar indicador de scroll para mayor claridad
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        scrollEnabled // Explícitamente habilitamos el scroll
        bounces // Permite efecto rebote para mejor feedback
        overScrollMode="always" // Soporte para Android
        keyboardShouldPersistTaps="handled" // Importante: permite tocar elementos sin cerrar el teclado
        removeClippedSubviews={false} // Importante para solucionar problemas de scroll
        windowSize={10} // Mejora el rendimiento de scroll
        initialNumToRender={10} // Mejora el rendimiento inicial
        maxToRenderPerBatch={10} // Controla la cantidad de elementos renderizados por lote
        updateCellsBatchingPeriod={50} // Controla la frecuencia de actualización
      />
    </View>
  );
};
