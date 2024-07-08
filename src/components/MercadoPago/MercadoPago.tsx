"use client";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Link from 'next/link';
import { Rocket, CreditCard, ArrowLeft } from 'lucide-react';

const PaymentPage = () => {
  useEffect(() => {
    initMercadoPago("TEST-35ca7b57-da90-412b-b501-03fb27a3dcd8", { locale: "es-AR" });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-gradient-to-br from-gray-800 to-black text-white">
      <div className="max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center">
          <CreditCard className="mr-4 h-10 w-10 text-yellow-400 animate-pulse" />
          Página de Pago
        </h1>

        <div className="bg-yellow-400 text-black p-4 rounded-lg mb-6 transform transition-all duration-300 hover:bg-yellow-300">
          <p className="font-bold text-center flex items-center justify-center">
            <Rocket className="mr-2 h-5 w-5" />
            ¡Página en Construcción!
          </p>
          <p className="text-center mt-2">
            Estamos trabajando para mejorar tu experiencia de pago. Pronto estará disponible.
          </p>
        </div>

        <div id="wallet_container" className="mt-6 bg-white p-4 rounded-lg">
          <Wallet
            initialization={{ preferenceId: "<PREFERENCE_ID>" }}
            customization={{ 
              texts: { valueProp: "smart_option" },
              visual: { 
                buttonBackground: 'default', 
                borderRadius: '8px'
              }
            }}
          />
        </div>

        <Link href="/" className="block mt-8 text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;