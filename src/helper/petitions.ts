// import { IFormValues } from "@/types/registerInterface";

// export const registerUser = async (user: IFormValues) => {
//     try {
//       const response = await fetch(/user/register, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       })
//       if (response.ok) {
//         return response.json();
//       }else {
//         throw new Error('El usuario ya existe con esos datos');
//       }
//     } catch (error: any) {
//       throw new Error(error);
//     }
// }