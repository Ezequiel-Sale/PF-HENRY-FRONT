"use client";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const YourComponent = () => {
  useEffect(() => {
    initMercadoPago("TEST-35ca7b57-da90-412b-b501-03fb27a3dcd8", { locale: "es-AR" });
  }, []);

  return (
    <div id="wallet_container">
      <h1 className="text-3xl font-bold text-white">Mercado Pago</h1>
      <Wallet
        initialization={{ preferenceId: "<PREFERENCE_ID>" }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    </div>
  );
};

export default YourComponent;
