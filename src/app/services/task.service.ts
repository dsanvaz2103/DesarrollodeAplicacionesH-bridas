import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  // Lista inicial de productos (puedes añadir los que quieras)
  private listaDeProductos: Producto[] = [
    { 
      id: 1, 
      titulo: "Tabla Santa Cruz Classic Dot", 
      descripcion: "Ideal para principiantes y expertos. Madera de arce de 7 capas.", 
      imgUrl: "assets/img/santa-cruz-classic-dot-skateboard-deck-c8.jpg" 
    },
    { 
      id: 2, 
      titulo: "Zapatillas DC Shoes", 
      descripcion: "Comodidad y estilo en cada truco. Suela reforzada para skate.", 
      imgUrl: "assets/img/adys100634_dcshoes,p_210_frt4.jpg" 
    },
    { 
      id: 3, 
      titulo: "Casco Pro", 
      descripcion: "Protección segura, ligera y con ventilación aerodinámica.", 
      imgUrl: "assets/img/protecciones.jpg" 
    }
  ];

  constructor() { }

  /**
   * Obtiene la lista completa de productos
   */
  getProductos(): Producto[] {
    return [...this.listaDeProductos];
  }

  /**
   * Busca un producto por su ID para la página de detalle
   */
  getProductoPorId(id: number): Producto | undefined {
    return this.listaDeProductos.find(p => p.id === id);
  }

  /**
   * AGREGAR PRODUCTO: Esta es la función que te faltaba y causaba el error
   */
  agregarProducto(producto: Producto) {
    const nuevoId = this.listaDeProductos.length > 0 
      ? Math.max(...this.listaDeProductos.map(p => p.id)) + 1 
      : 1;
      
    const nuevoProducto: Producto = { 
      ...producto, 
      id: nuevoId 
    };
    
    this.listaDeProductos.push(nuevoProducto);
  }

  /**
   * ELIMINAR PRODUCTO: Función clave para el Reto 4.13
   */
  eliminarProducto(id: number) {
    this.listaDeProductos = this.listaDeProductos.filter(p => p.id !== id);
  }
}