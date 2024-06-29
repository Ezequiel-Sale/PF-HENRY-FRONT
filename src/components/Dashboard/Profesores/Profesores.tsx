"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProfesors } from "@/helper/petitions";
import { IProfesor } from "@/types/profesorInterface";
import { ProfesorData } from "@/types/registerInterface";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profesores: React.FC = () => {
  const [profesores, setProfesores] = useState<IProfesor[]>([]);

  useEffect(() => {
    const fetchProfesors = async () => {
      const profesors = await getProfesors();
      setProfesores(profesors);
    }

    fetchProfesors();
  }, []);

 
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
