import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { additionalInfoSchema } from "@/helper/finalStepValidation";

type AdditionalInfoFormValues = z.infer<typeof additionalInfoSchema>;

const AdditionalInfoForm = () => {
  const form = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      altura: undefined,
      peso: undefined,
      horario: "",
      nivelActividad: undefined,
      objetivo: undefined,
    },
  });

  const onSubmit = (values: AdditionalInfoFormValues) => {
    console.log(values);
    // Manejar acá el envío del formulario con el back
  };

  const horarios = Array.from({ length: 17 }, (_, i) => {
    const hora = i + 8;
    return `${hora.toString().padStart(2, "0")}:00 - ${(hora + 1)
      .toString()
      .padStart(2, "0")}:00`;
  });

  const horariosProfesor = [
    "Fernando Gómez - 08:00 a 12:00",
    "María González - 12:00 a 16:00",
    "Cristian Aguirre - 16:00 a 00:00"
  ];

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="w-full max-w-4xl p-4 bg-black border border-gray-800 rounded-lg shadow sm:p-6 md:p-8">
        <div className="mb-6 text-center">
          <h4 className="text-2xl font-bold text-red-600 mb-2">¡Último paso!</h4>
          <p className="text-white text-sm">
            Estás a punto de desbloquear tu potencial. Completa estos detalles finales y prepárate para iniciar tu viaje hacia una mejor versión de ti mismo.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="altura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Altura (cm)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="peso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Peso (kg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="horario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Horario preferido
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        required
                      >
                        <option value="">Selecciona tu horario ideal</option>
                        {horarios.map((horario) => (
                          <option key={horario} value={horario}>
                            {horario}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className="block mb-2 text-sm font-medium text-white">
                  Ver horarios de profesores
                </FormLabel>
                <select
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  onChange={(e) => e.preventDefault()}
                >
                  <option value="">Horarios de profesores</option>
                  {horariosProfesor.map((horario) => (
                    <option key={horario} value={horario} disabled>
                      {horario}
                    </option>
                  ))}
                </select>
              </FormItem>
              <FormField
                control={form.control}
                name="nivelActividad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Nivel de actividad
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        required
                      >
                        <option value="">Elige tu nivel de actividad</option>
                        <option value="Sedentario">Sedentario (poco o ningún ejercicio)</option>
                        <option value="Ligeramente activo">Ligeramente activo (ejercicio ligero 1-3 días/semana)</option>
                        <option value="Moderadamente activo">Moderadamente activo (ejercicio moderado 3-5 días/semana)</option>
                        <option value="Muy activo">Muy activo (ejercicio intenso 6-7 días/semana)</option>
                        <option value="Extremadamente activo">Extremadamente activo (ejercicio muy intenso diario, o trabajo físico)</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="objetivo"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel className="text-sm font-medium text-white">
                          Tu meta principal
                        </FormLabel>
                        <Link href="/services" target="_blank" className="text-xs text-red-500 hover:text-red-400">
                          ¿Tenés dudas? Más info acá
                        </Link>
                      </div>
                      <FormControl>
                        <select
                          {...field}
                          className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                          required
                        >
                          <option value="">Elige tu objetivo</option>
                          <option value="Salud">Salud general</option>
                          <option value="Deporte">Rendimiento deportivo</option>
                          <option value="Estética">Transformación física</option>
                        </select>
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out transform hover:scale-105"
            >
              ¡Comenzar mi transformación!
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;