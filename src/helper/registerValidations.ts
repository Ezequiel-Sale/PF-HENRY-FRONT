import {IFormValues} from "../types/registerInterface"


export const registerValidations: (values: IFormValues) => Partial<IFormValues> = (values) => {
    let errors: Partial<IFormValues> = {};
  
    const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexName = /^[a-zA-Z\s]+$/;
    const regexPhone = /^[0-9]+$/;

    if (!values.name.trim()) {
      errors.name = "El nombre es requerido";
    }else if (!regexName.test(values.name)) {
      errors.name = "El nombre solo puede contener letras";
    }
    if (!values.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!regExEmail.test(values.email)) {
      errors.email = "Ingrese un email válido";
    }
    if (!values.birthdate) {
      errors.birthdate = "La fecha de nacimiento es requerida";
    }else {
      const birthdate = new Date(values.birthdate);
      const maxDate = new Date('2023-12-31');
      if (birthdate > maxDate) {
        errors.birthdate = "Ingrese una fecha de nacimiento valida";
      }
    }

    if (!values.phone) {
      errors.phone = "El telefono es requerido";
    }else if (!regexPhone.test(values.phone)) {
      errors.phone = "Ingrese unicamente numeros";
    }else if (values.phone.length < 10) {
      errors.phone = "Debe tener al menos 10 digitos";
    }else if (values.phone.length > 15) {
      errors.phone = "Ingrese un númer de telefono valido";
    }
    if (!values.dni.trim()) {
      errors.dni = "El número de DNI es requerido";
    }else if(!regexPhone.test(values.dni)){
      errors.dni = "Solo puede contener numeros"
    }else if (values.dni.length < 8) {
      errors.dni = "Debe colocar los 8 caracteres";
    }else if (values.dni.length > 8) {
      errors.dni = "El número de DNI debe ser de 8 digitos";
    }

    if (!values.password.trim()) {
      errors.password = 
         "Ingrese una contraseña"
      
    } else if (
      values.password.length < 6 ||
      values.password.length > 20
    ) {
      errors.password =  "Debe ser de entre 6 y 20 caracteres"
      
    }  
    if(values.repitePassword !== values.password){
      errors.repitePassword = "Las contrasenas no coinciden"
    }
    return errors;
  }