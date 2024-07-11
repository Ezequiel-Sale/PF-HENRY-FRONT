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

const Profesor = () => {
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado'];
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
      <h1 className="text-3xl font-bold text-center text-white mt-2">Dashboard de Profesor</h1>
      <div className="flex justify-center mt-4 h-[100%] pb-10">
        <Tabs defaultValue={currentDay} className="bg-white rounded-md">
          <TabsList className="w-[80vw] flex justify-around">
            <TabsTrigger value="lunes">Lunes</TabsTrigger>
            <TabsTrigger value="martes">Martes</TabsTrigger>
            <TabsTrigger value="miércoles">Miércoles</TabsTrigger>
            <TabsTrigger value="jueves">Jueves</TabsTrigger>
            <TabsTrigger value="viernes">Viernes</TabsTrigger>
          </TabsList>
          <TabsContent value="lunes"><Lunes /></TabsContent>
          <TabsContent value="martes"><Martes /></TabsContent>
          <TabsContent value="miércoles"><Miercoles /></TabsContent>
          <TabsContent value="jueves"><Jueves /></TabsContent>
          <TabsContent value="viernes"><Viernes /></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profesor;
