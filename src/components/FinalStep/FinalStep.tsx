"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import Link from "next/link";
import { nivelesActividad, objetivos } from "@/helper/finalStepValidation";
import { additionalInfoSchema } from "@/helper/finalStepValidation";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { defaultValues } from "@/helper/finalStepValidation";
import CircularInput from "@/components/CircularInput/CircularInput";
import WeekdayPicker from "../WeekDayPeeker/WeekDayPeeker";
import { Card } from "../ui/card";

type AdditionalInfoFormValues = z.infer<typeof additionalInfoSchema>;

const AdditionalInfoForm = () => {
  const [professorsList, setProfessorsList] = useState<{ nombre: string; horario: string[]; id: string; email: string; edad: number }[]>([]);
  const router = useRouter();

  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");

  const handleHorarioChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedHorario(e.target.value);
  };

  const selectedProfessor = professorsList.find(
    (profesor) => profesor.id === selectedProfessorId
  );

  const form = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues,
  });

  useEffect(() => {
    fetch("http://localhost:3001/profesor/profesores")
      .then((response) => response.json())
      .then((data) => {
        setProfessorsList(data);
        console.log("Profesores:", data);
      })
      .catch((error) => {
        console.error("Error fetching professors:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProfessor) {
      const profesor = professorsList.find(
        (p) => p.id === selectedProfessor.id
      );
      if (
        profesor &&
        Array.isArray(profesor.horario) &&
        profesor.horario.length > 0
      ) {
        const horarioString = profesor.horario[0];
        const [start, end] = horarioString
          .split(" a ")
          .map((time: string) => parseInt(time.split(":")[0]));
        const horasDisponibles = Array.from({ length: end - start }, (_, i) => {
          const hora = start + i;
          return `${hora.toString().padStart(2, "0")}:00 - ${(hora + 1)
            .toString()
            .padStart(2, "0")}:00`;
        });
      } else {
        console.error(
          `Profesor ${selectedProfessor} not found or horario is invalid`
        );
      }
    }
  }, [selectedProfessor, professorsList]);

  const onSubmit = async (
    values: AdditionalInfoFormValues & { plan: number }
  ) => {
    const userId = window.localStorage.getItem("userId");
    console.log("Values:", values);
    console.log(userId);
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo encontrar el ID del usuario",
      });
      return;
    }
  
    try {
      values.plan = values.diasSeleccionados.length;
      console.log("Values:", values);
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar la información del usuario");
      }
  
      const updatedUser = await response.json();
      console.log("Usuario actualizado:", updatedUser);
  
      if (values.metodoPago === "efectivo") {
        await Swal.fire({
          icon: "success",
          title: "¡Usuario confirmado!",
          text: "Recuerda coordinar el pago con el administrador",
        });
        router.push("/login");
      } else if (values.metodoPago === "mercadopago") {
        await Swal.fire({
          icon: "success",
          title: "¡Usuario confirmado!",
          text: "Serás redirigido a la página de pago",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        router.push("/pago");
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "La información se ha actualizado correctamente",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar la información",
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="w-full max-w-4xl p-4 bg-black border border-gray-800 rounded-lg shadow sm:p-6 md:p-8">
        <div className="mb-6 text-center">
          <h4 className="text-2xl font-bold text-red-600 mb-2">
            ¡Último paso!
          </h4>
          <p className="text-white text-sm">
            Estás a punto de desbloquear tu potencial. Completa estos detalles
            finales y prepárate para iniciar tu viaje hacia una mejor versión de
            ti mismo.
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((values) =>
              onSubmit({ ...values, plan: 1 })
            )}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="altura"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <div className="h-48 w-48">
                          <CircularInput
                            label="Altura (cm)"
                            maxValue={210}
                            onChange={(height) => {
                              form.setValue("altura", height);
                            }}
                            value={form.watch("altura") as number}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="peso"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <div className="h-48 w-48">
                          <CircularInput
                            label="Peso (kg)"
                            maxValue={200}
                            onChange={(weight) => {
                              form.setValue("peso", weight);
                            }}
                            value={form.watch("peso") as number}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="diasSeleccionados"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Selecciona los dias de tu plan
                    </FormLabel>
                    <FormControl>
                      <WeekdayPicker
                        onchange={(days) => {
                          form.setValue("diasSeleccionados", days);
                          console.log("Dias seleccionados:", days);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profesor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Elegir profesor
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedProfessorId(e.target.value);
                        }}
                      >
                        <option value="">Selecciona un profesor</option>
                        {professorsList.map((profesor) => (
                          <option key={profesor.id} value={profesor.id}>
                            {profesor.nombre}
                          </option>
                        ))}
                      </select>
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
                      Seleccionar cupo disponible
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        disabled={!selectedProfessorId}
                      >
                        <option value="">Selecciona un horario</option>
                        {selectedProfessor?.horario.map((horario) => (
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
              <FormField
                control={form.control}
                name="objetivo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Objetivo
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                      >
                        <option value="">Selecciona un objetivo</option>
                        {objetivos.map((objetivo) => (
                          <option key={objetivo.value} value={objetivo.value}>
                            {objetivo.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nivelActividad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Nivel de actividad física
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                      >
                        <option value="">Selecciona un nivel</option>
                        {nivelesActividad.map((nivel) => (
                          <option key={nivel.value} value={nivel.value}>
                            {nivel.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metodoPago"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Método de pago
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                      >
                        <option value="">Selecciona un método de pago</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="mercadopago">MercadoPago</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Link
                href="/previous-step"
                className="text-red-500 hover:text-red-700"
              >
                Volver
              </Link>
              <button
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Confirmar
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;