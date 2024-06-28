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
      const response = await fetch('http://localhost:3001/users');
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
      const response = await fetch('http://localhost:3001/profesor/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profesor),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const createdProfesor = await response.json();
      return createdProfesor;
    } catch (error) {
      console.error('Error creating profesor:', error);
    }
  }
  
  export async function getProfesors() {
    try {
      const response = await fetch('http://localhost:3001/profesor');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function updateUserStatus(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
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

  async function loginUser(credentials: ICredential) {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
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