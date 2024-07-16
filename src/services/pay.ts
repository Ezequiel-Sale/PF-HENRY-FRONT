import axios from "axios";

interface IPay {
  metodoPago: string;
  id_plan: number;
  userEmail: string;
  id_profesor?: string;
  diasSeleccionados?: string[];
  horarios?: string[];

}

export const pay = async (data: IPay) => {
  const response = await axios.post("http://localhost:3001/payments", data);
  return response.data;
};
