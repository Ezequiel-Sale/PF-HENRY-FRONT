export const getProfessors = async () => {
  const response = await fetch("http://localhost:3001/profesor/profesores");
  return await response.json();
};
