"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPlan, deletePlan, getPlans } from "@/services/plan";
import { IPlan } from "@/types/FinalStepInterfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import * as z from "zod";

const formSchema = z.object({
  numeroDias: z.number().int().min(1).max(5),
  nombre: z.string().min(3).max(255),
  precio: z.number().min(1.0).max(10000000.0),
});

const defaultValues = {
  numeroDias: 1,
  nombre: "",
  precio: 1.0,
};

type IformSchema = z.infer<typeof formSchema>;

const PlansForm = () => {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [disponiblePlans, setDisponiblePlans] = useState<Set<number>>(
    new Set()
  );

  const form = useForm<IformSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    !plans.length && fecthPlans();
  }, [plans.length]);

  const onSubmit = (values: IformSchema) => {
    const dataToSend = {
      id: values.numeroDias,
      name: values.nombre,
      price: values.precio,
    };
    handleOnCreatePlan(dataToSend);
  };

  const handleOnCreatePlan = async (data: IPlanToCreate) => {
    try {
      const response = await createPlan(data);

      Swal.fire({
        title: "Plan creado",
        text: "El plan se ha creado correctamente.",
        icon: "success",
      });
      fecthPlans();
      setPlans([...plans, data]);
      form.reset();
    } catch (error) {
      Swal.fire({
        title: "Plan ya existente",
        text: "Ya hay un plan con el mismo numero de dias.",
        icon: "error",
      });
    }
  };

  const fecthPlans = async () => {
    const plans: IPlan[] = await getPlans();
    setPlans(plans);
    const planIds = new Set(plans.map((plan) => plan.id));
    const newDisponiblePlans = new Set([...disponiblePlans]);
    [1, 2, 3, 4, 5].forEach((planId) => {
      if (!planIds.has(planId)) {
        newDisponiblePlans.add(planId);
      }
    });
    setDisponiblePlans(newDisponiblePlans);
  };

  const handleOnDeletePlan = async (planId: number) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePlan(planId);
          plans.splice(
            plans.findIndex((plan) => plan.id === planId),
            1
          );
          Swal.fire("Borrado", "El plan ha sido borrado", "success");
          fecthPlans();
        } catch (error) {
          Swal.fire("Error", "No se ha podido borrar el plan", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Crear plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col sm:flex-row gap-4 justify-center items-center text-black"
              onSubmit={form.handleSubmit((values) => onSubmit({ ...values }))}
            >
              <FormField
                control={form.control}
                name="numeroDias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium">
                      Selecciona el numero de días del plan
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="block w-full px-3 py-2 text-black bg-secondary border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          const numberValue = parseInt(e.target.value);
                          field.onChange(numberValue);
                        }}
                      >
                        {Array.from(disponiblePlans).map((planId: number) => (
                          <option key={planId} value={planId}>
                            {planId}
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
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium">
                      Nombre del plan
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-3 py-2 text-black bg-secondary border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="precio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium">
                      Precio
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="block w-full px-3 py-2 text-black bg-secondary border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          const numberValue = parseFloat(e.target.value);
                          field.onChange(numberValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <Button
                className="bg-red-500 text-white hover:bg-red-600
                mt-4 sm:mt-0 px-4 py-2 rounded-md text-center"
                type="submit"
              >
                Crear plan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div>
        <h2 className="text-3xl font-bold my-10">Planes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader className="relative">
                <CardTitle>{plan.name}</CardTitle>
                <FaTrashAlt
                  className="text-red-500 text-2xl absolute right-0 top-0 hover:text-red-700 hover:cursor-pointer"
                  onClick={() => handleOnDeletePlan(plan.id)}
                />
              </CardHeader>
              <CardContent>
                <p>Precio: ${plan.price}</p>
                <p>Dias de entrenamiento: {plan.id}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansForm;
