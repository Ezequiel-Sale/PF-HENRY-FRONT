"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidations } from "@/helper/registerValidations";
import Link from "next/link";
import Swal from "sweetalert2";
import { registerUser } from "@/helper/petitions";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { IFormValues } from "@/types/registerInterface";

const Register: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = () => {
    if (form.current) {
      emailjs
        .sendForm(
          "service_470nr1h",
          "template_q5eze0c",
          form.current,
          "n0O6aFCx_KHd4rnfR"
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  useEffect(() => {
    // Leer los datos de la sesión de Google del localStorage
    const googleSession = JSON.parse(window.localStorage.getItem("googleSession") || "{}");

    if (googleSession.email && googleSession.name) {
      setEmail(googleSession.email);
      setName(googleSession.name);
      setPassword("R@@t12345");
      setIsDisabled(true);
    }
  }, []);


  const handleRegister = async (values: IFormValues, { resetForm }: any) => {
    try {
      const response = await registerUser(values);
      const userId = response.id; // Assuming your API response has the ID of the created user
      console.log("User registered:", response);

      // Store userId in localStorage
      window.localStorage.setItem("userId", userId);

      // Send email (assuming it's part of your flow)
      sendEmail();

      // Reset form
      resetForm();

      // Redirect to the next step or form
      router.push("/finalstep"); // Replace with your second form route
    } catch (error: any) {
      console.error("Error al registrar el usuario:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al registrar el usuario",
        text: error.message,
      });
    }
  };


  return (
    <div className="flex md:justify-start items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image.png')" }}>
      <div className="w-full max-w-2xl p-4 bg-black border border-gray-800 rounded-lg shadow sm:p-6 md:p-8 md:ml-10 md:mb-10">
        <Formik<IFormValues>
          initialValues={{
            name: name || "",
            email: email || "",
            phone: "",
            numero_dni: "",
            password: password || "",
            fecha_nacimiento: "",
            confirmPassword: password || "",
          }}
          enableReinitialize={true}
          validateOnChange
          validate={registerValidations}
          onSubmit={(values, { resetForm }) => {
            handleRegister(values, { resetForm });
          }}
        >
          {() => (
            <Form ref={form} className="grid grid-cols-2 gap-4">
              <h5 className="col-span-2 text-xl font-medium text-white">
                Registrate
              </h5>
              <p className="col-span-2 text-sm font-medium text-gray-300 text-center mb-4">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-red-500 hover:underline">
                  Click aquí para loguearte
                </Link>
              </p>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-white">Nombre y Apellido</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Ingrese su nombre completo"
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  id="name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                  disabled={isDisabled}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs text-center mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-white">Fecha de nacimiento</label>
                <Field
                  type="date"
                  name="fecha_nacimiento"
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                />
                <ErrorMessage name="fecha_nacimiento" component="div" className="text-red-500 text-xs text-center mt-1" />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-white">Correo electrónico</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="example@mail.com"
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  id="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                  disabled={isDisabled}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs text-center mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-white">Número de teléfono</label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Ingrese su número de teléfono"
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs text-center mt-1" />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-white">Número de DNI</label>
                <Field
                  type="text"
                  name="numero_dni"
                  placeholder="Ej: 01123456"
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                />
                <ErrorMessage name="numero_dni" component="div" className="text-red-500 text-xs text-center mt-1" />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-white">Contraseña</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="****"
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs text-center mt-1" />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium text-white">Repita su contraseña</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="****"
                  className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs text-center mt-1" />
              </div>
              <div className="col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Enviar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;