export interface User {
    id: string;
    email: string;
    password: string;
    name?: string;
    Rol?: string;
    image?: string;
}

export interface Equipo {
  codigo_Contable: string,
  codigo: string;
  marca: string;
  modelo: string;
  descripcion: string;
  serie: string;
  color: string;
  anio: string;
  estado: string;
  ubicacion: string;
  observacion: string;
  factura:string;
  precio: number;
  baja?: boolean;
  aceptar?: boolean;
}