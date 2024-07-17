"use client";

import { useState } from "react";
import Swal from "sweetalert2";

// Definimos una interfaz para el usuario
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  fecha_nacimiento: string;
  plan?: {
    id: string;
    name: string;
    price: number;
    // Otros campos del plan si los hay
  };
}

const RegistrarPago = () => {
  const [searchInput, setSearchInput] = useState("");
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const apiUri = process.env.NEXT_PUBLIC_API_URL;


  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const searchUser = async (email: string): Promise<User | null> => {
    try {
      const response = await fetch(
        `${apiUri}/profesor/users?email=${email}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const users: User[] = await response.json();
      return users.find((user) => user.email === email) || null;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await searchUser(searchInput);
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Usuario no encontrado",
        text: "El correo electrónico no se encuentra en nuestra base de datos.",
      });
    }
    setFoundUser(user);
  };

  const registerPayment = async () => {
    try {
      if (!foundUser) {
        throw new Error("No se ha encontrado un usuario");
      }

      const response = await fetch(`${apiUri}/payments/efectivo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: foundUser.email,
          metodoPago: "Efectivo",
          id_plan: foundUser.plan?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      } else {
        Swal.fire({
          title: "Registrado",
          text: "El pago se ha registrado correctamente",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      const updatedUser = await response.json();
      setFoundUser(updatedUser);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonText: "OK",
      });
    }
    setSearchInput("");
    setFoundUser(null);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-center font-bold">Registrar Pago en Efectivo</h1>
        <h3 className="text-lg font-semibold my-4">
          Ingrese un correo electrónico para buscar un usuario y registrar el
          pago
        </h3>
        <div className="gap-3 flex mb-8">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              name="search"
              id="searchInput"
              placeholder="Correo electrónico"
              className="p-1.5 rounded-xl w-64 mb-3 mr-2"
              onChange={handleSearchInput}
              value={searchInput}
            />
            <button
              type="submit"
              className="p-1 rounded-xl w-20 h-8 bg-black text-white"
            >
              Buscar
            </button>
          </form>
        </div>
        {foundUser && (
          <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight rounded-tl-lg rounded-tr-lg text-gray-50 dark:text-white bg-black text-center h-14 flex items-center justify-center">
              {foundUser.name}
            </h5>
            <div className="p-5">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Correo: </span>
                {foundUser.email}
              </p>
              
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Plan: </span>
                {foundUser.plan?.name}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Precio: </span>
                ${foundUser.plan?.price}
              </p>
              <button
                type="submit"
                className="p-1 rounded-xl w-56 h-8 bg-black text-white"
                onClick={registerPayment}
              >
                Registrar pago en efectivo
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegistrarPago;
