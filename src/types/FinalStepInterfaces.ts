export interface ICupos {
  nombre: string;
  horario: string;
  id: string;
  email: string;
  edad: number;
}
[];

export interface IHorariosProfesor {
  horario: string;
  cupos: number;
}

export interface IPlan {
  id: number;
  name: string;
  price: number;
}
