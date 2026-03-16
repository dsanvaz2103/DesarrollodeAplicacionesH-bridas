export interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  imgUrl: string;
  precio: number; // <--- ESTA ES LA CLAVE
}