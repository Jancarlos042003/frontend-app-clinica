import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CalendarHeaderProps } from '../../types/types';
import { getDateInfo } from '../../utils/calendar/utils';

// ✅ MEJORA: Componente separado y memoizado para evitar re-renders innecesarios
const CalendarHeader: React.FC<CalendarHeaderProps> = React.memo(
  ({ selectedDate, onGoToToday, onGoToPrevWeek, onGoToNextWeek }) => {
    // ✅ MEJORA: Cálculo memoizado de la información de fecha
    const dateInfo = React.useMemo(() => getDateInfo(selectedDate), [selectedDate]);

    // ✅ MEJORA: Formateo memoizado de la fecha seleccionada
    const formattedDate = React.useMemo(
      () => selectedDate.format('dddd, D [de] MMMM [de] YYYY'),
      [selectedDate]
    );

    return (
      <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-5 pb-5 pt-5">
        <View className="flex-1">
          <Text className="text-lg font-bold capitalize text-gray-800">{formattedDate}</Text>
          <Text className="mt-0.5 text-sm text-gray-500">{dateInfo}</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="mx-1 h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            onPress={onGoToPrevWeek}
            // ✅ MEJORA: Accesibilidad añadida
            accessibilityLabel="Semana anterior"
            accessibilityRole="button">
            <Text className="text-lg font-bold text-gray-800">←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mx-1 rounded-full bg-blue-500 px-4 py-2"
            onPress={onGoToToday}
            accessibilityLabel="Ir a hoy"
            accessibilityRole="button">
            <Text className="text-sm font-semibold text-white">Hoy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mx-1 h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            onPress={onGoToNextWeek}
            accessibilityLabel="Semana siguiente"
            accessibilityRole="button">
            <Text className="text-lg font-bold text-gray-800">→</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader;
