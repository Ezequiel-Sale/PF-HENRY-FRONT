"use client";

import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/signin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
