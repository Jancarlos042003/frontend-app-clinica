// useCalendar.ts - Custom hook para la lógica del calendario
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { CALENDAR_CONFIG } from '../constants/constants';
import {
  addDatesAtBeginning,
  addDatesAtEnd,
  generateInitialDates,
  getTodayInstance,
} from '../utils/calendar/utils';

// ✅ MEJORA: Lógica del calendario encapsulada en un custom hook
export const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [dates, setDates] = useState<Dayjs[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const flatListRef = useRef<FlatList<Dayjs>>(null);
  const initialScrollDone = useRef<boolean>(false);

  // ✅ MEJORA: Funciones memoizadas con useCallback para evitar recreación
  const initializeDates = useCallback(() => {
    const initialDates = generateInitialDates();
    setDates(initialDates);
  }, []);

  const scrollToDate = useCallback(
    (targetDate: Dayjs, animated: boolean = true) => {
      const dateIndex = dates.findIndex((date) => date.isSame(targetDate, 'day'));

      if (dateIndex !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: dateIndex,
          animated,
          viewPosition: 0.5,
        });
      }
    },
    [dates]
  );

  const goToDate = useCallback(
    (targetDate: Dayjs): void => {
      scrollToDate(targetDate);
      setSelectedDate(targetDate);
    },
    [scrollToDate]
  );

  // ✅ MEJORA: Navegación optimizada con useCallback
  const goToToday = useCallback((): void => {
    goToDate(getTodayInstance());
  }, [goToDate]);

  const goToNextWeek = useCallback((): void => {
    goToDate(selectedDate.add(1, 'week'));
  }, [selectedDate, goToDate]);

  const goToPrevWeek = useCallback((): void => {
    goToDate(selectedDate.subtract(1, 'week'));
  }, [selectedDate, goToDate]);

  // ✅ MEJORA: Handler de scroll optimizado con useCallback y throttling mejorado
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isLoadingMore) return; // ✅ MEJORA: Early return para evitar múltiples cargas

      const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
      const currentOffset = contentOffset.x;
      const maxOffset = contentSize.width - layoutMeasurement.width;
      const threshold = CALENDAR_CONFIG.LOAD_MORE_THRESHOLD * CALENDAR_CONFIG.ITEM_WIDTH;

      // Cargar más fechas al final (futuro)
      if (currentOffset > maxOffset - threshold) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDates((prevDates) => addDatesAtEnd(prevDates, CALENDAR_CONFIG.DAYS_TO_ADD));
          setIsLoadingMore(false);
        }, 200);
        return;
      }

      // Cargar más fechas al principio (pasado)
      if (currentOffset < threshold) {
        setIsLoadingMore(true);
        const currentTodayIndex = dates.findIndex((date) => date.isSame(getTodayInstance(), 'day'));

        setTimeout(() => {
          setDates((prevDates) => {
            const newDates = addDatesAtBeginning(prevDates, CALENDAR_CONFIG.DAYS_TO_ADD);
            // ✅ MEJORA: Scroll position maintenance optimizado
            setTimeout(() => {
              if (flatListRef.current && currentTodayIndex !== -1) {
                flatListRef.current.scrollToIndex({
                  index: currentTodayIndex + CALENDAR_CONFIG.DAYS_TO_ADD,
                  animated: false,
                });
              }
            }, 50);
            return newDates;
          });
          setIsLoadingMore(false);
        }, 200);
      }
    },
    [dates, isLoadingMore]
  );

  // ✅ MEJORA: Handler de selección de fecha memoizado
  const handleDateSelect = useCallback((date: Dayjs) => {
    setSelectedDate(date);
  }, []);

  // Inicializar fechas
  useEffect(() => {
    initializeDates();
  }, [initializeDates]);

  // ✅ MEJORA: Scroll inicial optimizado
  useEffect(() => {
    if (dates.length > 0 && !initialScrollDone.current && flatListRef.current) {
      const todayIndex = dates.findIndex((date) => date.isSame(getTodayInstance(), 'day'));
      if (todayIndex !== -1) {
        // ✅ MEJORA: Timeout reducido para scroll más rápido
        setTimeout(() => {
          scrollToDate(getTodayInstance(), true);
          initialScrollDone.current = true;
        }, 100);
      }
    }
  }, [dates, scrollToDate]);

  return {
    // Estado
    selectedDate,
    dates,
    isLoadingMore,
    flatListRef,

    // Handlers
    handleScroll,
    handleDateSelect,

    // Navegación
    goToToday,
    goToNextWeek,
    goToPrevWeek,
  };
};
