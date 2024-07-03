import { z } from "zod";

export const additionalInfoSchema = z.object({
    altura: z.number().min(100, "La altura debe ser al menos 100 cm").max(250, "La altura no puede superar los 250 cm"),
    peso: z.number().min(30, "El peso debe ser al menos 30 kg").max(250, "El peso no puede superar los 250 kg"),
    horario: z.string().min(1, "Por favor, selecciona un horario"),
    nivelActividad: z.enum(["Sedentario", "Ligeramente activo", "Moderadamente activo", "Muy activo", "Extremadamente activo"], {
      required_error: "Por favor, selecciona tu nivel de actividad",
    }),
    objetivo: z.enum(["Salud", "Deporte", "Estética"], {
      required_error: "Por favor, selecciona tu meta principal",
    }),
  });