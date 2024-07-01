"use client";

import React, { useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  fecha_nacimiento: string;
  phone: number;
  numero_dni: number;
  estado: 'active' | 'cancelled';
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/profesor/users');
        const data = await response.json();
        console.log(response)
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = (user: User) => {
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, estado: u.estado === 'active' ? 'cancelled' : 'active' } as User;
      }
      return u;
    });
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const getStatusDisplay = (status: 'active' | 'cancelled') => {
    return status === 'active' ? 'Activo' : 'Inactivo';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-2xl p-4 lg:p-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 lg:mb-8 text-center">Gestión de Usuarios</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-t-lg">
              <tr>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">Nombre</th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">Email</th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">Fecha de Nac.</th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">Teléfono</th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">DNI</th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">Estado</th>
                <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-2 py-2 lg:px-4 lg:py-3 font-medium text-gray-900">{user.name}</td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">{user.email}</td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">{user.fecha_nacimiento}</td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">{user.phone}</td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">{user.numero_dni}</td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">
                    <span className={`inline-block w-24 text-center px-2 py-1 rounded-full text-sm font-semibold ${
                      user.estado === 'active' 
                        ? 'bg-green-200 text-green-800 border-2 border-green-400' 
                        : 'bg-red-200 text-red-800 border-2 border-red-400'
                    }`}>
                      {getStatusDisplay(user.estado)}
                    </span>
                  </td>
                  <td className="px-2 py-2 lg:px-4 lg:py-3">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="font-medium text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                    >
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
          <div className="relative p-8 border w-96 shadow-lg rounded-2xl bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">Modificar Estado de Usuario</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-lg text-gray-500">
                  ¿Desea cambiar el estado de <span className="font-semibold">{selectedUser.name}</span> a <span className="font-semibold">{getStatusDisplay(selectedUser.estado === 'active' ? 'cancelled' : 'active')}</span>?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-6 py-3 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                  onClick={() => toggleUserStatus(selectedUser)}
                >
                  Cambiar Estado
                </button>
                <button
                  className="mt-3 px-6 py-3 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150 ease-in-out"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;