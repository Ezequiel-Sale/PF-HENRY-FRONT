"use client"
import React, { useState, useEffect } from 'react';
import { getUserData } from '../../../helper/petitions';
import Image from 'next/image';

interface UserData {
  name: string;
  rutina: string;
  profesor: {
    nombre: string;
    email: string;
  };
  metodoPago: string;
  plan: {
    name: string;
    price: string;
  };
}

const Rutina: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const id = userSession.id;
    if (id) {
      setUserId(id);
    } else {
      console.error("No se encontró el ID del usuario en el localStorage");
      setError("No se pudo obtener el ID del usuario");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    if (!userId) {
      console.error('El ID del usuario no está disponible');
      setError("No se pudo obtener el ID del usuario");
      setLoading(false);
      return;
    }

    try {
      const data = await getUserData(userId);
      console.log('userData:', data);
      setUserData(data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al obtener datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (userData?.rutina) {
      try {
        // Fetch the image
        const response = await fetch(userData.rutina);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        
        // Create a blob URL
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = blobUrl;
        
        // Set the download attribute with a filename
        link.download = 'mi_rutina.jpg'; // You can customize the filename here
        
        // Programmatically click the link to trigger the download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Error downloading the image:', error);
        // You might want to show an error message to the user here
        alert('Hubo un error al descargar la imagen. Por favor, intenta de nuevo.');
      }
    } else {
      console.error('No hay URL de rutina disponible');
      alert('No hay una rutina disponible para descargar.');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No se encontraron datos del usuario</div>;
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
                <img
                  src={userData.rutina}
                  alt="Tu rutina personalizada"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
            <p className="text-gray-700">Aún no tienes una rutina asignada. Comunícate con tu profesor para que puedas visualizarla.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rutina;