export interface IProfesor {
    id?: string;
    nombre: string;
    edad: string;
    email: string;
    dia: string[];
    horario: string[];
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    fecha_nacimiento: string;
    numero_dni: string;
}