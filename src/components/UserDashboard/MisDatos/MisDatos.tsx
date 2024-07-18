"use client";
import React, { useState, useEffect } from "react";
import { Pencil, Check, X, Info } from "lucide-react";
import { getUserData } from "../../../helper/petitions";
import Swal from "sweetalert2";
import { userSession } from "@/types/profesorInterface";

const MisDatos = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    fecha_de_nacimiento: "",
    altura: "",
    peso: "",
    plan: "",
    profesor: "",
    horario: [],
    objetivo: [],
    nivelActividad: "",
    metodoPago: "",
  });
  console.log("Prueba de userData", userData);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUri = process.env.NEXT_PUBLIC_API_URL;
  const editableFields = ["telefono", "peso", "altura"];

  const fieldLabels = {
    nombre: "Nombre",
    email: "Email",
    telefono: "Teléfono",
    dni: "DNI",
    fecha_de_nacimiento: "Fecha de nacimiento",
    altura: "Altura",
    peso: "Peso",
    plan: "Plan",
    profesor: "Profesor",
    horario: "Horario",
    objetivo: "Objetivo",
    nivelActividad: "Nivel de actividad",
    metodoPago: "Método de pago",
  };

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const googleSession = JSON.parse(localStorage.getItem("googleSession") || "{}");
    
    let id = userSession.id || googleSession.id;

    if (id) {
      setUserId(id);
    } else {
      console.error("No se encontró el ID del usuario en el localStorage");
      setError("No se pudo obtener el ID del usuario");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    if (!userId) {
      console.error("El ID del usuario no está disponible");
      setError("No se pudo obtener el ID del usuario");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getUserData(userId);
      console.log("Datos recibidos del backend:", data);
      setUserData({
        nombre: data.name || "",
        email: data.email || "",
        telefono: data.phone || "",
        dni: data.numero_dni || "",
        fecha_de_nacimiento: data.fecha_nacimiento || "",
        altura: data.altura || "",
        peso: data.peso || "",
        plan: data.plan?.name || "",
        profesor: data.profesor?.nombre || "",
        horario: data.horario || [],
        objetivo: data.objetivo || [],
        nivelActividad: data.nivelActividad || "",
        metodoPago: data.metodoPago || "",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setError("Error al cargar los datos del usuario");
      setIsLoading(false);
    }
  };

  const handleEdit = (field: string, value: string) => {
    if (editableFields.includes(field)) {
      setEditingField(field);
      setTempValue(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  const handleSave = (field: string) => {
    setUserData({ ...userData, [field]: tempValue });
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const userId = userSession.id;
    if (!userId) {
      console.error("No se encontró el ID del usuario en el localStorage");
      return;
    }

    try {
      const response = await fetch(`${apiUri}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: userData.telefono,
          peso: userData.peso,
          altura: userData.altura,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la información del usuario");
      }

      const updatedUser = await response.json();
      console.log("Usuario actualizado:", updatedUser);

      await Swal.fire({
        title: "¡Éxito!",
        text: "Los datos del usuario se han actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      console.error("Error al actualizar los datos:", error);

      await Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al actualizar los datos del usuario.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const showInfoMessage = () => {
    Swal.fire({
      title: "Información",
      text: "Para modificar este campo comuníquese con el administrador",
      icon: "info",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#3085d6",
    });
  };

  if (isLoading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-gray-800">Mis Datos</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {Object.entries(userData).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                    {fieldLabels[key as keyof typeof fieldLabels]}
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                    {editingField === key ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={tempValue}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSave(key)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>{Array.isArray(value) ? value.join(", ") : value}</span>
                        {editableFields.includes(key) ? (
                          <button
                            type="button"
                            onClick={() => handleEdit(key, Array.isArray(value) ? value.join(", ") : value)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            <Pencil size={18} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={showInfoMessage}
                            className="ml-2 text-blue-500 hover:text-blue-600"
                          >
                            <Info size={18} />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 sm:px-6 py-2 sm:py-4 bg-gray-50 text-right">
          <button
            type="submit"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Actualizar Datos
          </button>
        </div>
      </form>
    </div>
  );
};

export default MisDatos;
