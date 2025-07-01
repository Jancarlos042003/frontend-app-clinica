import { z } from 'zod';
import { normalizeDate } from '../utils/normalizeDate';

// Fecha límite: primer día del año 2000
const MIN_DATE = new Date('2000-01-01');

export const symptomSchema = z.object({
  symptom: z
    .string({
      required_error: 'El síntoma es requerido',
      invalid_type_error: 'Debe ser un síntoma válido',
    })
    .min(1, { message: 'El síntoma no puede estar vacío' }),
  intensity: z.enum(['Leve', 'Moderada', 'Severa'], {
    required_error: 'La intensidad es requerida',
    invalid_type_error: 'Debe ser una intensidad válida',
  }),
  date: z
    .string({
      required_error: 'La fecha es requerida',
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Debe ser una fecha válida',
    })
    .refine((date) => normalizeDate(new Date(date)) >= normalizeDate(MIN_DATE), {
      message: 'La fecha no puede ser anterior al 1 de enero del 2000',
    })
    .refine((date) => normalizeDate(new Date(date)) <= normalizeDate(new Date()), {
      message: 'La fecha no puede ser futura',
    }),
  time: z.string({
    required_error: 'La hora es requerida',
    invalid_type_error: 'Debe ser una hora válida',
  }),
  duration: z.enum(['59', '180', '1440', '-1'], {
    required_error: 'La duración es requerida',
    invalid_type_error: 'Debe ser una duración válida',
  }),
  notes: z
    .string()
    .max(500, { message: 'Las notas no pueden exceder los 500 caracteres' })
    .optional(),
});

export type SymptomSchema = z.infer<typeof symptomSchema>;

export type SymptomStatus = 'Leve' | 'Moderada' | 'Severa';
