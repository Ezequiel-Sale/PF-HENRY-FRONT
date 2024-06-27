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

  