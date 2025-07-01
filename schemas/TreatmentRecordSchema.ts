import { z } from 'zod';

export const TreatmentRecordStatusEnum = z.enum(['activo', 'completado', 'cancelado']);
export type TreatmentRecordStatus = z.infer<typeof TreatmentRecordStatusEnum>;

export const TreatmentRecordSchema = z.object({
  id: z.number(),
  nameMedicine: z.string(),
  dose: z.string(),
  frequency: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.string(),
  status: TreatmentRecordStatusEnum,
  progress: z.number().min(0).max(100),
});

export type TreatmentRecord = z.infer<typeof TreatmentRecordSchema>;
