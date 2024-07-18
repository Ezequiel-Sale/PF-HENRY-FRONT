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
import { Calendar } from 'lucide-react';

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
    return <p className="text-3xl font-bold text-center text-gray-800 my-[20vh]">Cargando...</p>; 
  }

  return (
    <div className="flex-1 p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Calendar className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenido, profesor {profesorActual.nombre}
          </h1>
          <p className="text-xl text-gray-600">
            Aquí podrás gestionar tu horario y clases para la semana.
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tu horario semanal</h2>
          <p className="text-gray-700 mb-4">
            Selecciona un día para ver y gestionar tus clases. Puedes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Ver las clases programadas</li>
            <li>Ver los alumnos de cada clase</li>
            <li>Ver los datos de tus alumnos</li>
            <li>Subir una rutina a tus alumnos</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <Tabs defaultValue={currentDay} className="w-full">
            <TabsList className="flex justify-around bg-gray-100 p-2 rounded-t-lg">
              {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((day) => (
                <TabsTrigger 
                  key={day} 
                  value={day}
                  className="px-4 py-2 text-gray-700 hover:bg-red-100 rounded transition duration-300"
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="p-4">
              <TabsContent value="lunes"><Lunes profesorId={profesorActual.id} /></TabsContent>
              <TabsContent value="martes"><Martes profesorId={profesorActual.id} /></TabsContent>
              <TabsContent value="miercoles"><Miercoles profesorId={profesorActual.id} /></TabsContent>
              <TabsContent value="jueves"><Jueves profesorId={profesorActual.id} /></TabsContent>
              <TabsContent value="viernes"><Viernes profesorId={profesorActual.id} /></TabsContent>
              <TabsContent value="sabado"><Sabado profesorId={profesorActual.id} /></TabsContent>
              <TabsContent value="domingo"><Domingo profesorId={profesorActual.id} /></TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Consejo del día:</h3>
          <p className="text-gray-700">
            Recuerda revisar tu horario al inicio de cada semana para estar preparado 
            y ofrecer la mejor experiencia a tus estudiantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profesor;