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
import { getHorariosCupos } from "@/services/cupos";
import { ICupos, IHorariosProfesor } from "@/types/FinalStepInterfaces";
import { getProfessors } from "@/services/professor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

type AdditionalInfoFormValues = z.infer<typeof additionalInfoSchema>;

const AdditionalInfoForm = () => {
  const [selectedHorario, setSelectedHorario] = useState("");
  const [professorsList, setProfessorsList] = useState<ICupos[]>([]);
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [horariosProfesor, setHorariosProfesor] = useState<IHorariosProfesor[]>(
    []
  );

  const router = useRouter();
  const form = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues,
  });

  const handleHorarioChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedHorario(e.target.value);
  };

  const selectedProfessor = professorsList.find(
    (profesor) => profesor.id === selectedProfessorId
  );

  const fetchProfessors = async () => {
    try {
      const professors = await getProfessors();
      setProfessorsList(professors);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los profesores",
      });
    }
  };

  useEffect(() => {
    initMercadoPago("TEST-35ca7b57-da90-412b-b501-03fb27a3dcd8", {
      locale: "es-AR",
    });
    fetchProfessors();
  }, []);

  useEffect(() => {
    if (selectedProfessor) {
      fetchHorarios(selectedProfessor.id);
    }
  }, [selectedProfessor, professorsList]);

  async function fetchHorarios(idProfesor: string) {
    try {
      const horariosCuposDb = await getHorariosCupos(idProfesor);
      setHorariosProfesor(horariosCuposDb);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los horarios de los profesores",
      });
    }
  }

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
        router.push("/userdashboard");
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Confirmar
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-black text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white">
                      Resumen plan seleccionado
                    </SheetTitle>
                    <SheetDescription className="text-gray-300">
                      Por favor, confirma que la información es correcta y
                      continua con la subcripcion.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow text-black">
                      <h3 className="text-lg font-semibold mb-2">
                        Resumen del Plan
                      </h3>
                      <p>
                        <strong>Peso:</strong>
                        {form.watch("peso") as number} kg
                      </p>
                      <p>
                        <strong>Altura:</strong>
                        {form.watch("altura") as number} cm
                      </p>
                      <p>
                        <strong>Profesor:</strong> {selectedProfessor?.nombre}
                      </p>
                      <p>
                        <strong>Días seleccionados:</strong>{" "}
                        {form.watch("diasSeleccionados").join(", ")}
                      </p>
                      <p>
                        <strong>Precio Total:</strong> $1000
                      </p>
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Wallet
                        initialization={{ preferenceId: "<PREFERENCE_ID>" }}
                        customization={{ texts: { valueProp: "smart_option" } }}
                      />
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;