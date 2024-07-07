import { z } from "zod";

export const additionalInfoSchema = z.object({
  altura: z.number().min(20, "La altura debe ser mayor a 20 cm"),
  peso: z.number().min(30, "El peso debe ser mayor a 30"),
  diasSeleccionados: z
    .array(z.string())
    .min(1, "Selecciona al menos un día")
    .max(5, "Selecciona máximo 5 días"),
  horario: z.string().nonempty("Selecciona un horario"),
  nivelActividad: z.string().optional(),
  objetivo: z.string().nonempty("Selecciona un objetivo"),
  profesor: z.string().nonempty("Selecciona un profesor"),
});

export const diasSemana = [
  { label: "Lunes", value: "Lunes" },
  { label: "Martes", value: "Martes" },
  { label: "Miercoles", value: "Miercoles" },
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
  { label: "Deportivo", value: "Deportivo" },
  { label: "Salud", value: "Salud" },
];

export const planes = [
  { label: "2 veces por semana", value: "2", id: "" },
  {
    label: "3 veces por semana",
    value: "3",
    id: "54015bef-8fda-4099-a89e-55a401919fcb",
  },
  { label: "5 veces por semana", value: "5" },
];

export const defaultValues = {
  altura: 20,
  peso: 50,
  diasSeleccionados: [],
  horario: "",
  nivelActividad: undefined,
  objetivo: undefined,
  profesor: "",
};
