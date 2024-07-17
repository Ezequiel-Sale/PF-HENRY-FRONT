"use client";

import { Anuncios } from "@/components/Dashboard/Anuncios/Anuncios";
import { ICredential } from "@/types/credentialInterface";
import { IProfesor } from "@/types/profesorInterface";
import { IFormValues } from "@/types/registerInterface";
import axios from "axios";
import Swal from "sweetalert2";
const apiUri = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (user: IFormValues) => {
  try {
    const response = await fetch(`${apiUri}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("El usuario ya existe con esos datos");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function createProfesor(profesor: IProfesor) {
  try {
    const profesorData = {
      ...profesor,
      dia: Array.isArray(profesor.dia) ? profesor.dia : [profesor.dia],
      horario: Array.isArray(profesor.horario)
        ? profesor.horario
        : [profesor.horario],
    };


    const response = await fetch(`${apiUri}/profesor/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profesorData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const createdProfesor = await response.json();
    return createdProfesor;
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    throw error;
  }
}

export async function getProfesors(page: number, limit: number) {
  try {
    const response = await axios.get(
      `${apiUri}/profesor/profesores?page=${page}&limit=${limit}`
    );
    console.log("Profesores ***", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function updateUserStatus(id: string) {
  try {
    const response = await fetch(`${apiUri}/profesor/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user status:", error);
  }
}

export async function loginUser({ email, password }: ICredential) {
  try {
    const response = await fetch(`${apiUri}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, type: "user" || "profesor" }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const loginData = await response.json();
    return loginData;
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export async function updateProfesorStatus(id: string) {
  try {
    const response = await fetch(`${apiUri}/profesor/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user status:", error);
  }
}

export const crearAviso = async ({ message }: Anuncios) => {
  try {
    const response = await fetch(`${apiUri}/avisos/enviarAtodos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        durationInHours: 1,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Error al enviar la notificación: ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log("Notificación enviada exitosamente:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function getUserData(userId: string) {
  if (!userId) {
    throw new Error("El ID del usuario es undefined");
  }

  try {
    const response = await fetch(`${apiUri}/users/${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `¡Error HTTP! estado: ${response.status}, mensaje: ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
}

//export const getUserData = async (userId) => {
//   try {
//     const response = await fetch(`/api/user/${userId}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return null;
//   }
// };
