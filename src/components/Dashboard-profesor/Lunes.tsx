import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { getUsers } from "@/helper/petitions";
import ButtonFile from "./ButtonFile";
import { User } from "@/app/dashboard/users/page";

const Lunes = () => {
  const [users, setUsers] = useState<User[]>([]);

  function calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Ajustar la edad si el cumpleaños no ha ocurrido aún este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-2 flex flex-col items-center">
      {[
        { time: "08:00 - 10:00am" },
        { time: "10:00 - 12:00pm" },
        { time: "12:00 - 14:00pm" },
        { time: "14:00 - 16:00pm" },
        { time: "16:00 - 18:00pm" },
        { time: "18:00 - 20:00pm" },
        { time: "20:00 - 22:00pm" },
        { time: "22:00 - 00:00am" },
      ].map((slot, index) => (
        <Accordion key={index} type="single" collapsible className="w-full max-w-6xl my-2">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="text-center">{slot.time}</AccordionTrigger>
            <AccordionContent>
              <TabsContent value="lunes">
                <TabsList className="flex justify-around mb-4">
                  <div className="w-20 text-center font-bold">Nombre</div>
                  <div className="w-20 text-center font-bold">Teléfono</div>
                  <div className="w-20 text-center font-bold">Edad</div>
                  <div className="w-20 text-center font-bold">Peso</div>
                  <div className="w-20 text-center font-bold">Altura</div>
                  <div className="w-20 text-center font-bold">Objetivo</div>
                  <div className="w-20 text-center font-bold">Rutina</div>
                </TabsList>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-around items-center bg-black my-1 py-2"
                  >
                    <div className="w-20 text-center text-white">{user.name}</div>
                    <div className="w-20 text-center text-white">{user.phone}</div>
                    <div className="w-20 text-center text-white">{calcularEdad(user.fecha_nacimiento)}</div>
                    <div className="w-20 text-center text-white">{user.peso}</div>
                    <div className="w-20 text-center text-white">{user.altura}</div>
                    <div className="w-20 text-center text-white">{user.objetivo}</div>
                    <div className="w-20 text-center">
                      <ButtonFile id={user.id.toString()} />
                    </div>
                  </div>
                ))}
              </TabsContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Lunes;
