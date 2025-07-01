import { z } from 'zod';

// Esquema para máximo de intentos
export const MaxReminderAttemptsSchema = z
  .string()
  .nonempty('El número de intentos no puede estar vacío')
  .refine((val) => !isNaN(Number(val)), {
    message: 'Debe ingresar un número válido',
  })
  .refine(
    (val) => {
      const num = Number(val);
      return num >= 1 && num <= 5;
    },
    {
      message: 'El número debe estar entre 1 y 5',
    }
  );

export interface MedicationSettingsDTO {
  toleranceWindowMinutes: number;
  reminderFrequencyMinutes: number;
  maxReminderAttempts: number;
}

export const AttemptsSchema = z.object({
  maxAttempts: z
    .string()
    .nonempty('El número de intentos no puede estar vacío')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Debe ingresar un número válido',
    })
    .refine(
      (val) => {
        const num = Number(val);
        return num >= 1 && num <= 5;
      },
      {
        message: 'El número debe estar entre 1 y 5',
      }
    ),
});

export type AttemptsType = z.infer<typeof AttemptsSchema>;

// Esquema para frecuencia de recordatorio
export const ReminderFrequencySchema = z
  .string()
  .nonempty('La frecuencia de recordatorio no puede estar vacía')
  .refine((val) => !isNaN(Number(val)), {
    message: 'Debe ingresar un número válido',
  })
  .refine(
    (val) => {
      const num = Number(val);
      return num >= 1;
    },
    {
      message: 'La frecuencia debe ser al menos 1 minuto',
    }
  );

// Esquema para ventana de tolerancia
export const ToleranceWindowSchema = z
  .string()
  .nonempty('La ventana de tolerancia no puede estar vacía')
  .refine((val) => !isNaN(Number(val)), {
    message: 'Debe ingresar un número válido',
  })
  .refine(
    (val) => {
      const num = Number(val);
      return num >= 10 && num <= 60;
    },
    {
      message: 'La ventana de tolerancia debe estar entre 10 y 60 minutos',
    }
  );

export const UserSettingsSchema = z.object({
  medicationSettings: z
    .object({
      maxReminderAttempts: MaxReminderAttemptsSchema,
      reminderFrequencyMinutes: ReminderFrequencySchema,
      toleranceWindowMinutes: ToleranceWindowSchema,
    })
    .refine(
      (data) => {
        // Convertir a número para comparar
        const freq = Number(data.reminderFrequencyMinutes);
        const tol = Number(data.toleranceWindowMinutes);
        return freq < tol;
      },
      {
        message: 'La frecuencia de recordatorio debe ser menor que la ventana de tolerancia',
        path: ['reminderFrequencyMinutes'],
      }
    ),
  emergencyContacts: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1, 'El nombre es obligatorio'),
      phone: z.string().min(1, 'El teléfono es obligatorio'),
      relationship: z.string().min(1, 'La relación es obligatoria'),
    })
  ),
});

export type UserSettingsType = z.infer<typeof UserSettingsSchema>;
