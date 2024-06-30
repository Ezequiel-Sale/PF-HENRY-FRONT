"use client";

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Formato de email inválido",
  }),
  password: z
    .string()
    .min(6, {
      message: "La contraseña debe tener  mínimo 8 caracteres",
    })
    .max(100, {
      message: "La contraseña debe tener máximo 100 caracteres",
    }),
});
