import {IFormValues} from "../types/registerType"


export const registerValidations: (values: IFormValues) => Partial<IFormValues> = (values) => {
    let errors: Partial<IFormValues> = {};
  
    const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexName = /^[a-zA-Z\s]+$/;
    const regexAdress = /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/;
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
    if (!values.phone) {
      errors.phone = "El telefono es requerido";
    }else if (!regexPhone.test(values.phone)) {
      errors.phone = "Ingrese unicamente numeros";
    }else if (values.phone.length < 10) {
      errors.phone = "Debe tener al menos 10 digitos";
    }else if (values.phone.length > 15) {
      errors.phone = "Ingrese un númer de telefono valido";
    }
    if (!values.address.trim()) {
      errors.address = "La dirección es requerida";
    }else if(!regexAdress.test(values.address)){
      errors.address = "Solo puede contener letras y numeros"
    }else if (values.address.length < 8) {
      errors.address = "Debe tener al menos 8 caracteres";
    }else if (values.address.length > 50) {
      errors.address = "Debe tener maximo 50 caracteres";
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