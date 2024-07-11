import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { getUsers } from "@/helper/petitions";
import ButtonFile from "./ButtonFile";

interface User {
  id: string;
  name: string;
  phone: string;
  fecha_nacimiento: string;
  peso: string;
  altura: string;
  objetivo: string;
  horario: string;
  profesor: {
    dia: string[];
  };
}

const Martes = () => {
  const [users, setUsers] = useState<User[]>([]);

  function calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

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

  const timeSlots = [
    "08:00 a 10:00",
    "10:00 a 12:00",
    "12:00 a 14:00",
    "14:00 a 16:00",
    "16:00 a 18:00",
    "18:00 a 20:00",
    "20:00 a 22:00",
    "22:00 a 00:00"
  ];

  const getUsersForTimeSlot = (slot: string) => {
    return users.filter(user => 
      user.horario === slot && 
      user.profesor.dia.includes('Martes')
    );
  };

  return (
    <div className="px-2 flex flex-col items-center">
      {timeSlots.map((slot, index) => (
        <Accordion key={index} type="single" collapsible className="w-full max-w-6xl my-2">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="text-center">{slot}</AccordionTrigger>
            <AccordionContent>
              <TabsContent value="martes">
                <TabsList className="flex justify-around mb-4">
                  <div className="w-20 text-center font-bold">Nombre</div>
                  <div className="w-20 text-center font-bold">Teléfono</div>
                  <div className="w-20 text-center font-bold">Edad</div>
                  <div className="w-20 text-center font-bold">Peso</div>
                  <div className="w-20 text-center font-bold">Altura</div>
                  <div className="w-20 text-center font-bold">Objetivo</div>
                  <div className="w-20 text-center font-bold">Rutina</div>
                </TabsList>
                {getUsersForTimeSlot(slot).length > 0 ? (
                  getUsersForTimeSlot(slot).map((user) => (
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
                        <ButtonFile id={user.id} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No hay usuarios programados para este horario.
                  </div>
                )}
              </TabsContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Martes;