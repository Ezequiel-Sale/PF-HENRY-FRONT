// import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader, TableCaption } from '@/components/ui/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SuscriptionTableProps {
  limit?: number;
  title?: string;
}

interface User {
  id: string;
  name: string;
  edad: number;
  fecha_nacimiento: string;
}

const SuscriptionTable = ({ limit, title }: SuscriptionTableProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/profesor/users');
        const data = await response.json();
        console.log(response)
        // Assuming the API returns an array of users
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Ordenar los usuarios por las más recientes
  const usersOrdenados: User[] = [...users].sort((a, b) => new Date(b.fecha_nacimiento).getTime() - new Date(a.fecha_nacimiento).getTime());

  // Filtrar usuarios por límite
  const usersFiltrados = limit ? usersOrdenados.slice(0, limit) : usersOrdenados;

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='mt-10'>
      <h3 className='text-2xl mb-4 font-semibold'>
        {title ? title : 'Suscripciones'}
      </h3>
      <Table>
        <TableCaption>Lista de las últimas suscripciones realizadas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className='hidden md:table-cell'>Edad</TableHead>
            <TableHead className='hidden md:table-cell text-right'>Fecha</TableHead>
            <TableHead>Ver</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell className='hidden md:table-cell'>{user.edad}</TableCell>
              <TableCell className='hidden md:table-cell text-right'>{user.fecha_nacimiento}</TableCell>
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
  );
};

export default SuscriptionTable;