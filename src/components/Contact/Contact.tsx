"use client";
import { IContactValues, contactValidations } from "@/helper/contactValidations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef } from "react";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef<HTMLFormElement | null>(null);

    const sendEmail = () => {
        if (form.current) {
            emailjs.sendForm('service_470nr1h', 'template_0k0oog7', form.current, 'n0O6aFCx_KHd4rnfR')
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
        <div className="flex md:justify-start items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image.png')" }}>
            <div className="w-full max-w-sm p-4 bg-black border border-gray-800 rounded-lg shadow sm:p-6 md:p-8 md:ml-10 md:mb-10">
                <h5 className="text-xl font-medium text-white mb-4">Contáctanos</h5>
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
                    {() => (
                        <Form ref={form} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Nombre y Apellido</label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Ingrese su nombre completo"
                                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Correo electrónico</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="example@mail.com"
                                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Mensaje</label>
                                <Field
                                    as="textarea"
                                    name="message"
                                    id="message"
                                    placeholder="Escriba su consulta"
                                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-24"
                                />
                                <ErrorMessage
                                    name="message"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Enviar
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Contact;