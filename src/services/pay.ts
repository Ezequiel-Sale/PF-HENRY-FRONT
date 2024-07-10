import axios from "axios";

interface IPay {
  metodoPago: string;
  userEmail: string;
  id_plan: number;
}

export const pay = async (data: IPay) => {
  const response = await axios.post("http://localhost:3001/payments", data);
  console.log("PAGO", response.data);
  return response.data;
};
