"use client"
import React, { useState, useEffect } from 'react';
import { getUserData } from '../../../helper/petitions';

interface UserData {
  name: string;
  rutina: string;
  profesor: {
    nombre: string;
  };
}

const Rutina: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Asumimos que tenemos el userId almacenado en localStorage
      const userId = localStorage.getItem('userId');
      if (userId) {
        const data = await getUserData(userId);
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8">
          Hola, {userData.name}!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Aquí tienes tu rutina personalizada. ¡Esperamos que te ayude a alcanzar tus objetivos!
        </p>
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Tu Rutina</h2>
          {userData.rutina ? (
                      <>
                        <iframe
                          src={userData.rutina}
                          className="w-full h-96 mb-4 border border-gray-300 rounded"
                        ></iframe>
                        <a
                          href={userData.rutina}
                          download
                          className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                          Descargar PDF
                        </a>
                      </>
                    ) : (
                      <p className="text-gray-700">Aún no tienes una rutina asignada. Comunícate con el profesor {userData.profesor.nombre} para que puedas visualizarla.</p>
                    )}
        </div>
      </div>
    </div>
  );
};

export default Rutina;