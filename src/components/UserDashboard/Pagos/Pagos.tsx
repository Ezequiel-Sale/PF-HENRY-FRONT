"use client"
import React, { useState, useEffect } from 'react';
import { getUserData } from "../../../helper/petitions";

interface Pago {
  id: string;
  fecha_pago: string;
  metodopago: string;
}

interface Plan {
  name: string;
  price: string;
}

interface UserData {
  pagos: Pago[];
  plan: Plan;
}

const Pagos: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const id = userSession.id;
    if (id) {
      fetchUserData(id);
    } else {
      console.error("No se encontró el ID del usuario en el localStorage");
      setError("No se pudo obtener el ID del usuario");
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      setIsLoading(true);
      const data = await getUserData(userId);
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      setError("Error al cargar los datos del usuario");
      setIsLoading(false);
    }
  };

  const calculateExpirationDate = (paymentDate: string) => {
    const date = new Date(paymentDate);
    date.setMonth(date.getMonth() + 1);
    
    if (date.getDate() !== new Date(paymentDate).getDate()) {
      date.setDate(0);
    }
    
    return date;
  };

  const isSubscriptionExpired = (paymentDate: string) => {
    const expirationDate = calculateExpirationDate(paymentDate);
    return new Date() > expirationDate;
  };

  const renderPagoCard = (pago: Pago, plan: Plan, isExpired: boolean) => {
    const expirationDate = calculateExpirationDate(pago.fecha_pago);
    const colorClass = isExpired ? "bg-red-600" : "bg-green-600";
    const textColorClass = isExpired ? "text-red-600" : "text-green-600";

    return (
      <div key={pago.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
        <div className={`${colorClass} text-white p-4`}>
          <h2 className="text-xl font-semibold">{plan.name}</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700"><span className="font-semibold">ID de Pago:</span> {pago.id}</p>
          <p className="text-gray-700"><span className="font-semibold">Fecha de Pago:</span> {new Date(pago.fecha_pago).toLocaleDateString()}</p>
          <p className="text-gray-700"><span className="font-semibold">Método de Pago:</span> {pago.metodopago}</p>
          <p className={`text-2xl font-bold ${textColorClass} mt-4`}>${plan.price}</p>
        </div>
        <div className="bg-gray-100 px-6 py-4">
          {isExpired ? (
            <p className="text-sm text-red-600 mb-2">Tu suscripción ha vencido. Por favor, renueva para seguir disfrutando de nuestros servicios.</p>
          ) : (
            <p className="text-sm text-gray-600 mb-2">Tu suscripción vencerá el {expirationDate.toLocaleDateString()}.</p>
          )}
          <p className="text-sm text-gray-600">Gracias por tu confianza. ¡Sigue entrenando!</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center p-8">Cargando historial de pagos...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  // Card hardcodeada para una suscripción vencida
  const expiredSubscription: Pago = {
    id: "expired-123",
    fecha_pago: "2023-06-01",
    metodopago: "Efectivo"
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-gray-800">Historial de Pagos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData && userData.pagos && userData.pagos.map((pago) => 
          renderPagoCard(pago, userData.plan, isSubscriptionExpired(pago.fecha_pago))
        )}
        {/* Renderizar la card hardcodeada de suscripción vencida */}
        {renderPagoCard(expiredSubscription, {name: "Plan Vencido", price: "14000.00"}, true)}
      </div>
      {(!userData || !userData.pagos || userData.pagos.length === 0) && (
        <p className="text-center text-gray-600 mt-8">No se encontraron registros de pagos.</p>
      )}
    </div>
  );
};

export default Pagos;
