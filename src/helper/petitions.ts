import { Anuncios } from "@/components/Dashboard/Anuncios/Anuncios";
import { ICredential } from "@/types/credentialInterface";
import { IProfesor } from "@/types/profesorInterface";
import { IFormValues } from "@/types/registerInterface";
const apiUri = process.env.NEXT_PUBLIC_API

// function getTokenFromLocalStorage() {
//   if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
//     const userSessionString = localStorage.getItem('userSession');

//     if (userSessionString) {
//       try {
//         return JSON.parse(userSessionString);
//       } catch (error) {
//         console.error('Error parsing user session from localStorage:', error);
//       }
//     }
//   } else {
//     console.warn('localStorage is not available peticiones');
//   }
// return undefined;
// }
// const token = getTokenFromLocalStorage();
// console.log("token petitions", token);
// if (token) {
//   console.log('Token obtenido:', token);
// } else {
//   console.log('No se encontró un token válido peticiones');
// }
export const registerUser = async (user: IFormValues) => {
    try {
      const response = await fetch(`http://localhost:3001/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      if (response.ok) {
        return response.json();
      }else {
        throw new Error('El usuario ya existe con esos datos');
      }
    } catch (error: any) {
      throw new Error(error);
    }
}

export async function getUsers() {
    try {
      const response = await fetch(`http://localhost:3001/users`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  export async function createProfesor(profesor: IProfesor) {
    try {
      const profesorData = {
        ...profesor,
        dia: Array.isArray(profesor.dia) ? profesor.dia : [profesor.dia],
        horario: Array.isArray(profesor.horario) ? profesor.horario : [profesor.horario]
      };
  
      const response = await fetch(`http://localhost:3001/profesor/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profesorData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      const createdProfesor = await response.json();
      return createdProfesor;
    } catch (error) {
      console.error('Error en la creación del profesor:', error);
      throw error;
    }
  }
  

export async function getProfesors() {
  try {
    const response = await fetch(`http://localhost:3001/profesor/profesores`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

export async function updateUserStatus(id: string) {
  try {
    const response = await fetch(`http://localhost:3001/profesor/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user status:', error);
  }
}


export async function loginUser({email, password}: ICredential) {
  try {
    const response = await fetch(`http://localhost:3001/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email , password, type: "user" ||  "profesor"}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const loginData = await response.json();
    return loginData;
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

export async function updateProfesorStatus(id: string) {
  console.log("Hola")
  try {
    const response = await fetch(`http://localhost:3001/profesor/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user status:', error);
  }
}

export const crearAnuncio = async ({message}: Anuncios) => {
  try {
      const response = await fetch(`${apiUri}/notifications/sendToAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message}),
      });
      if (!response.ok) {
        throw new Error(`Error al enviar la notificación: ${response.statusText}`);
      }
      const result = await response.json();
      console.log("Notificación enviada exitosamente:", result);
    } catch (error) {
      console.error("Error:", error);
    }
}

// export async function getNotifications() {
//   try {
//     const response = await fetch('http://localhost:3001/notifications/rutinaSubida');
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }
//     const notifications = await response.json();
//     return notifications;
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//   }
// }

export async function getUserData(userId: string) {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}