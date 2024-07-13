import axios from "axios"

export const sendMessage = async (message: string) => {
  const response = await axios.post("http://localhost:3001/chatbot", {
    message,
  });
  return response.data;
}