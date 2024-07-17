"use client";
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Lunes from "./Lunes";
import Martes from './Martes';
import Miercoles from './Miercoles';
import Jueves from './Jueves';
import Viernes from './Viernes';
import Sabado from './Sabado';
import Domingo from './Domingo';
import { userSession } from '@/types/profesorInterface';
import { usePathname } from 'next/navigation';
import { getProfessors } from '@/services/professor';

interface ProfesorProps {
  id: string;
  nombre: string;
}

interface ProfesoresResponse {
  metadata: {
    totalProfessors: number;
    totalPages: number;
  };
  professors: ProfesorProps[];
}

const Profesor = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [profesores, setProfesores] = useState<ProfesorProps[]>([]);
  const [profesorActual, setProfesorActual] = useState<ProfesorProps | null>(null);
  const [loginData, setLoginData] = useState<userSession | null>(null);
  const pathName = usePathname();



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
        const response: ProfesoresResponse = await getProfessors();
        console.log('Datos recibidos en fetchProfesores:', response);
    
        if (response && Array.isArray(response.professors)) {
          setProfesores(response.professors);
          
          if (loginData && loginData.id) {
            const profesorEncontrado = response.professors.find(prof => prof.id === loginData.id);
            if (profesorEncontrado) {
              setProfesorActual(profesorEncontrado);
              console.log('Profesor actual establecido:', profesorEncontrado);
            } else {
              console.log("No se encontró un profesor con el ID del login");
              setProfesorActual(null);
            }
          }
        } else {
          console.error('Formato de datos inesperado:', response);
          setProfesores([]);
          setProfesorActual(null);
        }
      } catch (error) {
        console.error('Error al obtener profesores:', error);
        setProfesores([]);
        setProfesorActual(null);
      }
    };
  
    fetchProfesores();
  }, [loginData]);

  useEffect(() => {
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const today = new Date();
    const currentDayName = daysOfWeek[today.getDay()];
    setCurrentDay(currentDayName);
  }, []);

  if (!currentDay || !profesorActual) {
    return <p className="text-3xl font-bold text-center text-white my-[20vh]">Cargando...</p>; 
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
            <TabsTrigger value="miercoles">Miércoles</TabsTrigger>
            <TabsTrigger value="jueves">Jueves</TabsTrigger>
            <TabsTrigger value="viernes">Viernes</TabsTrigger>
            <TabsTrigger value="sabado">Sábado</TabsTrigger>
            <TabsTrigger value="domingo">Domingo</TabsTrigger>
          </TabsList>
          <TabsContent value="lunes"><Lunes profesorId={profesorActual.id} /></TabsContent>
          <TabsContent value="martes"><Martes profesorId={profesorActual.id} /></TabsContent>
          <TabsContent value="miercoles"><Miercoles profesorId={profesorActual.id} /></TabsContent>
          <TabsContent value="jueves"><Jueves profesorId={profesorActual.id} /></TabsContent>
          <TabsContent value="viernes"><Viernes profesorId={profesorActual.id} /></TabsContent>
          <TabsContent value="sabado"><Sabado profesorId={profesorActual.id} /></TabsContent>
          <TabsContent value="domingo"><Domingo profesorId={profesorActual.id} /></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profesor;
