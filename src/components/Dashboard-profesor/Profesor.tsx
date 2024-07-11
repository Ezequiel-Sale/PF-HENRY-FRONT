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
import { userSession } from '@/types/profesorInterface';
import { usePathname } from 'next/navigation';

interface ProfesorProps {
  id: string;
  nombre: string;
  // Agrega aquí otras propiedades que pueda tener un profesor
}

const Profesor = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [profesores, setProfesores] = useState<ProfesorProps[]>([]);
  const [profesorActual, setProfesorActual] = useState<ProfesorProps | null>(null);
  const [loginData, setLoginData] = useState<userSession | null>(null);
  const pathName = usePathname();

  console.log("profesores:", profesores);
  console.log("profesor actual:", profesorActual);
  console.log("usuario:", loginData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataString = localStorage.getItem("userSession");
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setLoginData(parsedUserData);
      }
    }
  }, []);
  
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch(`http://localhost:3001/profesor/profesores`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const profesoresData: ProfesorProps[] = await response.json();
        setProfesores(profesoresData);
        
        // Buscar el profesor correspondiente al ID del login
        if (loginData && loginData.id) {
          const profesorEncontrado = profesoresData.find(prof => prof.id === loginData.id);
          if (profesorEncontrado) {
            setProfesorActual(profesorEncontrado);
          } else {
            console.log("No se encontró un profesor con el ID del login");
          }
        }
      } catch (error) {
        console.error('Error fetching profesores:', error);
      }
    };
  
    fetchProfesores();
  }, [loginData]);

  useEffect(() => {
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado'];
    const today = new Date();
    const currentDayName = daysOfWeek[today.getDay()];
    setCurrentDay(currentDayName);
  }, []);

  if (!currentDay || !profesorActual) {
    return <p>Cargando...</p>; 
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white mt-2">
        Profesor {profesorActual.nombre}
      </h1>
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