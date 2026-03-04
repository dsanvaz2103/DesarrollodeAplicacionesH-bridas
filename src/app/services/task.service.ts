import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private listaDeProductos: Producto[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.cargarDeStorage();
  }

  async cargarDeStorage() {
    const guardados = await this._storage?.get('productos');
    if (guardados && guardados.length > 0) {
      this.listaDeProductos = guardados;
    } else {
      // Datos iniciales por defecto
      this.listaDeProductos = [
        { id: 1, titulo: "Tabla Santa Cruz", descripcion: "Madera de arce canadiense.", imgUrl: "assets/img/santa-cruz-classic-dot-skateboard-deck-c8.jpg" },
        { id: 2, titulo: "Zapatillas DC", descripcion: "Suela reforzada para skate.", imgUrl: "assets/img/adys100634_dcshoes,p_210_frt4.jpg" },
        { id: 3, titulo: "Casco Pro", descripcion: "Protección certificada.", imgUrl: "assets/img/protecciones.jpg" }
      ];
      await this.guardarEnStorage();
    }
  }

  private async guardarEnStorage() {
    await this._storage?.set('productos', this.listaDeProductos);
  }

  // MÉTODO CON FILTROS (Para nota máxima)
  getProductos(query: string = '', campo: string = 'titulo'): Producto[] {
    let resultado = [...this.listaDeProductos];

    // Filtrar por texto
    if (query) {
      resultado = resultado.filter(p => 
        p.titulo.toLowerCase().includes(query.toLowerCase()) || 
        p.descripcion.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Ordenar dinámicamente
    resultado.sort((a: any, b: any) => {
      const valA = a[campo].toString().toLowerCase();
      const valB = b[campo].toString().toLowerCase();
      return valA > valB ? 1 : (valA < valB ? -1 : 0);
    });

    return resultado;
  }

  getProductoPorId(id: number): Producto | undefined {
    return this.listaDeProductos.find(p => p.id === id);
  }

  async agregarProducto(producto: Producto) {
    const nuevoId = this.listaDeProductos.length > 0 
      ? Math.max(...this.listaDeProductos.map(p => p.id)) + 1 
      : 1;
    this.listaDeProductos.push({ ...producto, id: nuevoId });
    await this.guardarEnStorage();
  }

  async actualizarProducto(productoEditado: Producto) {
    const index = this.listaDeProductos.findIndex(p => p.id === productoEditado.id);
    if (index !== -1) {
      this.listaDeProductos[index] = { ...productoEditado };
      await this.guardarEnStorage();
    }
  }

  async eliminarProducto(id: number) {
    this.listaDeProductos = this.listaDeProductos.filter(p => p.id !== id);
    await this.guardarEnStorage();
  }
}