import { Medication } from '~/types/medication';

/**
 * Convierte la fecha y hora del medicamento en un objeto Date
 */
export const getMedicationDateTime = (medication: Medication): Date => {
  return new Date(`${medication.date}T${medication.timeOfTaking}:00`);
};

/**
 * Verifica si el medicamento es para el día actual
 */
export const isMedicationForToday = (medication: Medication): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return medication.date === today;
};

/**
 * Verifica si ya llegó la hora del medicamento
 */
export const hasTimeArrived = (medication: Medication): boolean => {
  const medicationDateTime = getMedicationDateTime(medication);
  const now = new Date();
  return now >= medicationDateTime;
};

/**
 * Verifica si estamos dentro de la ventana de tolerancia
 */
export const isWithinToleranceWindow = (
  medication: Medication,
  toleranceMinutes: number
): boolean => {
  const medicationDateTime = getMedicationDateTime(medication);
  const now = new Date();

  // Calcular ventana: [medicationTime, medicationTime + tolerance]
  const windowStart = medicationDateTime;
  const windowEnd = new Date(medicationDateTime.getTime() + toleranceMinutes * 60 * 1000);

  return now >= windowStart && now <= windowEnd;
};

/**
 * Verifica si el medicamento está tardío (fuera de la ventana de tolerancia)
 */
export const isLate = (medication: Medication, toleranceMinutes: number): boolean => {
  const medicationDateTime = getMedicationDateTime(medication);
  const now = new Date();
  const windowEnd = new Date(medicationDateTime.getTime() + toleranceMinutes * 60 * 1000);

  return now > windowEnd;
};

/**
 * Calcula los minutos restantes hasta la hora del medicamento
 */
export const getMinutesUntil = (medication: Medication): number => {
  const medicationDateTime = getMedicationDateTime(medication);
  const now = new Date();
  const diffMs = medicationDateTime.getTime() - now.getTime();

  return Math.ceil(diffMs / (1000 * 60));
};

/**
 * Calcula los minutos de retraso
 */
export const getMinutesLate = (medication: Medication): number => {
  const medicationDateTime = getMedicationDateTime(medication);
  const now = new Date();
  const diffMs = now.getTime() - medicationDateTime.getTime();

  return Math.floor(diffMs / (1000 * 60));
};

/**
 * Obtiene el estado completo del tiempo del medicamento
 */
export const getTimeStatus = (medication: Medication, toleranceMinutes: number) => {
  const isToday = isMedicationForToday(medication);
  const hasArrived = hasTimeArrived(medication);
  const withinTolerance = isWithinToleranceWindow(medication, toleranceMinutes);
  const isLateStatus = isLate(medication, toleranceMinutes);
  const minutesUntil = getMinutesUntil(medication);
  const minutesLate = getMinutesLate(medication);

  return {
    isToday,
    hasArrived,
    withinTolerance,
    isLate: isLateStatus,
    minutesUntil: hasArrived ? 0 : minutesUntil,
    minutesLate: isLateStatus ? minutesLate : 0,
  };
};
