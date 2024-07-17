export const getProfessors = async () => {
  const response = await fetch(
    "http://localhost:3001/profesor/profesores?page=1&limit=100"
  );
  return await response.json();
};
