import { useMemo } from 'react';
import { z } from 'zod';

import { useUser } from './useUser';
import { normalizeDate } from '../utils/normalizeDate';

export const useSymptomSchema = () => {
  const { user } = useUser();

  return useMemo(() => {
    // const birthDate = user?.birthDate || new Date('1900-01-01');
    const birthDate = new Date('1990-05-15');
    const today = new Date();

    return z.object({
      symptom: z
        .string({
          required_error: 'El síntoma es requerido',
          invalid_type_error: 'Debe ser un síntoma válido',
        })
        .min(1, { message: 'El síntoma no puede estar vacío' }),
      intensity: z.enum(['255604002', '6736007', '24484000'], {
        required_error: 'La intensidad es requerida',
        invalid_type_error: 'Debe ser una intensidad válida',
      }),
      date: z
        .date({
          required_error: 'La fecha es requerida',
          invalid_type_error: 'Debe ser una fecha válida',
        })
        .refine((date) => normalizeDate(date) >= normalizeDate(birthDate), {
          message: 'La fecha no puede ser anterior a tu fecha de nacimiento',
        })
        .refine((date) => normalizeDate(date) <= normalizeDate(today), {
          message: 'La fecha no puede ser futura',
        }),
      time: z.date({
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
  }, [user?.birthDate]);
};

export type SymptomSchema = z.infer<ReturnType<typeof useSymptomSchema>>;
