import { ICredential } from "@/types/credentialInterface";
import { IProfesor } from "@/types/profesorInterface";
import { IFormValues } from "@/types/registerInterface";

export const registerUser = async (user: IFormValues) => {
    try {
      const response = await fetch("http://localhost:3001/users/register", {
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
      const response = await fetch('http://localhost:3001/profesor/users');
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
  
      const response = await fetch('http://localhost:3001/profesor/create', {
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
    const response = await fetch('http://localhost:3001/profesor/profesores');
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
    const response = await fetch('http://localhost:3001/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email , password, type: "user" }),
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