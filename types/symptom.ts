import { SymptomStatus } from '~/schemas/SymptomSchema';

export type Symptom = {
  id: string;
  date: string;
  symptom: string;
  intensity: SymptomStatus;
  notes: string | null;
};
