"use client"
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
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
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Swal from "sweetalert2";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { IoIosCash } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";
import { getProfessors } from "@/services/professor";
import { getHorariosCupos } from "@/services/cupos";
import { pay } from "@/services/pay";
import WeekdayPicker from "@/components/WeekDayPeeker/WeekDayPeeker";

interface UserData {
  id: string;
  name: string;
  dni: string;
  estado: boolean;
  plan: string[];
  fecha_nacimiento: string;
  email: string;
  horario: string;
}

const activationSchema = z.object({
  plan: z.coerce.number().min(2).max(5),
  profesor: z.string().nonempty("Debes seleccionar un profesor"),
  horario: z.string().nonempty("Debes seleccionar un horario"),
  diasSeleccionados: z.array(z.string()).min(2, "Debes seleccionar al menos 2 días").max(5, "No puedes seleccionar más de 5 días"),
});

type ActivationFormValues = z.infer<typeof activationSchema>;

const QRaccess: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [professorsList, setProfessorsList] = useState<any[]>([]);
  const [horariosProfesor, setHorariosProfesor] = useState<any[]>([]);
  const apiUri = process.env.NEXT_PUBLIC_API_URL;
  console.log("profesor lista",professorsList)


  const form = useForm<ActivationFormValues>({
    resolver: zodResolver(activationSchema),
    defaultValues: {
      plan: 2,
      profesor: "",
      horario: "",
      diasSeleccionados: [],
    },
  });

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const id = userSession.id;
    if (id) {
      setUserId(id);
    } else {
      console.error("No se encontró el ID del usuario en el localStorage");
      setError("No se pudo obtener el ID del usuario");
      setLoading(false);
    }

    initMercadoPago("APP_USR-6388226938088227-070410-84089c51e198a5281fed512e8c8f653e-1884641309", {
      locale: "es-AR",
    });
    fetchProfessors();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    if (!userId) {
      console.error('El ID del usuario no está disponible');
      console.log("hola")
      setError("No se pudo obtener el ID del usuario");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUri}/users/generaqr/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }
      const data: UserData = await response.json();
      console.log('Datos del usuario:', data);
      setUserData(data);
    } catch (err) {
      console.error('Error al obtener los datos del usuario:', err);
      setError('Error al obtener los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfessors = async () => {
    try {
      const response = await getProfessors();
      if (response && response.professors) {
        setProfessorsList(response.professors);
      } else {
        setProfessorsList([]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los profesores",
      });
    }
  };

  const fetchHorarios = async (idProfesor: string) => {
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
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const onSubmit = async (values: ActivationFormValues) => {
    if (selectedPaymentMethod === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor selecciona un método de pago",
      });
      return;
    }

    if (selectedPaymentMethod === "efectivo") {
      Swal.fire({
        icon: "success",
        title: "¡Suscripción activada!",
        text: "Recuerda coordinar el pago con el administrador",
      });
      setIsOpen(false);
    } else {
      try {
        const payment = await pay({
          metodoPago: selectedPaymentMethod,
          userEmail: userData?.email || "",
          id_plan: values.plan,
          id_profesor: values.profesor,
          diasSeleccionados: values.diasSeleccionados,
          horarios: [values.horario],
        });

        window.location.href = payment.init_point;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al procesar el pago",
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center p-8 text-red-600">No se pudieron cargar los datos del usuario</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Acceso QR</h1>
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 max-w-md w-full">
          {userData.estado ? (
            <>
              <div className="bg-green-600 text-white p-4">
                <h2 className="text-xl font-semibold">Suscripción Activa</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">Escanea este código QR para acceder al establecimiento:</p>
                <div className="flex justify-center">
                  <QRCode value={JSON.stringify(userData)} size={200} />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Nombre: {userData.name}</p>
                  <p className="text-sm text-gray-600">DNI: {userData.dni}</p>
                  <p className="text-sm text-gray-600">Días: {userData.plan.join(', ')}</p>
                  <p className="text-sm text-gray-600">Horario: {userData.horario}</p>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <p className="text-sm text-gray-600">Gracias por tu confianza. ¡Disfruta tu acceso!</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-red-600 text-white p-4">
                <h2 className="text-xl font-semibold">Suscripción Inactiva</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">Para acceder al establecimiento, necesitas tener una suscripción activa.</p>
                <Button onClick={() => setIsOpen(true)} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  Activar Suscripción
                </Button>
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <p className="text-sm text-red-600">Tu suscripción ha vencido. Por favor, renueva para seguir disfrutando de nuestros servicios.</p>
              </div>
            </>
          )}
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="bg-white text-gray-800 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-blue-600">Activar Suscripción</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Plan (días por semana)</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full bg-gray-100 text-gray-800 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="2">2 días</option>
                        <option value="3">3 días</option>
                        <option value="5">5 días</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diasSeleccionados"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Selecciona los días de tu plan</FormLabel>
                    <FormControl>
                      <WeekdayPicker
                        onchange={(days) => {
                          form.setValue("diasSeleccionados", days);
                          form.trigger("diasSeleccionados");
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profesor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Profesor</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="w-full bg-gray-100 text-gray-800 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          field.onChange(e);
                          fetchHorarios(e.target.value);
                        }}
                      >
                        <option value="">Selecciona un profesor</option>
                        {Array.isArray(professorsList) &&
                                professorsList.length > 0 &&
                                professorsList.map((profesor) => (
                          <option key={profesor.id} value={profesor.id}>
                            {profesor.nombre}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="horario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Horario</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full bg-gray-100 text-gray-800 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Selecciona un horario</option>
                        {Array.isArray(professorsList) &&
                                professorsList.length > 0 &&
                                horariosProfesor.map((horario) => (
                          <option key={horario.id} value={horario.id}>
                            {horario.horario} - {horario.cupos} cupos
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <label className="text-xl font-semibold text-gray-700">Selecciona método de pago</label>
                <div className="flex space-x-4 justify-center">
                  <div className="flex items-center">
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
                      className={`flex flex-col rounded-md border p-3 items-center cursor-pointer space-y-2 w-32 transition-all
                        ${selectedPaymentMethod === "efectivo" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
                    >
                      <IoIosCash className="text-yellow-500" size={36} />
                      <p className="text-sm font-medium">Efectivo</p>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="MercadoPago"
                      id="MercadoPago"
                      className="hidden"
                      value="MercadoPago"
                      checked={selectedPaymentMethod === "MercadoPago"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label
                      htmlFor="MercadoPago"
                      className={`flex flex-col rounded-md border p-3 items-center cursor-pointer space-y-2 w-32 transition-all
                        ${selectedPaymentMethod === "MercadoPago" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
                    >
                      <SiMercadopago className="text-blue-500" size={36} />
                      <p className="text-sm font-medium">MercadoPago</p>
                    </label>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded hover:bg-green-600 transition duration-300">
                Activar Suscripción
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default QRaccess;