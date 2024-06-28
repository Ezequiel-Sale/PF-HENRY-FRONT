"use client";

import React, { useState } from 'react';

const Settings = () => {
  const [profesorData, setProfesorData] = useState({
    nombre: '',
    edad: '',
    dia: '',
    horario: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfesorData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al backend
    console.log(profesorData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="w-full max-w-4xl p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Registrar Nuevo Profesor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-300">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={profesorData.nombre}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="edad" className="block mb-2 text-sm font-medium text-gray-300">Edad</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={profesorData.edad}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="dia" className="block mb-2 text-sm font-medium text-gray-300">Día</label>
              <input
                type="text"
                id="dia"
                name="dia"
                value={profesorData.dia}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="horario" className="block mb-2 text-sm font-medium text-gray-300">Horario</label>
              <input
                type="text"
                id="horario"
                name="horario"
                value={profesorData.horario}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profesorData.email}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={profesorData.password}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrar Profesor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;