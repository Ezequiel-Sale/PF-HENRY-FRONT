"use client"
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { planes, diasSemana, nivelesActividad, objetivos } from "@/helper/finalStepValidation";
import { additionalInfoSchema } from "@/helper/finalStepValidation";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const SelectNoSSR = dynamic(() => import('react-select'), { ssr: false });

type AdditionalInfoFormValues = z.infer<typeof additionalInfoSchema>;

const AdditionalInfoForm = () => {
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [professorsList, setProfessorsList] = useState<{ nombre: string; horario: string[]; }[]>([]);
  const router = useRouter();

  const form = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      altura: 0,
      peso: 0,
      plan: undefined,
      diasSeleccionados: [],
      horario: "",
      nivelActividad: undefined,
      objetivo: undefined,
      profesor: "",
    },
  });

  useEffect(() => {
    fetch('http://localhost:3001/profesor/profesores')
      .then(response => response.json())
      .then(data => {
        setProfessorsList(data);
      })
      .catch(error => {
        console.error('Error fetching professors:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProfessor) {
      const profesor = professorsList.find(p => p.nombre === selectedProfessor);
      if (profesor && Array.isArray(profesor.horario) && profesor.horario.length > 0) {
        const horarioString = profesor.horario[0];
        const [start, end] = horarioString.split(' a ').map((time: string) => parseInt(time.split(':')[0]));
        const horasDisponibles = Array.from({ length: end - start }, (_, i) => {
          const hora = start + i;
          return `${hora.toString().padStart(2, "0")}:00 - ${(hora + 1).toString().padStart(2, "0")}:00`;
        });
        setAvailableHours(horasDisponibles);
      } else {
        console.error(`Profesor ${selectedProfessor} not found or horario is invalid`);
        setAvailableHours([]);
      }
    }
  }, [selectedProfessor, professorsList]);

  const onSubmit = async (values: AdditionalInfoFormValues) => {
    const userId = window.localStorage.getItem("userId");
    console.log(userId)
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo encontrar el ID del usuario',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información del usuario');
      }

      const updatedUser = await response.json();
      console.log('Usuario actualizado:', updatedUser);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La información se ha actualizado correctamente',
      });

      // Redirigir al usuario a la página principal o de perfil
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la información',
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Plan
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedPlan(e.target.value);
                          form.setValue('diasSeleccionados', []); // Reset dias when plan changes
                        }}
                        required
                      >
                        <option value="">Selecciona un plan</option>
                        {planes.map((plan) => (
                          <option key={plan.value} value={plan.value}>
                            {plan.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <Controller
                name="diasSeleccionados"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Días
                    </FormLabel>
                    <SelectNoSSR
                      isMulti
                      options={diasSemana}
                      className="bg-gray-900 text-white"
                      classNamePrefix="select"
                      onChange={(selected: any) => {
                        const maxDias = parseInt(selectedPlan);
                        if (selected.length <= maxDias) {
                          field.onChange(selected.map((item: any) => item.value));
                        }
                      }}
                      value={diasSemana.filter(dia => field.value.includes(dia.value as "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes"))}
                      isDisabled={!selectedPlan}
                      maxMenuHeight={200}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: '#1f2937',
                          borderColor: '#374151',
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: '#1f2937',
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? '#374151' : '#1f2937',
                          color: 'white',
                        }),
                      }}
                    />
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
                          setSelectedProfessor(e.target.value);
                          form.setValue('horario', ''); // Reset horario when professor changes
                        }}
                        required
                      >
                        <option value="">Selecciona un profesor</option>
                        {professorsList.map((profesor) => (
                          <option key={profesor.nombre} value={profesor.nombre}>
                            {profesor.nombre} ({profesor.horario[0]})
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
                      Horario
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        disabled={!selectedProfessor}
                        required
                      >
                        <option value="">Selecciona un horario</option>
                        {availableHours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
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
                        required
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
                        required
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
            </div>
            <div className="flex justify-between">
              <Link href="/previous-step" className="text-red-500 hover:text-red-700">
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
