"use client";

import axios from "axios";
const apiUri = process.env.NEXT_PUBLIC_API;


export const getUsers = async (pageIndex: number, pageSize: number) => {
  const response = await axios.get(
    `${apiUri}/users?page=${pageIndex}&limit=${pageSize}`
  );
  return response.data;
};
