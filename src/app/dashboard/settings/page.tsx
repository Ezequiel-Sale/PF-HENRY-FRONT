"use client"
import { createProfesor } from '@/helper/petitions';
import { ProfesorData } from '@/types/registerInterface';
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';
import { string } from 'zod';

const Settings: React.FC = () => {
  const [profesorData, setProfesorData] = useState<ProfesorData>({
    nombre: '',
    edad: '',
    dia: [],
    horario: [],
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<ProfesorData>>({});
  const [diasDropdownOpen, setDiasDropdownOpen] = useState(false);
  const [horarioDropdownOpen, setHorarioDropdownOpen] = useState(false);
  const diasRef = useRef<HTMLDivElement>(null);
  const horarioRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfesorData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfesorData(prevData => {
      const currentValues = prevData[name as keyof ProfesorData] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return {
        ...prevData,
        [name]: newValues
      };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validar campos antes de enviar
    const validationErrors: Partial<ProfesorData> = {};
    if (!profesorData.nombre.trim()) {
      validationErrors.nombre = 'El nombre es requerido';
    }
    if (!profesorData.edad.trim()) {
      validationErrors.edad = 'La edad es requerida';
    } else {
      const edadNumber = parseInt(profesorData.edad);
      if (edadNumber < 18 || edadNumber > 99) {
        validationErrors.edad = 'La edad debe estar entre 18 y 99 años';
      }
    }
    if (profesorData.dia.length === 0) {
      validationErrors.dia = ['Selecciona al menos un día'];
    }
    if (profesorData.horario.length === 0) {
      validationErrors.horario = ['Selecciona al menos un horario'];
    }
    if (!profesorData.email.trim()) {
      validationErrors.email = 'El email es requerido';
    }
    if (!profesorData.password.trim()) {
      validationErrors.password = 'La contraseña es requerida';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Aquí puedes enviar los datos al backend si todos los campos son válidos
    // Lógica para enviar datos al backend
    createProfesor(profesorData)
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Profesor creado con exito',
        showConfirmButton: false,
        timer: 1500
      })
    })
    // resetear formulario o realizar otras acciones post envío
    setProfesorData({
      nombre: '',
      edad: '',
      dia: [],
      horario: [],
      email: '',
      password: ''
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (diasRef.current && !diasRef.current.contains(event.target as Node)) {
      setDiasDropdownOpen(false);
    }
    if (horarioRef.current && !horarioRef.current.contains(event.target as Node)) {
      setHorarioDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-4xl p-8 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Registrar Nuevo Profesor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={profesorData.nombre}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label htmlFor="edad" className="block mb-2 text-sm font-medium text-gray-700">Edad</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={profesorData.edad}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500"
                min="18"
                max="99"
                required
              />
              {errors.edad && (
                <p className="text-red-500 text-sm mt-1">{errors.edad}</p>
              )}
            </div>
            <div ref={diasRef} className="relative">
              <label htmlFor="dias" className="block mb-2 text-sm font-medium text-gray-700">Días</label>
              <div
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 cursor-pointer"
                onClick={() => setDiasDropdownOpen(!diasDropdownOpen)}
              >
                {profesorData.dia.length > 0 ? profesorData.dia.join(', ') : 'Selecciona los días'}
              </div>
              {diasDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(dia => (
                    <div key={dia} className="flex items-center p-2">
                      <input
                        type="checkbox"
                        id={dia}
                        name="dia"
                        value={dia}
                        checked={profesorData.dia.includes(dia)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor={dia} className="text-sm text-gray-900">{dia}</label>
                    </div>
                  ))}
                </div>
              )}
              {errors.dia && (
                <p className="text-red-500 text-sm mt-1">{errors.dia}</p>
              )}
            </div>
            <div ref={horarioRef} className="relative">
              <label htmlFor="horario" className="block mb-2 text-sm font-medium text-gray-700">Horario</label>
              <div
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500 cursor-pointer"
                onClick={() => setHorarioDropdownOpen(!horarioDropdownOpen)}
              >
                {profesorData.horario.length > 0 ? profesorData.horario.join(', ') : 'Selecciona los horarios'}
              </div>
              {horarioDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {['08:00 a 10:00', '10:00 a 12:00', '12:00 a 14:00', '14:00 a 16:00', '16:00 a 18:00', '18:00 a 20:00', '20:00 a 22:00', '22:00 a 00:00'].map(horario => (
                    <div key={horario} className="flex items-center p-2">
                      <input
                        type="checkbox"
                        id={horario}
                        name="horario"
                        value={horario}
                        checked={profesorData.horario.includes(horario)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor={horario} className="text-sm text-gray-900">{horario}</label>
                    </div>
                  ))}
                </div>
              )}
              {errors.horario && (
                <p className="text-red-500 text-sm mt-1">{errors.horario}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profesorData.email}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={profesorData.password}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center md:justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors duration-200"
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