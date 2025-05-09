import { z } from 'zod';

export const loginSchema = z.object({
  dni: z
    .string()
    .length(8, 'El DNI debe tener 8 dígitos')
    .regex(/^\d+$/, 'El DNI debe contener solo números'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
