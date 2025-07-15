import { z } from 'zod';

export const emergencyContactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio.'), // Nombre obligatorio
  phoneNumber: z
    .string()
    .min(1, 'El teléfono es obligatorio.')
    .regex(/^9\d{8}$/, 'El teléfono debe tener 9 dígitos y empezar con 9.'), // Validación para que el teléfono empiece con 9 y tenga 9 dígitos
  relationship: z.string().optional(), // La relación es opcional
});

export type EmergencyContact = z.infer<typeof emergencyContactSchema>;
