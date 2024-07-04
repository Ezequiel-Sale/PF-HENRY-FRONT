import { z } from "zod";

export const additionalInfoSchema = z.object({
  altura: z.number().min(100, "La altura debe ser al menos 100 cm").max(250, "La altura no puede superar los 250 cm"),
  peso: z.number().min(30, "El peso debe ser al menos 30 kg").max(250, "El peso no puede superar los 250 kg"),
  plan: z.enum(["2", "3", "5"], {
    required_error: "Por favor, selecciona un plan",
  }),
  dias: z.array(z.enum(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]))
    .min(1, "Por favor, selecciona al menos un día")
    .refine((dias) => {
      const planToNumber = { "2": 2, "3": 3, "5": 5 };
      const form: { getValues: (key: string) => string } = { getValues: (key: string) => "" }; // Replace {} with the actual type of 'form' and provide an implementation for 'getValues'
      return dias.length === planToNumber[form.getValues("plan") as keyof typeof planToNumber];
    }, {
      message: "El número de días seleccionados debe coincidir con el plan elegido",
    }),
  profesor: z.string().min(1, "Por favor, selecciona un profesor"),
  horario: z.string().min(1, "Por favor, selecciona un horario"),
  objetivo: z.enum(["Salud", "Deporte", "Estética"], {
    required_error: "Por favor, selecciona tu meta principal",
  }),
  nivelActividad: z.enum(["Sedentario", "Ligeramente activo", "Moderadamente activo", "Muy activo", "Extremadamente activo"], {
    required_error: "Por favor, selecciona tu nivel de actividad",
  }),
});