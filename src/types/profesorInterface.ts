export interface IProfesor {
    id?: string;
    nombre: string;
    edad: string;
    email: string;
    dia: string[];
    horario: string[];
    password: string;
    estado?: boolean;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    fecha_nacimiento: string;
    numero_dni: string;
    estado?: string;
    role?: string;
}

export interface userSession {
    id: string;
    token: string;
    role: string;
    userData: {
        id: any;
        name: string;
        email: string;
        password: string;
        phone: string;
        fecha_nacimiento: string;
        numero_dni: string;
        role: string;
    }   
}