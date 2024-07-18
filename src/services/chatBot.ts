import axios from "axios"
const apiUri = process.env.NEXT_PUBLIC_API_URL;

export const sendMessage = async (message: string) => {
  const response = await axios.post(`${apiUri}/chatbot`, {
    message,
  });
  return response.data;
}