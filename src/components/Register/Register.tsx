"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IFormValues } from "../../types/registerInterface";
import { registerValidations } from "../../helper/registerValidations";
import Link from "next/link";
import Swal from "sweetalert2";
import "./register.css";

const Register: React.FC = () => {
  return (
    <div className="background-image h-[100vh] flex justify-end bg-black">
      <Formik<IFormValues>
        initialValues={{
          name: "",
          email: "",
          phone: "",
          numero_dni: "",
          password: "",
          fecha_nacimiento: "",
          confirmPassword: "",
        }}
        validateOnChange
        validate={registerValidations}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario registrado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        }}
      >
        {() => {
          return (
            <Form className="flex flex-col items-center gap-4 bg-black bg-opacity-50 w-1/3 px-3 rounded-lg mr-20 h-auto my-auto border border-solid border-gray-100 md:mb-32 ">
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
              <div className="flex relative gap-2">
                <div className="flex flex-col relative mb-4">
                  <label className="font-bold text-white">Contraseña</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="********"
                    className="w-52 pl-2 text-black rounded-md h-[30px] text-sm"
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
