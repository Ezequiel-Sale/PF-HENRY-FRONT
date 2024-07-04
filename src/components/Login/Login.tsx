"use client";
import React, { useEffect, useState } from "react";
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

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Hook para manejar la redirección basada en el rol
  useEffect(() => {
    if (userRole) {
      console.log("User role updated:", userRole); // Log para verificar cuando userRole cambia
      if (userRole === "admin") {
        router.push("/dashboard");
      } else if (userRole === "profesor") {
        router.push("/dashboard-profesor");
      } else if (userRole === "user") {
        router.push("/dashboard/users");
      }
    }
  }, [userRole, router]);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await loginUser(values);
      console.log("Login response:", response); // Verifica la respuesta de login
      if (response && response.token && response.Role) {
        const { token, Role } = response;
        localStorage.setItem("userSession", JSON.stringify({ token: token, role: Role }));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sesión iniciada exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserRole(Role); // Establecer el rol del usuario para la redirección
        console.log("Setting user role:", Role); // Verifica que el rol se está estableciendo
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
        };
      } = result as any;

      try {
        const alreadyExists = await userAlreadyExists(
          resultFullProps.user.email ?? "",
          resultFullProps.user.accessToken
        );
        router.push("/dashboard/usuarios");
      } catch (error) {
        window.localStorage.setItem(
          "token",
          resultFullProps.user.accessToken ?? ""
        );
        window.localStorage.setItem("email", resultFullProps.user.email ?? "");
        window.localStorage.setItem(
          "name",
          resultFullProps.user.displayName ?? ""
        );
        router.push("/register");
      }
    } catch (error) {
      console.error(error);
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
              Inicia sesión en tu cuenta
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
                      <Input
                        type="password"
                        placeholder="••••••••"
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
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-700 rounded bg-gray-900 focus:ring-3 focus:ring-red-300"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-300"
                >
                  Recuérdame
                </label>
              </div>
              <a
                href="#"
                className="ms-auto text-sm text-red-500 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Iniciar sesión
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
