import { Dimensions, Platform } from 'react-native';

import { CalendarConfig, EventsData } from '../types/types';

const { width } = Dimensions.get('window');

// ✅ MEJORA: Configuración centralizada y constantes optimizadas
export const CALENDAR_CONFIG: CalendarConfig = {
  ITEM_WIDTH: 80,
  INITIAL_DAYS_RANGE: 30,
  LOAD_MORE_THRESHOLD: 10,
  DAYS_TO_ADD: 30,
  SCROLL_THROTTLE: 32, // ✅ MEJORA: Aumentado de 16 a 32 para mejor rendimiento
};

// ✅ MEJORA: Datos movidos fuera del componente para evitar recreación
export const EVENTS_DATA: EventsData = {
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
};

// ✅ MEJORA: Configuración de FlatList optimizada
export const FLATLIST_CONFIG = {
  initialNumToRender: 30,
  maxToRenderPerBatch: 15, // ✅ MEJORA: Aumentado para mejor rendimiento
  windowSize: 10,
  removeClippedSubviews: true,
  getItemLayout: (data: any, index: number) => ({
    length: CALENDAR_CONFIG.ITEM_WIDTH,
    offset: CALENDAR_CONFIG.ITEM_WIDTH * index,
    index,
  }),
};

export type StateSymptom = 'Leve' | 'Moderada' | 'Severa';
