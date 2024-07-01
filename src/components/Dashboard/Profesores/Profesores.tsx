"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProfesors, updateUserStatus, updateProfesorStatus } from "@/helper/petitions"; // Asegúrate de importar la función updateUserStatus
import { IProfesor } from "@/types/profesorInterface";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profesores: React.FC = () => {
  const [profesores, setProfesores] = useState<IProfesor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfesors = async () => {
      try {
        const profesors = await getProfesors();
        if (Array.isArray(profesors)) {
          setProfesores(profesors);
        } else {
          console.error('getProfesors no devolvió un arreglo');
          setProfesores([]); // Asegura que profesores sea un arreglo incluso si la respuesta no lo es
        }
      } catch (error) {
        console.error('Error fetching profesors:', error);
        setProfesores([]); // Asegura que profesores sea un arreglo en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchProfesors();
  }, []);

  const handleStatusChange = async (id: string) => {
    try {
      await updateProfesorStatus(id);
      setProfesores(prevProfesores => prevProfesores.map(profesor =>
        profesor.id === id ? { ...profesor, estado: !profesor.estado } : profesor
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
    
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className='mt-10'>
        <h3 className='text-2xl mb-4 font-semibold'>
          Profesores
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className='hidden md:table-cell'>Edad</TableHead>
              <TableHead className='hidden md:table-cell'>Email</TableHead>
              <TableHead className='hidden md:table-cell'>Horario</TableHead>
              <TableHead className='hidden md:table-cell'>Dias</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Modificar</TableHead>
              <TableHead>Ver</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profesores.map((profesor) => (
              <TableRow key={profesor.id}>
                <TableCell>{profesor.nombre}</TableCell>
                <TableCell className='hidden md:table-cell'>{profesor.edad}</TableCell>
                <TableCell className='hidden md:table-cell'>{profesor.email}</TableCell>
                <TableCell className='hidden md:table-cell'>{profesor.horario}</TableCell>
                <TableCell className='hidden md:table-cell'>{profesor.dia}</TableCell>
                <TableCell>{profesor.estado ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-xs"
                    onClick={() => handleStatusChange(profesor.id??"")}
                  >
                    Modificar
                  </button>
                </TableCell>
                <TableCell>
                  <Link href="#">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                      Ver
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Profesores;
