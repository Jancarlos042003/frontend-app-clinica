'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs, { type Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/es'; // Configurar DayJS
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Configurar DayJS
dayjs.locale('es');
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80;
const INITIAL_DAYS_RANGE = 60; // Aumentado para mejor experiencia inicial
const LOAD_MORE_THRESHOLD = 5; // Reducido para carga más temprana
const DAYS_TO_ADD = 30;

// Interfaces
interface Event {
  id: number;
  title: string;
  time: string;
}

interface EventsData {
  [key: string]: Event[];
}

interface DateFormat {
  dayName: string;
  dayNumber: string;
  month: string;
  fullDate: string;
}

interface DateItem {
  date: Dayjs;
  key: string;
  isToday: boolean;
  isWeekend: boolean;
  formatted: DateFormat;
}

// Estilos optimizados
const styles = {
  itemContainer: 'mx-1 w-20 items-center justify-center rounded-2xl py-4',
  selectedItem: 'bg-blue-500',
  todayItem: 'bg-blue-50',
  weekendItem: 'bg-orange-50',
  transparentItem: 'bg-transparent',

  dayNameText: 'mb-1 text-xs capitalize',
  dayNumberText: 'mb-0.5 text-lg font-bold',
  monthText: 'text-xs capitalize',

  selectedText: 'text-white',
  todayText: 'font-semibold text-blue-500',
  weekendText: 'text-orange-600',
  normalText: 'text-gray-500',
  normalDayText: 'text-gray-800',
  normalMonthText: 'text-gray-400',
};

const HorizontalCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [dates, setDates] = useState<Dayjs[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const flatListRef = useRef<FlatList<DateItem>>(null);
  const initialScrollDone = useRef<boolean>(false);
  const insets = useSafeAreaInsets(); // Usar insets de zona segura

  const MARGIN_BOTTOM = (Platform.OS === 'android' ? 70 : 60) + insets.bottom; // Ajuste para margen inferior

  // Refs para optimización de scroll
  const lastScrollX = useRef<number>(0);
  const scrollDirection = useRef<'left' | 'right' | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Datos de ejemplo para eventos - memoizados
  const eventsData: EventsData = useMemo(
    () => ({
      '2025-06-20': [
        { id: 1, title: 'Reunión de trabajo', time: '09:00' },
        { id: 2, title: 'Almuerzo con cliente', time: '13:00' },
      ],
      '2025-06-21': [{ id: 3, title: 'Presentación', time: '10:00' }],
      '2025-06-22': [
        { id: 4, title: 'Conferencia', time: '14:00' },
        { id: 5, title: 'Cena familiar', time: '19:00' },
      ],
      '2025-05-15': [{ id: 6, title: 'Evento del pasado', time: '15:00' }],
      '2025-07-15': [{ id: 7, title: 'Evento futuro', time: '16:00' }],
    }),
    []
  );

  // Generar fechas iniciales optimizado
  const generateInitialDates = useCallback((): Dayjs[] => {
    const dates: Dayjs[] = [];
    const today = dayjs();

    for (let i = -INITIAL_DAYS_RANGE; i <= INITIAL_DAYS_RANGE; i++) {
      dates.push(today.add(i, 'day'));
    }
    return dates;
  }, []);

  // Funciones de agregado de fechas optimizadas
  const addDatesAtBeginning = useCallback((currentDates: Dayjs[], daysToAdd: number): Dayjs[] => {
    if (currentDates.length === 0) return [];

    const newDates: Dayjs[] = [];
    const firstDate = currentDates[0];

    for (let i = daysToAdd; i >= 1; i--) {
      newDates.push(firstDate.subtract(i, 'day'));
    }

    return [...newDates, ...currentDates];
  }, []);

  const addDatesAtEnd = useCallback((currentDates: Dayjs[], daysToAdd: number): Dayjs[] => {
    if (currentDates.length === 0) return [];

    const newDates: Dayjs[] = [];
    const lastDate = currentDates[currentDates.length - 1];

    for (let i = 1; i <= daysToAdd; i++) {
      newDates.push(lastDate.add(i, 'day'));
    }

    return [...currentDates, ...newDates];
  }, []);

  // Procesar fechas a formato optimizado para FlatList
  const processedDates = useMemo((): DateItem[] => {
    const today = dayjs();

    return dates.map((date, index) => {
      const key = `${date.format('YYYY-MM-DD')}-${index}`;
      const isToday = date.isSame(today, 'day');
      const dayOfWeek = date.day();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      return {
        date,
        key,
        isToday,
        isWeekend,
        formatted: {
          dayName: date.format('ddd'),
          dayNumber: date.format('D'),
          month: date.format('MMM'),
          fullDate: date.format('YYYY-MM-DD'),
        },
      };
    });
  }, [dates]);

  // Inicializar fechas
  useEffect(() => {
    const initialDates = generateInitialDates();
    setDates(initialDates);
  }, [generateInitialDates]);

  // Scroll inicial mejorado
  useEffect(() => {
    if (processedDates.length > 0 && !initialScrollDone.current && flatListRef.current) {
      const todayIndex = processedDates.findIndex((item) => item.isToday);
      if (todayIndex !== -1) {
        // Usar setTimeout para asegurar que el FlatList esté completamente montado
        setTimeout(() => {
          try {
            flatListRef.current?.scrollToIndex({
              index: todayIndex,
              animated: false,
              viewPosition: 0.5,
            });
            initialScrollDone.current = true;
          } catch (error) {
            // Fallback más suave
            flatListRef.current?.scrollToOffset({
              offset: todayIndex * ITEM_WIDTH - width / 2 + ITEM_WIDTH / 2,
              animated: false,
            });
            initialScrollDone.current = true;
          }
        }, 50);
      }
    }
  }, [processedDates, width]);

  // Manejar scroll optimizado para mejor fluidez
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isLoadingMore || !event?.nativeEvent) return;

      const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
      const currentOffset = contentOffset.x;

      // Detectar dirección de scroll
      const direction = currentOffset > lastScrollX.current ? 'right' : 'left';
      scrollDirection.current = direction;
      lastScrollX.current = currentOffset;

      // Verificar si necesitamos cargar más datos
      const maxOffset = contentSize.width - layoutMeasurement.width;
      const shouldLoadAtEnd = currentOffset > maxOffset - LOAD_MORE_THRESHOLD * ITEM_WIDTH;
      const shouldLoadAtStart = currentOffset < LOAD_MORE_THRESHOLD * ITEM_WIDTH;

      if (shouldLoadAtEnd || shouldLoadAtStart) {
        // Limpiar timeout anterior
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }

        // Usar timeout más corto para mejor responsividad
        loadingTimeoutRef.current = setTimeout(() => {
          if (isLoadingMore) return;

          setIsLoadingMore(true);

          // Usar requestIdleCallback si está disponible, sino requestAnimationFrame
          const scheduleUpdate = (callback: () => void) => {
            if (typeof requestIdleCallback !== 'undefined') {
              requestIdleCallback(callback, { timeout: 100 });
            } else {
              requestAnimationFrame(callback);
            }
          };

          scheduleUpdate(() => {
            if (shouldLoadAtEnd) {
              setDates((prevDates) => {
                if (prevDates.length === 0) return prevDates;
                return addDatesAtEnd(prevDates, DAYS_TO_ADD);
              });
            } else if (shouldLoadAtStart) {
              const currentTodayIndex = dates.findIndex((date) => date.isSame(dayjs(), 'day'));

              setDates((prevDates) => {
                if (prevDates.length === 0) return prevDates;
                const newDates = addDatesAtBeginning(prevDates, DAYS_TO_ADD);

                // Mantener posición de scroll de forma más suave
                setTimeout(() => {
                  if (flatListRef.current && currentTodayIndex !== -1) {
                    const newIndex = currentTodayIndex + DAYS_TO_ADD;
                    const newOffset = newIndex * ITEM_WIDTH - width / 2 + ITEM_WIDTH / 2;

                    flatListRef.current.scrollToOffset({
                      offset: newOffset,
                      animated: false,
                    });
                  }
                }, 0);

                return newDates;
              });
            }

            setIsLoadingMore(false);
          });
        }, 50); // Timeout más corto para mejor responsividad
      }
    },
    [dates, isLoadingMore, addDatesAtEnd, addDatesAtBeginning, width]
  );

  // Funciones utilitarias memoizadas
  const isSelected = useCallback(
    (date: Dayjs): boolean => {
      return date.isSame(selectedDate, 'day');
    },
    [selectedDate]
  );

  const getEventsForDate = useCallback(
    (date: Dayjs): Event[] => {
      const dateKey = date.format('YYYY-MM-DD');
      return eventsData[dateKey] || [];
    },
    [eventsData]
  );

  const getDateInfo = useCallback((date: Dayjs): string => {
    const today = dayjs();
    const diffDays = date.diff(today, 'day');

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays === -1) return 'Ayer';
    if (diffDays > 0) return `En ${diffDays} días`;
    return `Hace ${Math.abs(diffDays)} días`;
  }, []);

  // Navegación optimizada
  const goToDate = useCallback(
    (targetDate: Dayjs): void => {
      const dateIndex = processedDates.findIndex((item) => item.date.isSame(targetDate, 'day'));

      if (dateIndex !== -1 && flatListRef.current) {
        try {
          flatListRef.current.scrollToIndex({
            index: dateIndex,
            animated: true,
            viewPosition: 0.5,
          });
          setSelectedDate(targetDate);
        } catch (error) {
          // Fallback más suave
          const targetOffset = dateIndex * ITEM_WIDTH - width / 2 + ITEM_WIDTH / 2;
          flatListRef.current.scrollToOffset({
            offset: targetOffset,
            animated: true,
          });
          setSelectedDate(targetDate);
        }
      }
    },
    [processedDates, width]
  );

  const goToToday = useCallback((): void => {
    goToDate(dayjs());
  }, [goToDate]);

  const goToNextWeek = useCallback((): void => {
    goToDate(selectedDate.add(1, 'week'));
  }, [goToDate, selectedDate]);

  const goToPrevWeek = useCallback((): void => {
    goToDate(selectedDate.subtract(1, 'week'));
  }, [goToDate, selectedDate]);

  // Componente DateItem memoizado y optimizado
  const DateItemComponent = React.memo<{ item: DateItem; isSelected: boolean }>(
    ({ item, isSelected: selected }) => {
      const { date, formatted, isToday, isWeekend } = item;
      const { dayName, dayNumber, month } = formatted;

      const containerStyle = `${styles.itemContainer} ${
        selected
          ? styles.selectedItem
          : isToday
            ? styles.todayItem
            : isWeekend
              ? styles.weekendItem
              : styles.transparentItem
      }`;

      const dayNameStyle = `${styles.dayNameText} ${
        selected
          ? styles.selectedText
          : isToday
            ? styles.todayText
            : isWeekend
              ? styles.weekendText
              : styles.normalText
      }`;

      const dayNumberStyle = `${styles.dayNumberText} ${
        selected
          ? styles.selectedText
          : isToday
            ? styles.todayText
            : isWeekend
              ? styles.weekendText
              : styles.normalDayText
      }`;

      const monthStyle = `${styles.monthText} ${
        selected
          ? styles.selectedText
          : isToday
            ? styles.todayText
            : isWeekend
              ? styles.weekendText
              : styles.normalMonthText
      }`;

      return (
        <TouchableOpacity
          className={containerStyle}
          onPress={() => setSelectedDate(date)}
          activeOpacity={0.7}>
          <Text className={dayNameStyle}>{dayName}</Text>
          <Text className={dayNumberStyle}>{dayNumber}</Text>
          <Text className={monthStyle}>{month}</Text>
        </TouchableOpacity>
      );
    }
  );

  // Renderizador de fecha optimizado
  const renderDateItem: ListRenderItem<DateItem> = useCallback(
    ({ item }) => {
      const selected = isSelected(item.date);
      return <DateItemComponent item={item} isSelected={selected} />;
    },
    [isSelected]
  );

  // Renderizador de eventos memoizado
  const renderEvent: ListRenderItem<Event> = useCallback(
    ({ item }) => (
      <View className="mb-2 flex-row rounded-xl bg-white p-4 shadow-sm">
        <View className="w-15 mr-4 items-center justify-center">
          <Text className="text-xs font-semibold text-blue-500">{item.time}</Text>
        </View>
        <View className="flex-1 justify-center">
          <Text className="text-base font-medium text-gray-800">{item.title}</Text>
        </View>
      </View>
    ),
    []
  );

  // Funciones de clave optimizadas
  const keyExtractor = useCallback((item: DateItem) => item.key, []);
  const eventKeyExtractor = useCallback((item: Event) => item.id.toString(), []);

  // Función de layout optimizada
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    []
  );

  // Datos calculados
  const events = useMemo(() => getEventsForDate(selectedDate), [selectedDate, getEventsForDate]);
  const dateInfo = useMemo(() => getDateInfo(selectedDate), [selectedDate, getDateInfo]);
  const selectedDateText = useMemo(
    () => selectedDate.format('dddd, D [de] MMMM [de] YYYY'),
    [selectedDate]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <View className="flex-1 bg-gray-50" style={{ marginBottom: MARGIN_BOTTOM }}>
      {/* Header con fecha seleccionada */}
      <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-5 pb-5 pt-5">
        <View className="flex-1">
          <Text className="text-lg font-bold capitalize text-gray-800">{selectedDateText}</Text>
          <Text className="mt-0.5 text-sm text-gray-500">{dateInfo}</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="mx-1 h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            onPress={goToPrevWeek}
            activeOpacity={0.7}>
            <Text className="text-lg font-bold text-gray-800">←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-1 rounded-full bg-blue-500 px-4 py-2"
            onPress={goToToday}
            activeOpacity={0.8}>
            <Text className="text-sm font-semibold text-white">Hoy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-1 h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            onPress={goToNextWeek}
            activeOpacity={0.7}>
            <Text className="text-lg font-bold text-gray-800">→</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendario horizontal mejorado */}
      <View className="relative border-b border-gray-200 bg-white py-4">
        <FlatList
          ref={flatListRef}
          data={processedDates}
          renderItem={renderDateItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 10 }}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Mejorado para 60fps
          getItemLayout={getItemLayout}
          initialNumToRender={20} // Aumentado para mejor experiencia inicial
          maxToRenderPerBatch={10} // Aumentado
          windowSize={10} // Aumentado
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50} // Reducido para mejor responsividad
          disableIntervalMomentum={true}
          // Nuevas props para mejor rendimiento
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          overScrollMode="never" // Android
          bounces={false} // iOS
        />

        {/* Indicador de carga mejorado */}
        {isLoadingMore && (
          <View className="absolute bottom-1 left-0 right-0 items-center">
            <View className="rounded-full bg-black/10 px-3 py-1">
              <Text className="text-xs text-gray-600">Cargando...</Text>
            </View>
          </View>
        )}
      </View>

      {/* Lista de eventos */}
      <View className="flex-1 p-5">
        <Text className="mb-4 text-lg font-bold text-gray-800">
          Eventos del día ({events.length})
        </Text>
        {events.length > 0 ? (
          <FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={eventKeyExtractor}
            className="flex-1"
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-base text-gray-400">
              No hay eventos programados para este día
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HorizontalCalendar;
