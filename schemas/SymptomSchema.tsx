import { z } from "zod";
import { useUser } from "hooks/useUser";

const { user } = useUser();
const birthDate = user?.birthDate || new Date("2000-01-01"); // Valor por defecto si no hay fecha de nacimiento

export const SymptomSchema = z.object({
    symptom: z.string({
        required_error: "El síntoma es requerido",
        invalid_type_error: "Debe ser un síntoma válido",
    }).min(1, { message: "El síntoma no puede estar vacío" }),
    intensity: z.enum(["255604002", "6736007", "24484000"], {
        required_error: "La intensidad es requerida",
        invalid_type_error: "Debe ser una intensidad válida",
    }),
    date: z.date({
        required_error: "La fecha es requerida",
        invalid_type_error: "Debe ser una fecha válida",
    }).refine((date) => {
        // Verificamos que la fecha este entre la fecha de nacimiento y la fecha actual
        return date >= birthDate && date <= new Date();
    }, { message: "No puede ser una fecha anterior a la fecha de nacimiento o futura" }),
    time: z.date({
        required_error: "La hora es requerida",
        invalid_type_error: "Debe ser una hora válida",
    }),
    duration: z.enum(['59', '180', '1440', '-1'], {
        required_error: "La duración es requerida",
        invalid_type_error: "Debe ser una duración válida",
    }),
    notes: z.string().optional(),
});

export type SymptomSchemaType = z.infer<typeof SymptomSchema>;