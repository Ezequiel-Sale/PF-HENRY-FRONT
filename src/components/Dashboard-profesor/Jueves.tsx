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
  horario: string;
  diasSeleccionados: string;
  profesor: {
    id: string;
  };
}

interface JuevesProps {
  profesorId: string;
}

const Jueves: React.FC<JuevesProps> = ({ profesorId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
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
        const { users, metadata } = await getUsers(currentPage, 100); // Obtén 100 usuarios por página
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
  }, []); // Este efecto se ejecutará solo una vez al montar el componente

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
      user.profesor.id === profesorId && 
      user.diasSeleccionados.includes('Jueves')
    );
  };

  return (
    <div className="px-2 flex flex-col items-center">
      {timeSlots.map((slot, index) => (
        <Accordion key={index} type="single" collapsible className="w-full max-w-6xl my-2">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="text-center">{slot} - {getUsersForTimeSlot(slot).length} inscritos</AccordionTrigger>
            <AccordionContent>
              <TabsContent value="jueves">
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

export default Jueves;
