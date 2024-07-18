// Login.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import getGoogleProvider from "@/services/firebase";
import { signInWithPopup } from "firebase/auth";
import { loginSchema } from "@/zod/loginShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/helper/petitions";
import { useRouter } from "next/navigation";
import { userAlreadyExists } from "@/services/auth";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "password" : "text";
    }
  };

  // Hook para manejar la redirección basada en el rol
  // useEffect(() => {
  //   if (userRole) {
  //     console.log("User role updated:", userRole); // Log para verificar cuando userRole cambia
  //     if (userRole === "admin") {
  //       router.push("/dashboard");
  //     } else if (userRole === "profesor") {
  //       router.push("/dashboard-profesor");
  //     } else if (userRole === "user") {
  //       router.push("/userdashboard");
  //     }
  //   }
  // }, [userRole, router]);
  

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      console.log("User session from localStorage:", JSON.parse(userSession));
    }
  }, []);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await loginUser(values);
      console.log("Login response:", response); // Verifica la respuesta de login
      if (response && response.token && response.user && response.id) {
        const { token, user, id } = response;
        const userSession = { token, role: user, id };
        console.log("Setting user session:", userSession); // Log para verificar el valor que se está guardando
        localStorage.setItem("userSession", JSON.stringify(userSession));
        // Configurar la cookie
        document.cookie = `userSession=${token}; path=/; max-age=86400; SameSite=Strict;`;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sesión iniciada exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserRole(user); // Establecer el rol del usuario para la redirección
        console.log("Setting user role:", user); // Verifica que el rol se está estableciendo
        if (user === "admin") {
          router.push("/dashboard");
        } else if (user === "profesor") {
          router.push("/dashboard-profesor");
        } else if (user === "user") {
          router.push("/userdashboard");
        }
      } else {
        console.error("Invalid response structure:", response);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Estructura de respuesta inválida",
          showConfirmButton: true,
        });
      }
    } catch (error: any) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al iniciar sesión",
        text: error.message,
        showConfirmButton: true,
      });
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { auth, googleProvider } = getGoogleProvider();
      const result = await signInWithPopup(auth, googleProvider);
  
      const resultFullProps: typeof result & {
        user: {
          accessToken: string;
          uid: string;
          email: string;
          displayName: string;
        };
      } = result as any;
  
      // Crear un objeto con los datos necesarios
      const googleSession = {
        token: resultFullProps.user.accessToken,
        id: resultFullProps.user.uid,
        email: resultFullProps.user.email,
        name: resultFullProps.user.displayName,
        role: "user" // Asignar un rol por defecto
      };
  
      // Guardar el objeto en el localStorage
      window.localStorage.setItem("googleSession", JSON.stringify(googleSession));
  
      // Crear una cookie de sesión
      document.cookie = `googleSession=${JSON.stringify(googleSession)}; path=/; max-age=86400; SameSite=Strict;`;
  
      // Redirigir al usuario al dashboard correspondiente
      router.push("/register");
    } catch (error) {
      console.error("Error en inicio de sesión con Google:", error);
    }
  };
  
  
  

  return (
    <div
      className="flex md:justify-start items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="w-full max-w-sm p-4 bg-black border border-gray-800 rounded-lg shadow sm:p-6 md:p-8 md:ml-10 md:mb-10">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <h5 className="text-xl font-medium text-white">
              Inicia sesión
            </h5>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Correo electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@gmail.com"
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-white">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          ref={passwordRef}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 256 256"
                            >
                              <g fill="white">
                                <path
                                  d="M128 56c-80 0-112 72-112 72s32 72 112 72s112-72 112-72s-32-72-112-72m0 112a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
                                  opacity=".2"
                                />
                                <path d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 256 256"
                            >
                              <g fill="white">
                                <path
                                  d="M128 56c-80 0-112 72-112 72s32 72 112 72s112-72 112-72s-32-72-112-72m0 112a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
                                  opacity=".2"
                                />
                                <path d="M53.92 34.62a8 8 0 1 0-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.1 127.1 0 0 0 52.07-10.83l22 24.21a8 8 0 1 0 11.84-10.76Zm47.33 75.84l41.67 45.85a32 32 0 0 1-41.67-45.85M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.2 133.2 0 0 1 25 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0 0 63.66 70l14.73 16.2A112 112 0 0 1 128 192m6-95.43a8 8 0 0 1 3-15.72a48.16 48.16 0 0 1 38.77 42.64a8 8 0 0 1-7.22 8.71a6 6 0 0 1-.75 0a8 8 0 0 1-8-7.26A32.09 32.09 0 0 0 134 96.57m113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 1 1-10.67-11.92a132.8 132.8 0 0 0 27.8-35.14a133.2 133.2 0 0 0-23.12-30.77C185.67 75.19 158.78 64 128 64a118.4 118.4 0 0 0-19.36 1.57A8 8 0 1 1 106 49.79A134 134 0 0 1 128 48c34.88 0 66.57 13.26 91.66 38.35c18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 0 1 0 6.5Z" />
                              </g>
                            </svg>
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Ingresar
            </button>
            <div className="text-sm font-medium text-gray-300">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="text-red-500 hover:underline">
                Regístrate
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-700"></div>
              <div className="mx-3 text-sm font-medium text-gray-300">O</div>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>
            <button
              type="button"
              className="flex items-center justify-center py-2 px-4 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              onClick={signInWithGoogle}
            >
              <svg
                viewBox="0 0 24 24"
                height="25"
                width="25"
                y="0px"
                x="0px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                  fill="#F44336"
                ></path>
                <path
                  d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                  fill="#2196F3"
                ></path>
                <path
                  d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                  fill="#FFC107"
                ></path>
                <path
                  d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,16.4294434,13.2138672,19,12,19z"
                  fill="#4CAF50"
                ></path>
              </svg>
              <span className="ml-2">Iniciar sesión con Google</span>
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
