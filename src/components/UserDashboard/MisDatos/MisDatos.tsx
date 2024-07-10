"use client"
import React, { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { getUserData } from "../../../helper/petitions";

const MisDatos = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    dni: '',
    fecha_de_nacimiento: '',
    altura: '',
    peso: '',
    plan: '',
    profesor: '',
    horario: [],
    objetivo: [],
    nivelActividad: '',
    metodoPago: '',
    contraseña: '••••••'
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const editableFields = ['email', 'telefono', 'contraseña'];

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('No se encontró el ID del usuario en el localStorage');
        return;
      }

      try {
        const data = await getUserData(userId);
        if (data) {
          setUserData({
            nombre: data.name || '',
            email: data.email || '',
            telefono: data.phone || '',
            dni: data.numero_dni || '',
            fecha_de_nacimiento: data.fecha_nacimiento || '',
            altura: data.altura || '',
            peso: data.peso || '',
            plan: data.plan ? data.plan.nombre : '',
            profesor: data.profesor ? data.profesor.nombre : '',
            horario: data.horario || [],
            objetivo: data.objetivo || [],
            nivelActividad: data.nivelActividad || '',
            metodoPago: data.metodoPago || '',
            contraseña: '••••••'
          });
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

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
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No se encontró el ID del usuario en el localStorage');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          phone: userData.telefono,
          password: userData.contraseña !== '••••••' ? userData.contraseña : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información del usuario');
      }

      const updatedUser = await response.json();
      console.log('Usuario actualizado:', updatedUser);
      // Aquí podrías mostrar un mensaje de éxito al usuario
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Mis Datos</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {Object.entries(userData).map(([key, value]) => (
              <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingField === key ? (
                    <div className="flex items-center">
                      <input
                        type={key === 'contraseña' ? 'password' : 'text'}
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
                      <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                      {editableFields.includes(key) && (
                        <button
                          type="button"
                          onClick={() => handleEdit(key, Array.isArray(value) ? value.join(', ') : value)}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-gray-50 text-right">
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