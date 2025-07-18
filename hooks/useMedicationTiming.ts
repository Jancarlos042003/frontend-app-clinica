import { useMemo, useState, useEffect } from 'react';

import { useMedicationSettings } from '~/context/MedicationSettingsContext';
import { Medication } from '~/types/medication';
import { getTimeStatus } from '~/utils/medicationTiming';

export const useMedicationTiming = (medication: Medication) => {
  const { toleranceWindowMinutes } = useMedicationSettings();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar tiempo cada minuto para mantener la UI sincronizada
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, []);

  const timeStatus = useMemo(() => {
    return getTimeStatus(medication, toleranceWindowMinutes);
  }, [medication, toleranceWindowMinutes, currentTime]);

  const shouldShowCheckbox = useMemo(() => {
    // Verificar estados de medicamento
    const isNotTaken = medication.status === 'NOT_TAKEN' || medication.status === 'No tomado';
    const isCompleted = medication.status === 'COMPLETED' || medication.status === 'Completado';
    const validStatus = !isNotTaken && !isCompleted;

    // El checkbox aparece solo si:
    // 1. El estado es válido (no es NOT_TAKEN ni COMPLETED)
    // 2. Es para hoy
    // 3. Ya llegó la hora
    // 4. Está dentro de la ventana de tolerancia
    return validStatus && timeStatus.isToday && timeStatus.hasArrived && timeStatus.withinTolerance;
  }, [medication.status, timeStatus]);

  const getStatusMessage = useMemo(() => {
    const formatTime = (minutes: number) => {
      if (minutes < 60) {
        return `${minutes} min`;
      }
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}h`;
      }
      return `${hours}h ${remainingMinutes}min`;
    };

    if (!timeStatus.isToday) return null;
    if (!timeStatus.hasArrived) return `Faltan ${formatTime(timeStatus.minutesUntil)}`;
    if (timeStatus.isLate) return `Tardío por ${formatTime(timeStatus.minutesLate)}`;
    if (timeStatus.withinTolerance) return 'Listo para tomar';
    return null;
  }, [timeStatus]);

  return {
    shouldShowCheckbox,
    timeStatus,
    statusMessage: getStatusMessage,
    toleranceWindowMinutes,
  };
};
