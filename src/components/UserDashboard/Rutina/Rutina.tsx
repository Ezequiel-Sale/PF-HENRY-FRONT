"use client"
import React, { useState, useEffect } from 'react';
import { getUserData } from '../../../helper/petitions';
import Image from 'next/image';

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
      const userId = localStorage.getItem('userId');
      if (userId) {
        const data = await getUserData(userId);
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  const handleDownload = async () => {
    if (userData?.rutina) {
      try {
        // Fetch the image
        const response = await fetch(userData.rutina);
        const blob = await response.blob();
        
        // Create a blob URL
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = blobUrl;
        
        // Set the download attribute with a filename
        link.download = 'mi_rutina.jpg'; // You can customize the filename here
        
        // Append to the body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Revoke the blob URL
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Error downloading the image:', error);
      }
    }
  };

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
              <div className="mb-4 relative w-full h-96">
                <Image
                  src={userData.rutina}
                  alt="Tu rutina personalizada"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <button
                onClick={handleDownload}
                className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Descargar Imagen
              </button>
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