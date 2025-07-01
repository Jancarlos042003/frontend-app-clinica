// utils.ts - Utilidades y funciones helper del calendario
import dayjs, { Dayjs } from 'dayjs';

import { CALENDAR_CONFIG, EVENTS_DATA } from '../../constants/constants';
import { DateFormat, Event } from '../../types/types';

// ✅ MEJORA: Funciones utilitarias movidas fuera del componente
// y optimizadas para evitar recreación en cada render

// ✅ MEJORA: Cache de la fecha actual para evitar múltiples llamadas a dayjs()
let cachedToday: Dayjs | null = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 60000; // 1 minuto

export const getTodayInstance = (): Dayjs => {
  const now = Date.now();
  if (!cachedToday || now - lastCacheUpdate > CACHE_DURATION) {
    cachedToday = dayjs();
    lastCacheUpdate = now;
  }
  return cachedToday;
};

// Generar fechas iniciales
export const generateInitialDates = (): Dayjs[] => {
  const dates: Dayjs[] = [];
  const today = getTodayInstance();

  for (let i = -CALENDAR_CONFIG.INITIAL_DAYS_RANGE; i <= CALENDAR_CONFIG.INITIAL_DAYS_RANGE; i++) {
    dates.push(today.add(i, 'day'));
  }
  return dates;
};

// Agregar fechas al principio (pasado)
export const addDatesAtBeginning = (currentDates: Dayjs[], daysToAdd: number): Dayjs[] => {
  const newDates: Dayjs[] = [];
  const firstDate = currentDates[0];

  for (let i = daysToAdd; i >= 1; i--) {
    newDates.push(firstDate.subtract(i, 'day'));
  }

  return [...newDates, ...currentDates];
};

// Agregar fechas al final (futuro)
export const addDatesAtEnd = (currentDates: Dayjs[], daysToAdd: number): Dayjs[] => {
  const newDates: Dayjs[] = [];
  const lastDate = currentDates[currentDates.length - 1];

  for (let i = 1; i <= daysToAdd; i++) {
    newDates.push(lastDate.add(i, 'day'));
  }

  return [...currentDates, ...newDates];
};

// ✅ MEJORA: Función de formateo optimizada
export const formatDate = (date: Dayjs): DateFormat => {
  return {
    dayName: date.format('ddd'),
    dayNumber: date.format('D'),
    month: date.format('MMM'),
    fullDate: date.format('YYYY-MM-DD'),
  };
};

// ✅ MEJORA: Funciones de verificación optimizadas usando instancia cacheada
export const isToday = (date: Dayjs): boolean => {
  return date.isSame(getTodayInstance(), 'day');
};

export const isSelected = (date: Dayjs, selectedDate: Dayjs): boolean => {
  return date.isSame(selectedDate, 'day');
};

export const isWeekend = (date: Dayjs): boolean => {
  const dayOfWeek = date.day();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

// Obtener eventos para una fecha específica
export const getEventsForDate = (date: Dayjs): Event[] => {
  const dateKey = date.format('YYYY-MM-DD');
  return EVENTS_DATA[dateKey] || [];
};

// ✅ MEJORA: Función optimizada para información de fecha
export const getDateInfo = (date: Dayjs): string => {
  const today = getTodayInstance();
  const diffDays = date.diff(today, 'day');

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Mañana';
  if (diffDays === -1) return 'Ayer';
  if (diffDays > 0) return `En ${diffDays} días`;
  return `Hace ${Math.abs(diffDays)} días`;
};

// ✅ MEJORA: Función optimizada para generar clases CSS
export const getDateItemStyles = (
  isSelectedDate: boolean,
  isTodayDate: boolean,
  isWeekendDate: boolean
): string => {
  const baseClass = 'mx-1 w-20 items-center justify-center rounded-2xl py-4';

  if (isSelectedDate) {
    return `${baseClass} bg-blue-500`;
  }

  if (isTodayDate) {
    return `${baseClass} bg-blue-50`;
  }

  if (isWeekendDate) {
    return `${baseClass} bg-orange-50`;
  }

  return `${baseClass} bg-transparent`;
};

export const getTextStyles = (
  isSelectedDate: boolean,
  isTodayDate: boolean,
  isWeekendDate: boolean,
  textType: 'dayName' | 'dayNumber' | 'month'
): string => {
  if (isSelectedDate) {
    const sizeClass =
      textType === 'dayNumber'
        ? 'text-lg font-bold'
        : textType === 'dayName'
          ? 'text-xs'
          : 'text-xs';
    return `${sizeClass} text-white capitalize`;
  }

  if (isTodayDate) {
    const sizeClass =
      textType === 'dayNumber'
        ? 'text-lg font-bold'
        : textType === 'dayName'
          ? 'text-xs'
          : 'text-xs';
    return `${sizeClass} font-semibold text-blue-500 capitalize`;
  }

  if (isWeekendDate) {
    const sizeClass =
      textType === 'dayNumber'
        ? 'text-lg font-bold'
        : textType === 'dayName'
          ? 'text-xs'
          : 'text-xs';
    return `${sizeClass} text-orange-600 capitalize`;
  }

  // Default styles
  const baseColors = {
    dayName: 'text-gray-500',
    dayNumber: 'text-gray-800',
    month: 'text-gray-400',
  };

  const sizeClass = textType === 'dayNumber' ? 'text-lg font-bold' : 'text-xs';
  return `${sizeClass} ${baseColors[textType]} capitalize`;
};
