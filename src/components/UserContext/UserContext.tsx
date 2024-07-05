"use client";
import React, { createContext, useContext, useState, useEffect, FC } from 'react';
import { userSession } from "@/types/profesorInterface";

interface UserContextType {
  userData: userSession | null;
  setUserData: (user: userSession | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<userSession | null>(null);

  useEffect(() => {
    // Cargar userData desde localStorage si está disponible
    if (typeof window !== "undefined" && window.localStorage) {
      const userDataString = localStorage.getItem("userSession");
      console.log("console en context",userDataString);
      setUserData(userDataString ? JSON.parse(userDataString) : null);
    }
  }, []);

  // Escuchar cambios en el almacenamiento local para actualizar userData
  useEffect(() => {
    const handleStorageChange = () => {
      const userDataString = localStorage.getItem("userSession");
      setUserData(userDataString ? JSON.parse(userDataString) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};