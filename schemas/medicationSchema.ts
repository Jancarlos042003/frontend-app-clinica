import { z } from "zod";

export const medicationSchema = z.object({
  nameMedicine: z
    .string()
    .min(1, 'El nombre de la medicina es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),

  doseValue: z
    .number({
      required_error: 'El valor de la dosis es requerido',
      invalid_type_error: 'Debe ser un número válido',
    })
    .positive('El valor debe ser mayor a 0')
    .max(10000, 'El valor no puede ser mayor a 10000'),

  doseUnit: z.string().min(1, 'La unidad de dosis es requerida'),

  frequency: z
    .number({
      required_error: 'La frecuencia es requerida',
      invalid_type_error: 'Debe ser un número válido',
    })
    .positive('La frecuencia debe ser mayor a 0')
    .max(168, 'La frecuencia no puede ser mayor a 168 horas (1 semana)'),

  period: z
    .number({
      required_error: 'El periodo es requerido',
      invalid_type_error: 'Debe ser un número válido',
    })
    .positive('El periodo debe ser mayor a 0')
    .max(365, 'El periodo no puede ser mayor a 365 días'),

  periodUnit: z.string().min(1, 'La unidad de periodo es requerida'),

  startDate: z
    .string()
    .min(1, 'La fecha de inicio es requerida')
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'Formato de fecha inválido'),

  startTime: z.string().min(1, 'La hora de inicio es requerida'),

  duration: z
    .number({
      required_error: 'La duración es requerida',
      invalid_type_error: 'Debe ser un número válido',
    })
    .positive('La duración debe ser mayor a 0')
    .max(365, 'La duración no puede ser mayor a 365'),

  durationUnit: z.string().min(1, 'La unidad de duración es requerida'),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;
