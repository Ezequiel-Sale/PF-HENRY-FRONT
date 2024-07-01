"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidations } from "../../helper/registerValidations";
import Link from "next/link";
import Swal from "sweetalert2";
import "./register.css";
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
    const storedEmail = window.localStorage.getItem("email");
    const storedName = window.localStorage.getItem("name");

    if (storedEmail && storedName) {
      setEmail(storedEmail);
      setName(storedName);
      setPassword("R@@t12345");
      setIsDisabled(true);
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("name");
    }
  }, []);

  return (
    <div className="background-image h-[100vh] flex justify-end bg-black">
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
          console.log("********PASA********");
          console.log(values);
          sendEmail();
          registerUser(values)
            .then((res) => {
              console.log(res);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario registrado correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
              resetForm();
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            })
            .catch((err) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al registrar el usuario",
                text: err.message,
                showConfirmButton: true,
              });
            });
        }}
      >
        {() => {
          return (
            <Form
              ref={form}
              className="flex flex-col items-center gap-4 bg-black bg-opacity-50 px-3 rounded-lg mr-20 h-auto my-auto border border-solid border-gray-100 md:mb-32 "
            >
              <h2 className="text-2xl text-white font-sans font-extrabold">
                Formulario de registro
              </h2>
              <p className="text-xs text-white">
                Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-500 text-xs">
                  Click aqui para loguearte
                </Link>
              </p>
              <div className="flex flex-col w-full">
                <label className="font-bold text-white">
                  Nombre y Apellido
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Ingrese su nombre completo"
                  className="w-full pl-2 text-black rounded-md h-[30px] text-sm"
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
                  className="text-red-500 text-xs text-center absolute top-full ml-1"
                />
              </div>
              <div className="flex relative gap-2">
                <div className="flex flex-col text-white">
                  <label className="font-bold">Correo electronico</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="example@mail.com"
                    className="w-52 pl-2 text-black rounded-md h-[30px] text-sm"
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
                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                  />
                </div>
                <div className="flex flex-col text-white">
                  <label className="font-bold">Fecha de nacimiento</label>
                  <Field
                    type="date"
                    name="fecha_nacimiento"
                    placeholder="example@mail.com"
                    className="w-52 pl-2 text-black rounded-md h-[30px] text-sm"
                  />
                  <ErrorMessage
                    name="fecha_nacimiento"
                    component="div"
                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                  />
                </div>
              </div>
              <div className="flex relative gap-2">
                <div className="flex flex-col text-white">
                  <label className="font-bold">Numero de telefono</label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Ingrese su numero de telefono"
                    className="w-52 pl-2 text-black rounded-md h-[30px] text-sm"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className="font-bold text-white">Número de DNI</label>
                  <Field
                    type="text"
                    name="numero_dni"
                    placeholder="Ej: 01123456"
                    className="w-52 pl-2 text-black rounded-md h-[30px] text-sm"
                  />
                  <ErrorMessage
                    name="numero_dni"
                    component="div"
                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                  />
                </div>
              </div>
              (
              <div className="flex relative gap-2">
                <div className="flex flex-col relative mb-4">
                  <label className="font-bold text-white">Contraseña</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="********"
                    className="w-52 pl-2 text-black rounded-md h-[30px] text-sm"
                    id="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                    disabled={isDisabled}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold text-white">
                    Repita su contraseña
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    className="w-52 pl-2 text-black rounded-md h-[30px] text-sm"
                    id="confirmPassword"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                    disabled={isDisabled}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs text-center absolute top-full mt-[-16px] ml-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-red-600 w-60 h-8 text-white mb-4 rounded-md cursor-pointer hover:bg-red-800 hover:text-white"
              >
                Enviar
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
