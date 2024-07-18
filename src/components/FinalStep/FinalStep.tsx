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
import { pay } from "@/services/pay";

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
  const [user, setUser] = useState<{
    email: string;
    id: string;
  }>();
  const apiUri = process.env.NEXT_PUBLIC_API_URL;

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
      const { professors } = await getProfessors();
      setProfessorsList(professors);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los profesores",
      });
    }
  };

  async function handleOnPay() {
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
        router.push("/login");
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "La información se ha actualizado correctamente",
        });
        const payment = await pay({
          metodoPago: selectedPaymentMethod,
          userEmail: user?.email ?? "",
          id_plan: form.watch("diasSeleccionados").length,
          id_profesor: form.watch("profesor"),
          diasSeleccionados: form.watch("diasSeleccionados"),
          horarios: [form.watch("horario")],
        });

        const urlPasarelaPago = payment.init_point;
        window.location.href = urlPasarelaPago;
      }
    }
  }

  useEffect(() => {
    initMercadoPago(
      "APP_USR-6388226938088227-070410-84089c51e198a5281fed512e8c8f653e-1884641309",
      {
        locale: "es-AR",
      }
    );
    fetchProfessors();
    const token = window.localStorage.getItem("userId");
  }, []);

  useEffect(() => {
    if (selectedProfessor) {
      fetchHorarios(selectedProfessor.id);
    }
  }, [selectedProfessor, professorsList]);

  async function fetchHorarios(idProfesor: string) {
    try {
      const horariosCuposDb = await getHorariosCupos(idProfesor);
      console.log("Horarios:", horariosCuposDb);
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
      const response = await fetch(`${apiUri}/users/${userId}`, {
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
      setUser(updatedUser);
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
                        {horariosProfesor.length &&
                          horariosProfesor
                            .filter((horario) => horario.cupos >= 0)
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
                href="/register"
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
  <SheetContent className="bg-black text-white overflow-y-auto">
    <SheetHeader className="text-center mb-6">
      <SheetTitle className="text-3xl font-bold text-red-600">Resumen del Plan</SheetTitle>
    </SheetHeader>
    <SheetDescription>
      <div className="space-y-6">
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Profesor", value: selectedProfessor?.nombre },
              { label: "Días", value: form.watch("diasSeleccionados").join(", ") },
              { label: "Horario", value: form.watch("horario") },
              { label: "Objetivo", value: form.watch("objetivo") },
              { label: "Nivel de actividad", value: form.watch("nivelActividad") },
              { label: "Altura", value: `${form.watch("altura")} cm` },
              { label: "Peso", value: `${form.watch("peso")} kg` },
            ].map((item, index) => (
              <div key={index} className="border-b border-gray-700 pb-2 last:border-b-0">
                <p className="text-sm font-medium text-red-400">{item.label}</p>
                <p className="text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="text-red-500 font-bold text-2xl mb-5">
            Total a pagar: ${plans.length > 0 &&
              (plans.find(
                (plan) =>
                  plan.id === form.watch("diasSeleccionados").length
              )?.price ||
                "No disponible")}
          </h4>
          
          <div className="space-y-5">
            <p className="text-lg font-semibold text-white">Selecciona método de pago</p>
            <div className="flex space-x-4 justify-center">
              {[
                { id: "efectivo", icon: IoIosCash, color: "text-yellow-400", label: "Efectivo" },
                { id: "MercadoPago", icon: SiMercadopago, color: "text-blue-400", label: "MercadoPago" },
              ].map((method) => (
                <div key={method.id} className="flex items-center">
                  <input
                    type="radio"
                    name="metodoPago"
                    id={method.id}
                    className="hidden"
                    value={method.id}
                    checked={selectedPaymentMethod === method.id}
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor={method.id}
                    className={`flex flex-col rounded-lg border-2 p-3 items-center cursor-pointer space-y-2 w-36 transition-all
                      ${selectedPaymentMethod === method.id ? "border-red-500 bg-gray-800" : "border-gray-700 hover:bg-gray-800"}`}
                  >
                    <method.icon className={method.color} size={40} />
                    <p className="text-sm font-medium">{method.label}</p>
                  </label>
                </div>
              ))}
            </div>
            {selectedPaymentMethod === "" && (
              <p className="text-red-500 text-sm mt-2">
                Por favor, selecciona un método de pago
              </p>
            )}
          </div>
          
          <Button
            onClick={handleOnPay}
            className="w-full bg-red-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-red-700 transition duration-300 mt-6 text-base"
          >
            Confirmar Pago
          </Button>
        </div>
      </div>
    </SheetDescription>
  </SheetContent>
</Sheet>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;