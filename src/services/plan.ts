import axios from "axios";

export const getPlanById = async (idPlan: number) => {
  const response = await axios.get(`http://localhost:3001/plan/${idPlan}`);
  return await response.data;
};

export const getPlans = async () => {
  const response = await axios.get("http://localhost:3001/plan");
  return await response.data;
};
