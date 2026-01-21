import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private listaDeProductos: Producto[] = [
    { id: 1, titulo: "Tabla Santa Cruz Classic Dot", descripcion: "Ideal para principiantes y expertos.", imgUrl: "assets/img/santa-cruz-classic-dot-skateboard-deck-c8.jpg" },
    { id: 2, titulo: "Zapatillas DC Shoes", descripcion: "Comodidad y estilo en cada truco.", imgUrl: "assets/img/adys100634_dcshoes,p_210_frt4.jpg" },
    { id: 3, titulo: "Casco Pro", descripcion: "Protección segura y ligera.", imgUrl: "assets/img/protecciones.jpg" }
  ];

  constructor() { }

  getProductos(): Producto[] {
    return [...this.listaDeProductos];
  }

  agregarProducto(producto: Producto) {
    const nuevoProducto: Producto = { ...producto, id: Date.now() };
    this.listaDeProductos.push(nuevoProducto);
  }

  getProductoPorId(id: number): Producto | undefined {
    return this.listaDeProductos.find(p => p.id === id);
  }
}
