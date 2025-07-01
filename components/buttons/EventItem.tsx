// EventItem.tsx - Componente individual para cada evento
import React from 'react';
import { Text, View } from 'react-native';

import { EventItemProps } from '../../types/types';
// ✅ MEJORA: Componente memoizado para optimizar la lista de eventos
const EventItem: React.FC<EventItemProps> = React.memo(
  ({ event }) => {
    return (
      <View className="mb-2 flex-row rounded-xl bg-white p-4 shadow-sm">
        <View className="w-15 mr-4 items-center justify-center">
          <Text className="text-xs font-semibold text-blue-500">{event.time}</Text>
        </View>
        <View className="flex-1 justify-center">
          <Text className="text-base font-medium text-gray-800">{event.title}</Text>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // ✅ MEJORA: Comparación optimizada - solo re-renderiza si el evento cambia
    return (
      prevProps.event.id === nextProps.event.id &&
      prevProps.event.title === nextProps.event.title &&
      prevProps.event.time === nextProps.event.time
    );
  }
);

EventItem.displayName = 'EventItem';

export default EventItem;
