"use client";
import { crearAnuncio } from "@/helper/petitions";
import { Field, Form, Formik } from "formik";
import React from "react";

export interface Anuncios {
  message: string;
}
const Anuncios = () => {

  return (
    <>
     <div className="max-w-lg mx-auto my-8">
     <h1 className="text-3xl font-bold text-center mb-6">Anuncios</h1>
      <Formik<Anuncios>
        initialValues={{
          message: "",
        }}
        validateOnChange
        onSubmit={async (values) => {
          console.log(values)
          crearAnuncio(values);
        }}
      >
        {() => (
         <Form className="space-y-4">
         <label htmlFor="message" className="block font-medium">
           Mensaje del anuncio
         </label>
         <Field
           as="textarea"
           id="message"
           name="message"
           rows="4"
           className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
         />
         <button
           type="submit"
           className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
         >
           Enviar
         </button>
       </Form>
        )}
      </Formik>
     </div>
    </>
  );
};

export default Anuncios;
