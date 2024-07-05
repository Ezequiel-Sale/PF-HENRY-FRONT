import { z } from "zod";

export const additionalInfoSchema = z.object({
  altura: z.number().min(1, "La altura debe ser mayor a 0"),
  peso: z.number().min(1, "El peso debe ser mayor a 0"),
  plan: z.string().nonempty("Selecciona un plan"),
  diasSeleccionados: z.array(z.string().nonempty("Selecciona al menos un día")),
  horario: z.string().nonempty("Selecciona un horario"),
  nivelActividad: z.string().optional(),
  objetivo: z.string().nonempty("Selecciona un objetivo"),
  profesor: z.string().nonempty("Selecciona un profesor"),
});

export const diasSemana = [
  { label: "Lunes", value: "Lunes" },
  { label: "Martes", value: "Martes" },
  { label: "Miércoles", value: "Miércoles" },
  { label: "Jueves", value: "Jueves" },
  { label: "Viernes", value: "Viernes" },
];

export const nivelesActividad = [
  { label: "Sedentario", value: "Sedentario" },
  { label: "Ligero", value: "Ligero" },
  { label: "Moderado", value: "Moderado" },
  { label: "Activo", value: "Activo" },
  { label: "Muy Activo", value: "Muy Activo" },
];

export const objetivos = [
  { label: "Estético", value: "Estético" },
  { label: "Deportivo", value: "Deportivo"},
  { label: "Salud", value: "Salud" },
];

export const planes = [
  { label: "2 veces por semana", value: "2", id:"" },
  { label: "3 veces por semana", value: "3", id: "54015bef-8fda-4099-a89e-55a401919fcb" },
  { label: "5 veces por semana", value: "5" },
];

