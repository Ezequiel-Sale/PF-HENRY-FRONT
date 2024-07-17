import axios from "axios";
const apiUri = process.env.NEXT_PUBLIC_API_URL;

export const getHorariosCupos = async (idProfesor: string) => {
  const response = await axios.get(
    `${apiUri}/profesor/cupos?id=${idProfesor}`
  );
  return response.data;
};
