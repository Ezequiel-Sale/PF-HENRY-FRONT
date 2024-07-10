import { z } from "zod";

export const additionalInfoSchema = z.object({
  altura: z.number().min(20, "La altura debe ser mayor a 20 cm"),
  peso: z.number().min(30, "El peso debe ser mayor a 30"),
  diasSeleccionados: z
    .array(z.string())
    .refine(
      (dias) => dias.length === 2 || dias.length === 3 || dias.length === 5,
      {
        message: "Selecciona 2, 3 o 5 días",
      }
    ),
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

export const metodosPago = [
  { label: "Efectivo", value: "efectivo" },
  { label: "MercadoPago", value: "mercadopago" },
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