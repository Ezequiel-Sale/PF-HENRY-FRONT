"use client";
import React, { useState, useEffect } from "react";
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
import Link from "next/link";
import { nivelesActividad, objetivos } from "@/helper/finalStepValidation";
import { additionalInfoSchema } from "@/helper/finalStepValidation";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { defaultValues } from "@/helper/finalStepValidation";
import CircularInput from "@/components/CircularInput/CircularInput";
import WeekdayPicker from "../WeekDayPeeker/WeekDayPeeker";
import { getHorariosCupos } from "@/services/cupos";
import { ICupos, IHorariosProfesor, IPlan } from "@/types/FinalStepInterfaces";
import { getProfessors } from "@/services/professor";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { getPlans } from "@/services/plan";
import { IoIosCash } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";

type AdditionalInfoFormValues = z.infer<typeof additionalInfoSchema>;

const AdditionalInfoForm = () => {
  const [selectedHorario, setSelectedHorario] = useState("");
  const [professorsList, setProfessorsList] = useState<ICupos[]>([]);
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [horariosProfesor, setHorariosProfesor] = useState<IHorariosProfesor[]>(
    []
  );
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const router = useRouter();
  const form = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues,
  });

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
  const handlePaymentMethodChange = (event: { target: { value: any } }) => {
    const method = event.target.value;
    setSelectedPaymentMethod(method);
  };

  async function fetchPlans() {
    const plans = await getPlans();
    setPlans(plans);
  }

  const onSubmit = async (
    values: AdditionalInfoFormValues & { plan: number }
  ) => {
    console.log("Algo mal");
    const userId = window.localStorage.getItem("userId");
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
      fetchPlans();
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
      setIsOpen(true);
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
            <div className="grid grid-cols-3 gap-10">
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
              <FormField
                control={form.control}
                name="diasSeleccionados"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white mt-10">
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
            </div>
            <div className="grid grid-cols-4 gap-4">
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
                        {horariosProfesor
                          .filter((horario) => horario.cupos > 0)
                          .map((horario) => (
                            <option
                              key={horario.horario}
                              value={horario.horario}
                            >
                              {horario.horario} - {horario.cupos} cupos
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
            </div>
            <div className="flex justify-between">
              <Link
                href="/previous-step"
                className="text-red-500 hover:text-red-700"
              >
                Volver
              </Link>

              <Button type="submit" className="bg-red-500 hover:bg-red-700">
                Confirmar
              </Button>
            </div>
          </form>
        </Form>
        <Sheet
          open={isOpen}
          onOpenChange={() => {
            isOpen ? setIsOpen(false) : setIsOpen(true);
          }}
        >
          <SheetContent className="bg-black text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Resumen del plan</SheetTitle>
              <SheetDescription>
                <div>
                  <table className="table-auto text-white rounded-xl">
                    <tbody>
                      <tr>
                        <td className="border px-2 py-2">Profesor</td>
                        <td className="border px-2 py-2">
                          {selectedProfessor?.nombre}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-2">Dias</td>
                        <td className="border px-2 py-2">
                          {form.watch("diasSeleccionados").join(" ")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-2">Horario</td>
                        <td className="border px-2 py-2">
                          {form.watch("horario")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-2">Objetivo</td>
                        <td className="border px-2 py-2">
                          {form.watch("objetivo")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-2">Nivel de actividad</td>
                        <td className="border px-2 py-2">
                          {form.watch("nivelActividad")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-2">Altura</td>
                        <td className="border px-2 py-2">
                          {form.watch("altura")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-2">Peso</td>
                        <td className="border px-2 py-2">
                          {form.watch("peso")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4 flex-col">
                    <h4 className="text-red-500 font-bold text-2xl">
                      Total a pagar:{" $"}
                      {plans.length > 0 &&
                        (plans.find(
                          (plan) =>
                            plan.id === form.watch("diasSeleccionados").length
                        )?.price ||
                          "No disponible")}
                    </h4>
                    <div className="flex flex-col text-white mt-5 space-y-2">
                      <label className="text-xl">
                        Selecciona método de pago
                      </label>
                      <div className="flex space-x-4 justify-center">
                        <div className="flex items-center ">
                          <input
                            type="radio"
                            name="metodoPago"
                            id="efectivo"
                            className="hidden"
                            value="efectivo"
                            checked={selectedPaymentMethod === "efectivo"}
                            onChange={handlePaymentMethodChange}
                          />
                          <label
                            htmlFor="efectivo"
                            className={`flex flex-col rounded-md border p-2 items-center cursor-pointer space-x-2 w-28
                              ${
                                selectedPaymentMethod === "efectivo" &&
                                "border-red-500"
                              }`}
                          >
                            <IoIosCash className="text-yellow-400" size={30} />
                            <p className="text-sm">Efectivo</p>
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="metodoPago"
                            id="mercadoPago"
                            className="hidden"
                            value="mercadoPago"
                            checked={selectedPaymentMethod === "mercadoPago"}
                            onChange={handlePaymentMethodChange}
                          />
                          <label
                            htmlFor="mercadoPago"
                            className={`flex flex-col rounded-md border p-2 items-center cursor-pointer space-x-2 w-28
                              ${
                                selectedPaymentMethod === "mercadoPago" &&
                                "border-red-500"
                              }`}
                          >
                            <SiMercadopago
                              className="text-blue-400"
                              size={30}
                            />
                            <p className="text-sm">MercadoPago</p>
                          </label>
                        </div>
                      </div>
                      <p
                        className={
                          selectedPaymentMethod === ""
                            ? "text-red-500 text-sm"
                            : "hidden"
                        }
                      >
                        !Selecciona por favor un método de pago
                      </p>
                    </div>
                    <div className="flex justify-center mt-8">
                      <Button
                        onClick={() => {
                          if (selectedPaymentMethod === "") {
                            Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: "Por favor selecciona un método de pago",
                            });
                          } else {
                            if (selectedPaymentMethod === "efectivo") {
                              Swal.fire({
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
                          }
                        }}
                        className="bg-red-500 px-10 hover:bg-red-700"
                      >
                        Pagar
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
