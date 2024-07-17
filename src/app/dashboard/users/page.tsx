"use client";

import { DataTablePagination } from "@/components/Table/data-table-pagination";
import { getUsers } from "@/services/users";
import React, { useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  fecha_nacimiento: string;
  phone: number;
  numero_dni: number;
  estado: boolean;
  horario?: string;
  peso?: string;
  role: string;
  objetivo?: string;
  altura?: string;
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPagesIndex, setTotalPagesIndex] = useState(2);
  const [totalUsers, setTotalUsers] = useState(0);
  const apiUri = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users, metadata } = await getUsers(pageIndex, pageSize);
        setUsers(Array.isArray(users) ? users : []);
        setTotalUsers(metadata.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageSize, pageIndex]);

  const updateUserStatus = async (id: string, newState: boolean) => {
    try {
      const response = await fetch(
        `${apiUri}/users/updateState/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: newState }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al actualizar el estado del usuario"
        );
      }

      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  };

  const handleStatusChange = async (id: string, currentState: boolean) => {
    setLoading(true);
    setMessage({ type: "", content: "" });
    try {
      const updatedUser = await updateUserStatus(id, !currentState);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setMessage({ type: "success", content: "Estado actualizado con éxito" });
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
      setMessage({ type: "error", content: "Error al actualizar el estado" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (isActive: boolean) => {
    return isActive ? "Activo" : "Inactivo";
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.numero_dni.toString().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.estado) ||
      (filterStatus === "inactive" && !user.estado);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-2xl p-4 lg:p-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4 lg:mb-8 text-center">
          Gestión de Usuarios
        </h1>
        {message.content && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.content}
          </div>
        )}

        {/* Filtros */}
        <div className="mb-4 flex gap-1">
          <input
            type="text"
            placeholder="Buscar por nombre, email o DNI"
            className="px-4 py-2 border rounded-md border-black w-full "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-black rounded-md w-full"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500">
            No se encontraron usuarios{" "}
            {filterStatus === "active"
              ? "activos"
              : filterStatus === "inactive"
              ? "inactivos"
              : "con estos criterios"}
            .
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-t-lg">
                <tr>
                  <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                    Email
                  </th>
                  <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                    Fecha de Nacimiento
                  </th>
                  <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                    Teléfono
                  </th>
                  <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                    DNI
                  </th>
                  <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-2 py-2 lg:px-4 lg:py-3">
                    Dar de baja
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-2 py-2 lg:px-4 lg:py-3 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-2 py-2 lg:px-4 lg:py-3">{user.email}</td>
                    <td className="px-2 py-2 lg:px-4 lg:py-3">
                      {user.fecha_nacimiento}
                    </td>
                    <td className="px-2 py-2 lg:px-4 lg:py-3">{user.phone}</td>
                    <td className="px-2 py-2 lg:px-4 lg:py-3">
                      {user.numero_dni}
                    </td>
                    <td className="px-2 py-2 lg:px-4 lg:py-3">
                      <span
                        className={`inline-block w-24 text-center px-2 py-1 rounded-full text-sm font-semibold ${
                          user.estado
                            ? "bg-green-200 text-green-800 border-2 border-green-400"
                            : "bg-red-200 text-red-800 border-2 border-red-400"
                        }`}
                      >
                        {getStatusDisplay(user.estado)}
                      </span>
                    </td>
                    <td className="px-2 py-2 lg:px-4 lg:py-3 text-center">
                      <button
                        className="font-medium text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                        onClick={() => handleStatusChange(user.id, user.estado)}
                      >
                        Baja
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <DataTablePagination
              data={filteredUsers}
              allDataSize={totalUsers}
              pageSizeOptions={[5, 10, 15, 20, 25]}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              totalPagesIndex={totalPagesIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
