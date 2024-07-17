const apiUri = process.env.NEXT_PUBLIC_API;

export const getProfessors = async () => {
  const response = await fetch(
    `${apiUri}/profesor/profesores?page=1&limit=100`
  );
  return await response.json();
};
