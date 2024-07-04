"use client";
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Lunes from "./Lunes";
import Martes from './Martes';
import Miercoles from './Miercoles';
import Jueves from './Jueves';
import Viernes from './Viernes';

export const arrayUser = [
  {
    id: 1,
    name: "Ezequiel",
    horario: "08:00 - 10:00",
    peso: "80kg",
  },
  {
    id: 2,
    name: "Jorge",
    horario: "08:00 - 10:00",
    peso: "80kg",
  },
  {
    id: 3,
    name: "Jorge",
    horario: "08:00 - 10:00",
    peso: "80kg",
  },
];
export const arrayUser2 = [
  {
    id: 1,
    name: "Jorge",
    horario: "10:00 - 12:00",
    peso: "80kg",
  },
  {
    id: 2,
    name: "Juan",
    horario: "10:00 - 12:00",
    peso: "80kg",
  },
  {
    id: 3,
    name: "Julieta",
    horario: "10:00 - 12:00",
    peso: "80kg",
  },
];

const Profesor = () => {
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const today = new Date();
    const currentDayName = daysOfWeek[today.getDay()];
    setCurrentDay(currentDayName);
  }, []);

  // Si currentDay es una cadena vacía, mostramos un mensaje de carga o null
  if (!currentDay) {
    return <p>Cargando...</p>; 
  }

  return (
    <>
      <h3 className="text-3xl font-bold text-center text-white">Foto?</h3>
      <h1 className="text-3xl font-bold text-center text-white">Profesor `nombre del profesor`</h1>
      <div className="flex justify-center mt-4 h-[100%] pb-10">
        <Tabs defaultValue={currentDay} className="bg-white rounded-md">
          <TabsList className="w-[80vw] flex justify-around">
            <TabsTrigger value="lunes">Lunes</TabsTrigger>
            <TabsTrigger value="martes">Martes</TabsTrigger>
            <TabsTrigger value="miercoles">Miércoles</TabsTrigger>
            <TabsTrigger value="jueves">Jueves</TabsTrigger>
            <TabsTrigger value="viernes">Viernes</TabsTrigger>
          </TabsList>
          <TabsContent value="lunes"><Lunes /></TabsContent>
          <TabsContent value="martes"><Martes /></TabsContent>
          <TabsContent value="miercoles"><Miercoles /></TabsContent>
          <TabsContent value="jueves"><Jueves /></TabsContent>
          <TabsContent value="viernes"><Viernes /></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profesor;
