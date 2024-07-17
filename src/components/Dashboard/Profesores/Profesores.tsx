"use client";
import { DataTablePagination } from "@/components/Table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProfesors, updateProfesorStatus } from "@/helper/petitions";
import { IProfesor } from "@/types/profesorInterface";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profesores: React.FC = () => {
  const [profesores, setProfesores] = useState<IProfesor[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPagesIndex, setTotalPagesIndex] = useState(2);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchProfesors = async () => {
      try {
        const { professors, metadata } = await getProfesors(
          pageIndex,
          pageSize
        );
        if (Array.isArray(professors)) {
          setProfesores(professors);
          setTotalUsers(metadata.totalProfessors);
          setTotalPagesIndex(metadata.totalPages);
        } else {
          console.error("getProfesors no devolvió un arreglo");
          setProfesores([]);
        }
      } catch (error) {
        console.error("Error fetching profesors:", error);
        setProfesores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfesors();
  }, [pageSize, pageIndex]);

  const handleStatusChange = async (id: string) => {
    try {
      console.log("prueba");
      await updateProfesorStatus(id);
      setProfesores((prevProfesores) =>
        prevProfesores.map((profesor) =>
          profesor.id === id
            ? { ...profesor, estado: !profesor.estado }
            : profesor
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const formatHorario = (horario: string | string[]) => {
    if (Array.isArray(horario)) {
      return horario.join(", ");
    } else {
      const bloques = horario.match(/\d{2}:\d{2} a \d{2}:\d{2}/g);
      return bloques ? bloques.join(", ") : horario;
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl mb-4 font-semibold">Profesores</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-t-lg">
              <tr>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell"
                >
                  Edad
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell"
                >
                  Horario
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell"
                >
                  Dias
                </th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                  Estado
                </th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                  Modificar
                </th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                  Ver
                </th>
              </tr>
            </thead>
            <tbody>
              {profesores.map((profesor) => (
                <tr
                  key={profesor.id}
                  className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-2 py-2 lg:px-4 lg:py-3 font-medium text-gray-900">
                    {profesor.nombre}
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell">
                    {profesor.edad}
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell">
                    {profesor.email}
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell">
                    {formatHorario(profesor.horario)}
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3 hidden md:table-cell">
                    {Array.isArray(profesor.dia)
                      ? profesor.dia.join(", ")
                      : profesor.dia}
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">
                    <span
                      className={`inline-block w-24 text-center px-2 py-1 rounded-full text-sm font-semibold ${
                        profesor.estado
                          ? "bg-green-200 text-green-800 border-2 border-green-400"
                          : "bg-red-200 text-red-800 border-2 border-red-400"
                      }`}
                    >
                      {profesor.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">
                    <button
                      className="font-medium text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                      onClick={() => handleStatusChange(profesor.id ?? "")}
                    >
                      Modificar
                    </button>
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">
                    <Link href="#">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                        Ver
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DataTablePagination
            data={profesores}
            allDataSize={totalUsers}
            pageSizeOptions={[5, 10, 15, 20, 25]}
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            totalPagesIndex={totalPagesIndex}
          />
        </div>
      </div>
    </>
  );
};

export default Profesores;
