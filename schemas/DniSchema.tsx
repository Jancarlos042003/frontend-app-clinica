import { z } from 'zod';

export const dniSchema = z.object({
  dni: z
    .string()
    .min(8, 'El DNI debe tener 8 dígitos')
    .max(8, 'El DNI debe tener 8 dígitos')
    .regex(/^[0-9]{8}$/, 'El DNI debe contener solo números'),
});

export type DniSchema = z.infer<typeof dniSchema>;
