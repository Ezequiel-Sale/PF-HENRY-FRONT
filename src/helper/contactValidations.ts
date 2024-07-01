export interface IContactValues {
    name: string
    email: string
    message: string
}

export const contactValidations = (values: IContactValues) => {
    let errors: Partial<IContactValues> = {};
    const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexName = /^[a-zA-Z\s]+$/;

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
      if (!values.message.trim()) {
        errors.message = "Debes ingresar un mensaje";
      }
      return errors
}