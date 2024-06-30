import { IFormValues } from "../types/registerInterface";

export const registerValidations: (
  values: IFormValues
) => Partial<IFormValues> = (values) => {
  let errors: Partial<IFormValues> = {};

  const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexName = /^[a-zA-Z\s]+$/;
  const regexPhone = /^[0-9]+$/;

  
  if (!values.name.trim()) {
    errors.name = "El nombre es requerido";
  } else if (!regexName.test(values.name)) {
    errors.name = "El nombre solo puede contener letras";
  }
  if (!values.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!regExEmail.test(values.email)) {
    errors.email = "Ingrese un email válido";
  }
  if (!values.fecha_nacimiento) {
    errors.fecha_nacimiento = "La fecha de nacimiento es requerida";
  } else {
    const birthdate = new Date(values.fecha_nacimiento);
    const maxDate = new Date("2023-12-31");
    if (birthdate > maxDate) {
      errors.fecha_nacimiento = "Ingrese una fecha de nacimiento valida";
    }
  }
  
  if (!values.phone) {
    errors.phone = "El telefono es requerido";
  } else if (!regexPhone.test(values.phone)) {
    errors.phone = "Ingrese unicamente numeros";
  } else if (values.phone.length < 10) {
    errors.phone = "Debe tener al menos 10 digitos";
  } else if (values.phone.length > 15) {
    errors.phone = "Ingrese un númer de telefono valido";
  }
  if (!values.numero_dni) {
    errors.numero_dni = "El número de DNI es requerido";
  } else if (!regexPhone.test(values.numero_dni)) {
    errors.numero_dni = "Solo puede contener numeros";
  } else if (values.numero_dni.length < 8) {
    errors.numero_dni = "Debe colocar los 8 caracteres";
  } else if (values.numero_dni.length > 8) {
    errors.numero_dni = "El número de DNI debe ser de 8 digitos";
  }
  
  if (!values.password && !localStorage.getItem("password")) {
    errors.password = "La contraseña es requerida";
  }
  
  if (!values.confirmPassword && !localStorage.getItem("confirmPassword")) {
    errors.confirmPassword = "La confirmación de contraseña es requerida";
  }
  
  if (!values.password.trim()) {
    errors.password = "Ingrese una contraseña";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Debe ser de entre 6 y 20 caracteres";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contrasenas no coinciden";
  }
  return errors;
};
