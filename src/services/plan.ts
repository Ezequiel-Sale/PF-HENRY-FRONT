import { IPlan } from "@/types/FinalStepInterfaces";
import axios from "axios";

const urlApi = "http://localhost:3001/plan";

export const getPlanById = async (idPlan: number) => {
  const response = await axios.get(`${urlApi}/${idPlan}`);
  return await response.data;
};

export const getPlans: () => Promise<IPlan[]> = async () => {
  const response = await axios.get(urlApi);
  return await response.data;
};

export const createPlan = async (data: IPlanToCreate) => {
  const response = await axios.post(`${urlApi}/createplan`, data);
  return response.data.response;
};
