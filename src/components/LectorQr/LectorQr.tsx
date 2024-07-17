"use client"
import React, { useEffect, useState } from 'react';
import QrScanner from 'react-qr-scanner';

interface QrScannerProps {
  delay?: number;
  style?: object;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  dni: string;
  estado: boolean;
  plan: string[];
  fecha_nacimiento: string;
  horario: string;
}

const QrScannerComponent: React.FC<QrScannerProps> = ({ delay = 300, style = { height: 240, width: 320 } }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isClient, setIsClient] = useState(false);
  console.log(userData)

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleScan = (result: any) => {
    if (result) {
      try {
        const parsedData = JSON.parse(result.text);
        setUserData(parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };


  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">QR Code Reader</h1>
      <div className="mb-4">
        {isClient && (
          <QrScanner
            delay={delay}
            style={style}
            onError={handleError}
            onScan={handleScan}
          />
        )}
      </div>
      {userData && (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">{userData.name}</h2>
          <p className="text-gray-600 mb-2">Email: {userData.email}</p>
          <p className="text-gray-600 mb-2">DNI: {userData.dni}</p>
          <p className="text-gray-600 mb-2">Estado: {userData.estado ? 'Activo' : 'Inactivo'}</p>
          <p className="text-gray-600 mb-2">Plan: {userData.plan.join(', ')}</p>
          <p className="text-gray-600 mb-2">Horario: {userData.horario}</p>
          <p className="text-gray-600">Fecha de nacimiento: {userData.fecha_nacimiento}</p>
        </div>
      )}
    </div>
  );
};

export default QrScannerComponent;