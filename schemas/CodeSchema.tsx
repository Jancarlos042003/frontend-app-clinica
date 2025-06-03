import { z } from 'zod';

export const codeSchema = z.object({
  code: z
    .string()
    .min(6, 'El código debe tener 6 dígitos')
    .max(6, 'El código debe tener 6 dígitos')
    .regex(/^[0-9]{6}$/, 'El código debe contener solo números'),
});

export type CodeSchema = z.infer<typeof codeSchema>;
