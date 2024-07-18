import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabsContent, TabsList } from "@/components/ui/tabs";
import ButtonFile from "./ButtonFile";
import { getUsers } from "@/services/users";

interface User {
  id: string;
  name: string;
  phone: string;
  fecha_nacimiento: string;
  peso: string;
  altura: string;
  objetivo: string;
  horario: string[];
  diasSeleccionados: string; 
  profesor: {
    id: string;
  };
}

interface DomingoProps {
  profesorId: string;
}

const Domingo: React.FC<DomingoProps> = ({ profesorId }) => {
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
    const fetchAllUsers = async () => {
      let allUsers: User[] = [];
      let currentPage = 1;
      let hasMorePages = true;
  
      while (hasMorePages) {
        const { users, metadata } = await getUsers(currentPage, 100);
        allUsers = [...allUsers, ...users];
        if (users.length < 100) {
          hasMorePages = false;
        } else {
          currentPage++;
        }
      }
  
      console.log('Total de usuarios obtenidos:', allUsers.length);
      setUsers(allUsers);
    };
  
    fetchAllUsers();
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
      user.horario.includes(slot) && 
      user.profesor.id === profesorId && 
      user.diasSeleccionados.includes('Domingo')
    );
  };

  return (
    <div className="px-2 flex flex-col items-center bg-white">
      {timeSlots.map((slot, index) => (
        <Accordion key={index} type="single" collapsible className="w-full max-w-6xl my-2">
          <AccordionItem value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
            <AccordionTrigger className="text-center bg-red-600 text-white p-4 hover:bg-red-700 transition-colors duration-300">
              {slot} - {getUsersForTimeSlot(slot).length} inscritos
            </AccordionTrigger>
            <AccordionContent className="bg-white">
              <TabsContent value="domingo">
                <TabsList className="flex justify-around mb-4 bg-gray-100 p-2 rounded-t-lg">
                  {["Nombre", "Teléfono", "Edad", "Peso", "Altura", "Objetivo", "Rutina"].map((header) => (
                    <div key={header} className="w-1/7 text-center font-bold text-gray-700">{header}</div>
                  ))}
                </TabsList>
                {getUsersForTimeSlot(slot).length > 0 ? (
                  getUsersForTimeSlot(slot).map((user) => (
                    <div
                      key={user.id}
                      className="flex justify-around items-center bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 py-3"
                    >
                      <div className="w-1/7 text-center text-gray-800">{user.name}</div>
                      <div className="w-1/7 text-center text-gray-800">{user.phone}</div>
                      <div className="w-1/7 text-center text-gray-800">{calcularEdad(user.fecha_nacimiento)}</div>
                      <div className="w-1/7 text-center text-gray-800">{user.peso}</div>
                      <div className="w-1/7 text-center text-gray-800">{user.altura}</div>
                      <div className="w-1/7 text-center text-gray-800">{user.objetivo}</div>
                      <div className="w-1/7 text-center">
                        <ButtonFile id={user.id} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 bg-gray-50">
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

export default Domingo;