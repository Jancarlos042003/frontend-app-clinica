import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  type ListRenderItem,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/es'; // Configurar DayJS
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MedicationList from '../lists/MedicationList';
import { useMedicationContext } from '~/context/MedicationContext';
import { useSymptomContext } from '~/context/SymptomContext';
import { useUser } from '~/hooks/useUser';
import useApi from '~/hooks/useApi';
import SymptomList from '../lists/SymptomList';
import LoadingIndicator from './LoadingIndicator';
import DateItemComponent from './DateItemComponent';
import { generateInitialDates } from './dateUtils';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/icons';
import { Symptom } from '~/types/symptom';
import { Medication } from '~/types/medication';

// Configurar DayJS
dayjs.locale('es');
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80;
const INITIAL_DAYS_RANGE = 30; // Solo 30 días antes y después

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
  selectedItem: 'bg-primary',
  todayItem: 'bg-prymary',
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
  const [isLoadingMore] = useState<boolean>(false);
  const flatListRef = useRef<FlatList<DateItem>>(null);
  const initialScrollDone = useRef<boolean>(false);
  const insets = useSafeAreaInsets(); // Usar insets de zona segura
  const { todaysMedications } = useMedicationContext();
  const { todaysSymptoms } = useSymptomContext();
  const { user } = useUser();

  // Estados para datos de otros días usando useApi
  const {
    data: medications,
    loading: loadingMedications,
    fetchData: fetchMedications,
  } = useApi<Medication[]>();

  const {
    data: symptoms,
    loading: loadingSymptoms,
    fetchData: fetchSymptoms,
  } = useApi<Symptom[]>();

  const MARGIN_BOTTOM = (Platform.OS === 'android' ? 70 : 60) + insets.bottom; // Ajuste para margen inferior

  // Refs para optimización de scroll
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Inicializar fechas solo 30 antes y 30 después
  useEffect(() => {
    const initialDates = generateInitialDates(INITIAL_DAYS_RANGE);
    setDates(initialDates);
  }, []);

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

  // Funciones utilitarias memoizadas
  const isSelected = useCallback(
    (date: Dayjs): boolean => {
      return date.isSame(selectedDate, 'day');
    },
    [selectedDate]
  );

  // Efecto para cargar datos según el día seleccionado
  useEffect(() => {
    const fetchAll = async () => {
      if (selectedDate.isSame(dayjs(), 'day')) return;
      if (!user?.dni) return;
      const dateStr = selectedDate.format('YYYY-MM-DD');
      await Promise.all([
        fetchMedications(`/api/medications/${user.patientId}?date=${dateStr}`, 'GET'),
        fetchSymptoms(
          `/api/symptom-diary/patient/${user.patientId}/date-range?startDate=${dateStr}&endDate=${dateStr}`,
          'GET'
        ),
      ]);
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, user]);

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
        } catch {
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

  // Usar componente separado para DateItem

  // Renderizador de fecha optimizado
  const renderDateItem: ListRenderItem<DateItem> = useCallback(
    ({ item }) => {
      const selected = isSelected(item.date);
      return (
        <DateItemComponent
          item={item}
          isSelected={selected}
          onPress={setSelectedDate}
          styles={styles}
        />
      );
    },
    [isSelected]
  );

  // Funciones de clave optimizadas
  const keyExtractor = useCallback((item: DateItem) => item.key, []);

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
    <ScrollView className="flex-1" style={{ marginBottom: MARGIN_BOTTOM }}>
      {/* Header con fecha seleccionada */}
      <View className="flex-row items-center justify-between border-b border-gray-300 bg-[#ededed] px-5 pb-5 pt-5">
        <View className="flex-1">
          <Text className="text-lg font-bold capitalize text-gray-800">{selectedDateText}</Text>
          <Text className="mt-0.5 text-sm text-gray-500">{dateInfo}</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="mx-1 h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            onPress={goToPrevWeek}
            activeOpacity={0.7}>
            <ChevronLeftIcon size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-1 rounded-full bg-primary px-4 py-2"
            onPress={goToToday}
            activeOpacity={0.8}>
            <Text className="text-sm font-semibold text-white">Hoy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-1 h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            onPress={goToNextWeek}
            activeOpacity={0.7}>
            <ChevronRightIcon size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendario horizontal mejorado */}
      <View className="relative border-b border-gray-300 bg-[#ededed] py-4">
        <FlatList
          ref={flatListRef}
          data={processedDates}
          renderItem={renderDateItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 10 }}
          getItemLayout={getItemLayout}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews
          updateCellsBatchingPeriod={50}
          disableIntervalMomentum
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          overScrollMode="never"
          bounces={false}
        />

        {/* Indicador de carga mejorado */}
        <LoadingIndicator isLoading={isLoadingMore} />
      </View>

      {/* Lista de eventos */}
      <View className="flex-1 p-5">
        {/** Calcular totales para el título */}
        {selectedDate.isSame(dayjs(), 'day') ? null : null}
        <Text className="mb-2 text-xl font-bold text-gray-800">
          Eventos del día{' '}
          {selectedDate.isSame(dayjs(), 'day')
            ? `(${todaysMedications.length + todaysSymptoms.length})`
            : `(${(Array.isArray(medications) ? medications.length : 0) + (Array.isArray(symptoms) ? symptoms.length : 0)})`}
        </Text>

        {/* Medicamentos primero */}
        {selectedDate.isSame(dayjs(), 'day') ? (
          <MedicationList medications={todaysMedications} scrollEnabled={false} />
        ) : loadingMedications ? (
          <LoadingIndicator isLoading />
        ) : (
          <MedicationList medications={medications ?? []} scrollEnabled={false} />
        )}

        {/* Síntomas después */}
        {selectedDate.isSame(dayjs(), 'day') ? (
          <SymptomList data={todaysSymptoms} scrollEnabled={false} />
        ) : loadingSymptoms ? (
          <LoadingIndicator isLoading />
        ) : (
          <SymptomList data={symptoms ?? []} scrollEnabled={false} />
        )}
      </View>
    </ScrollView>
  );
};

export default HorizontalCalendar;
