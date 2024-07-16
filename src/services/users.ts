"use client";

import axios from "axios";

export const getUsers = async (pageIndex: number, pageSize: number) => {
  const response = await axios.get(
    `http://localhost:3001/users?page=${pageIndex}&limit=${pageSize}`
  );
  return response.data;
};
