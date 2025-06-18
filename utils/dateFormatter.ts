import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Formatear fecha
export const formatDate = (date: Date): string => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: es });
};

// Formatear hora
export const formatTime = (date: Date): string => {
  return format(date, 'hh:mm a', { locale: es });
};

// Formatear fecha y hora
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} a las ${formatTime(date)}`;
};