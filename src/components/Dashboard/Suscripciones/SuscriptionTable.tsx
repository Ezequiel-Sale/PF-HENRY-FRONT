import { DataTablePagination } from "@/components/Table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import { getUsers } from "@/services/users";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SuscriptionTableProps {
  limit?: number;
  title?: string;
}

interface User {
  id: string;
  name: string;
  fecha_nacimiento: string;
}

const calcularEdad = (fechaNacimiento: string): number => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
};

const SuscriptionTable = ({ limit, title }: SuscriptionTableProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPagesIndex, setTotalPagesIndex] = useState(2);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    try {
      const { users, metadata } = await getUsers(pageIndex, pageSize);
      console.log("Users", users);
      if (Array.isArray(users)) {
        setUsers(users);
        setTotalUsers(metadata.totalUsers);
      } else {
        console.error("La respuesta no es un array:", users);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageSize, pageIndex]);

  const usersOrdenados: User[] = [...users].sort(
    (a, b) =>
      new Date(b.fecha_nacimiento).getTime() -
      new Date(a.fecha_nacimiento).getTime()
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold text-center">
        {title ? title : "Suscripciones"}
      </h3>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                Nombre
              </TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">
                Edad
              </TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">
                Fecha de nacimiento
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersOrdenados.map((user: User, index: number) => (
              <TableRow
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <TableCell className="text-center py-2 px-4">
                  {user.name}
                </TableCell>
                <TableCell className="text-center py-2 px-4 hidden md:table-cell">
                  {calcularEdad(user.fecha_nacimiento)}
                </TableCell>
                <TableCell className="text-center py-2 px-4 hidden md:table-cell">
                  {user.fecha_nacimiento}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DataTablePagination
          data={usersOrdenados}
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
  );
};

export default SuscriptionTable;
