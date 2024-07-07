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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/profesor/users');
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const usersOrdenados: User[] = [...users].sort((a, b) => new Date(b.fecha_nacimiento).getTime() - new Date(a.fecha_nacimiento).getTime());
  const usersFiltrados = limit ? usersOrdenados.slice(0, limit) : usersOrdenados;

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='mt-10'>
      <h3 className='text-2xl mb-4 font-semibold text-center'>
        {title ? title : 'Suscripciones'}
      </h3>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableCaption className="mb-2 text-gray-600">Lista de las últimas suscripciones realizadas</TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">Nombre</TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">Edad</TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">Fecha de nacimiento</TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">Ver</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersFiltrados.map((user: User, index: number) => (
              <TableRow key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <TableCell className="text-center py-2 px-4">{user.name}</TableCell>
                <TableCell className="text-center py-2 px-4 hidden md:table-cell">{calcularEdad(user.fecha_nacimiento)}</TableCell>
                <TableCell className="text-center py-2 px-4 hidden md:table-cell">{user.fecha_nacimiento}</TableCell>
                <TableCell className="text-center py-2 px-4">
                  <Link href="#">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300 ease-in-out">
                      Ver
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SuscriptionTable;