// Función para comparar solo la fecha sin la hora
export const normalizeDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
