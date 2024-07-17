import React, { useState } from "react";
import Swal from "sweetalert2";
import { useContextCombined } from "../ContextUserNotifications/ContextUserNotifications";

export interface ButtonFileProps {
  id: string;
}

const ButtonFile = ({ id }: ButtonFileProps) => {
  const { addNotification } = useContextCombined();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const apiUri = process.env.NEXT_PUBLIC_API;


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  
  function getTokenFromLocalStorage() {
    const userSessionString = localStorage.getItem('userSession');
    if (userSessionString) {
      try {
        const userSession = JSON.parse(userSessionString);
        const token = userSession.token;
        return token;
      } catch (error) {
        console.error('Error al parsear userSession:', error);
        return null;
      }
    }
    return null;
  }

  const token = getTokenFromLocalStorage();
  if (token) {
    console.log('Token obtenido:', token);
  } else {
    console.log('No se encontró un token válido');
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, seleccione un archivo.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("rutina", selectedFile);
    formData.append('userId', id);

    try {
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      console.log("token en peticion", token)
      const response = await fetch(`${apiUri}/file/${id}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al subir el archivo: ${response.statusText}`);
      }
      const result = await response.json();
      console.log("Archivo subido exitosamente:", result);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Archivo subido exitosamente",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.error("Error:", error);
      alert("Error al subir el archivo");
    } finally {
      setIsUploading(false);
      setSelectedFile(null); // Restablecer el estado selectedFile a null
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type="file"
        id={`file-input-${id}`} // Use a unique ID for each input
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {!isUploading && (
        <label
          htmlFor={`file-input-${id}`} // Match the input's ID here
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300"
        >
          <span className="mr-2">📁</span>
          <span>Rutina</span>
        </label>
      )}
      {selectedFile && (
        <button
          onClick={handleUpload}
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-700 transition-colors duration-300"
          disabled={isUploading}
        >
          {isUploading ? 'Cargando...' : 'Subir'}
        </button>
      )}
    </div>
  );
};

export default ButtonFile;
