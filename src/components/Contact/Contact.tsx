"use client";
import { IContactValues, contactValidations } from "@/helper/contactValidations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef } from "react";
import "../Register/register.css";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef<HTMLFormElement | null>(null);

    const sendEmail = () => {
        if (form.current) {
            emailjs.sendForm('service_470nr1h', 'template_q5eze0c', form.current, 'n0O6aFCx_KHd4rnfR')
            .then(
                () => {
                    console.log('SUCCESS!');
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Mensaje enviado correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error al enviar el mensaje",
                        text: error.text,
                        showConfirmButton: true,
                    });
                }
            );
        }
    };

    return (
        <div className="ml-10 background-image">
            <div className="text-3xl font-bold text-white my-5">Escribenos!</div>
            <Formik<IContactValues>
                initialValues={{
                    name: "",
                    email: "",
                    message: "",
                }}
                validateOnChange
                validate={contactValidations}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    sendEmail();
                    resetForm();
                }}
            >
                {() => {
                    return (
                        <Form ref={form} className="flex flex-col items-center justify-center gap-4 bg-black bg-opacity-50 w-[300px] px-3 py-3 mb-4 rounded-lg h-auto border border-solid border-gray-100 ">
                            <div className="flex flex-col relative">
                                <label className="font-bold text-white">Nombre y Apellido</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Ingrese su nombre completo"
                                    className="w-60 pl-2 text-black rounded-md h-[30px] text-sm"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                                />
                            </div>
                            <div className="flex flex-col text-white relative">
                                <label className="font-bold">Correo electronico</label>
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="example@mail.com"
                                    className="w-60 pl-2 text-black rounded-md h-[30px] text-sm"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                                />
                            </div>
                            <div className="flex flex-col relative mb-2">
                                <label className="font-bold text-white">Mensaje</label>
                                <Field
                                    as="textarea"
                                    name="message"
                                    placeholder="Escriba su consulta"
                                    className="w-60 pl-2 text-black rounded-md h-[100px] text-sm"
                                />
                                <ErrorMessage
                                    name="message"
                                    component="div"
                                    className="text-red-500 text-xs text-center absolute top-full ml-1"
                                />
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

export default Contact;
