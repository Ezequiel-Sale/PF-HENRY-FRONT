"use client";

import axios from "axios";
const apiUri = process.env.NEXT_PUBLIC_API_URL;


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

export const userAlreadyExists = async (email: string, token: string) => {
  try {
    const response = await axios.post(
      `${apiUri}/users/exist`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    return response.status === 201;
  } catch (error) {
    throw error;
  }
};
