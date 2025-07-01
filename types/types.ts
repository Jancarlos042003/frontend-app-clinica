import { Dayjs } from 'dayjs';

export interface Event {
  id: number;
  title: string;
  time: string;
}

export interface EventsData {
  [key: string]: Event[];
}

export interface DateFormat {
  dayName: string;
  dayNumber: string;
  month: string;
  fullDate: string;
}

export interface CalendarConfig {
  ITEM_WIDTH: number;
  INITIAL_DAYS_RANGE: number;
  LOAD_MORE_THRESHOLD: number;
  DAYS_TO_ADD: number;
  SCROLL_THROTTLE: number; // ✅ MEJORA: Configuración centralizada
}

export interface DateItemProps {
  date: Dayjs;
  selectedDate: Dayjs;
  onDateSelect: (date: Dayjs) => void;
}

export interface EventItemProps {
  event: Event;
}

export interface CalendarHeaderProps {
  selectedDate: Dayjs;
  onGoToToday: () => void;
  onGoToPrevWeek: () => void;
  onGoToNextWeek: () => void;
}
