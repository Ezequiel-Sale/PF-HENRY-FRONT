import axios from "axios";

export const getHorariosCupos = async (idProfesor: string) => {
  const response = await axios.get(
    `http://localhost:3001/profesor/cupos?id=${idProfesor}`
  );
  return response.data;
};
