import axios from "axios";
const apiUri = process.env.NEXT_PUBLIC_API_URL;

interface IPay {
  metodoPago: string;
  id_plan: number;
  userEmail: string;
  id_profesor?: string;
  diasSeleccionados?: string[];
  horarios?: string[];
}

export const pay = async (data: IPay) => {
  const response = await axios.post(`${apiUri}/payments`, data);
  return response.data;
};

export const getPayments = async (pageIndex: number, pageSize: number) => {
  const response = await axios.get(
    `${apiUri}/payments?page=${pageIndex}&limit=${pageSize}`
  );
  return response.data;
};
