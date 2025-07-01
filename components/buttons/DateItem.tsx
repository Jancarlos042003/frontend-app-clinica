// DateItem.tsx - Componente individual para cada fecha del calendario
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { DateItemProps } from '../../types/types';
import {
  formatDate,
  getDateItemStyles,
  getTextStyles,
  isSelected,
  isToday,
  isWeekend,
} from '../../utils/calendar/utils';

// ✅ MEJORA: Componente memoizado para evitar re-renders innecesarios
// Solo se re-renderiza cuando cambian sus props específicas
const DateItem: React.FC<DateItemProps> = React.memo(
  ({ date, selectedDate, onDateSelect }) => {
    // ✅ MEJORA: Cálculos memoizados para evitar recálculos en cada render
    const dateFormat = React.useMemo(() => formatDate(date), [date]);
    const isTodayDate = React.useMemo(() => isToday(date), [date]);
    const isSelectedDate = React.useMemo(
      () => isSelected(date, selectedDate),
      [date, selectedDate]
    );
    const isWeekendDate = React.useMemo(() => isWeekend(date), [date]);

    // ✅ MEJORA: Estilos memoizados para evitar recálculo de clases CSS
    const containerStyles = React.useMemo(
      () => getDateItemStyles(isSelectedDate, isTodayDate, isWeekendDate),
      [isSelectedDate, isTodayDate, isWeekendDate]
    );

    const dayNameStyles = React.useMemo(
      () => getTextStyles(isSelectedDate, isTodayDate, isWeekendDate, 'dayName'),
      [isSelectedDate, isTodayDate, isWeekendDate]
    );

    const dayNumberStyles = React.useMemo(
      () => getTextStyles(isSelectedDate, isTodayDate, isWeekendDate, 'dayNumber'),
      [isSelectedDate, isTodayDate, isWeekendDate]
    );

    const monthStyles = React.useMemo(
      () => getTextStyles(isSelectedDate, isTodayDate, isWeekendDate, 'month'),
      [isSelectedDate, isTodayDate, isWeekendDate]
    );

    // ✅ MEJORA: Handler memoizado para evitar recreación en cada render
    const handlePress = React.useCallback(() => {
      onDateSelect(date);
    }, [date, onDateSelect]);

    const { dayName, dayNumber, month } = dateFormat;

    return (
      <TouchableOpacity
        className={containerStyles}
        onPress={handlePress}
        // ✅ MEJORA: Accesibilidad mejorada
        accessibilityLabel={`${dayName} ${dayNumber} de ${month}`}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelectedDate }}>
        <Text className={dayNameStyles}>{dayName}</Text>
        <Text className={dayNumberStyles}>{dayNumber}</Text>
        <Text className={monthStyles}>{month}</Text>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // ✅ MEJORA: Comparación personalizada para optimizar re-renders
    // Solo re-renderiza si la fecha o la fecha seleccionada cambian
    return (
      prevProps.date.isSame(nextProps.date, 'day') &&
      prevProps.selectedDate.isSame(nextProps.selectedDate, 'day')
    );
  }
);

DateItem.displayName = 'DateItem';

export default DateItem;
