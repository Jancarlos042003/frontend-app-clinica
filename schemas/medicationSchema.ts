import { z } from 'zod';

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
    .max(10000, 'El valor no puede ser mayor a 10000')
    .optional()
    .refine((value) => value === undefined || value > 0, {
      message: 'El valor debe ser mayor a 0',
    }),

  doseUnit: z.string().min(1, 'La unidad de dosis es requerida'),

  frequency: z
    .number({
      required_error: 'La frecuencia es requerida',
      invalid_type_error: 'Debe ser un número válido',
    })
    .positive('La frecuencia debe ser mayor a 0')
    .max(168, 'La frecuencia no puede ser mayor a 168 horas (1 semana)')
    .optional()
    .refine((value) => value === undefined || value > 0, {
      message: 'La frecuencia debe ser mayor a 0',
    }),

  period: z
    .number({
      required_error: 'El periodo es requerido',
      invalid_type_error: 'Debe ser un número válido',
    })
    .positive('El periodo debe ser mayor a 0')
    .max(365, 'El periodo no puede ser mayor a 365 días')
    .optional()
    .refine((value) => value === undefined || value > 0, {
      message: 'El periodo debe ser mayor a 0',
    }),

  periodUnit: z.string().min(1, 'La unidad de periodo es requerida'),

  // Recibimos strings ISO y convertirmos automáticamente a Date
  startDate: z.coerce.date({
    required_error: 'La fecha de inicio es requerida',
    invalid_type_error: 'Formato de fecha inválido',
  }),

  startTime: z.coerce.date({
    required_error: 'La hora de inicio es requerida',
    invalid_type_error: 'Formato de hora inválido',
  }),

  duration: z
    .number({
      required_error: 'La duración es requerida',
      invalid_type_error: 'Debe ser un número válido',
    })
    .positive('La duración debe ser mayor a 0')
    .max(365, 'La duración no puede ser mayor a 365'),

  durationUnit: z.string().min(1, 'La unidad de duración es requerida'),
  hasCustomTimes: z.boolean(),
  customTimes: z.array(z.string()),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;
