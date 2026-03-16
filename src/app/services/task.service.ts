import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private listaDeProductos: Producto[] = [];
  private carrito: Producto[] = [];
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
    // Cargar Catálogo de Productos
    const guardados = await this._storage?.get('productos');
    if (guardados && guardados.length > 5) {
      this.listaDeProductos = guardados;
    } else {
      await this.restablecerCatalogo();
    }

    // --- NUEVO: Cargar Carrito guardado para no perderlo al refrescar ---
    const carritoGuardado = await this._storage?.get('carrito');
    if (carritoGuardado) {
      this.carrito = carritoGuardado;
    }
  }

  // --- MÉTODOS DEL CARRITO CON PERSISTENCIA ---
  
  async agregarAlCarrito(producto: Producto) {
    this.carrito.push(producto);
    await this.guardarCarritoEnStorage(); // Guardar en memoria física
    console.log('Carrito guardado en storage. Items:', this.carrito.length);
  }

  getCarrito() {
    return this.carrito;
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((total, p) => total + p.precio, 0);
  }

  async quitarDelCarrito(id: number) {
    // Filtramos para quitar el producto
    this.carrito = this.carrito.filter(p => p.id !== id);
    await this.guardarCarritoEnStorage(); // Actualizar storage
    console.log('Producto quitado y storage actualizado.');
  }

  // --- NUEVO: Limpiar carrito al finalizar pedido ---
  async limpiarCarrito() {
    this.carrito = [];
    await this.guardarCarritoEnStorage();
  }

  private async guardarCarritoEnStorage() {
    await this._storage?.set('carrito', this.carrito);
  }

  // --- MÉTODOS DE CONSULTA Y CRUD DEL CATÁLOGO ---
  
  getProductos(query: string = '', campo: string = 'titulo'): Producto[] {
    let resultado = [...this.listaDeProductos];
    if (query) {
      resultado = resultado.filter(p => 
        p.titulo.toLowerCase().includes(query.toLowerCase()) || 
        p.descripcion.toLowerCase().includes(query.toLowerCase())
      );
    }
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

  // --- MANTENIMIENTO ---
  async restablecerCatalogo() {
    this.listaDeProductos = [
      { id: 1, titulo: "Tabla Santa Cruz Classic", descripcion: "8.0\" Arce canadiense.", imgUrl: "assets/img/santa-cruz-classic-dot-skateboard-deck-c8.jpg", precio: 65.99 },
      { id: 2, titulo: "Zapatillas DC Shoes", descripcion: "Modelo Court Graffik.", imgUrl: "assets/img/adys100634_dcshoes,p_210_frt4.jpg", precio: 79.95 },
      { id: 3, titulo: "Casco Pro-Tec", descripcion: "Protección certificada.", imgUrl: "assets/img/protecciones.jpg", precio: 45.00 },
      { id: 4, titulo: "Ejes Independent Stage 11", descripcion: "Hollow Silver 144mm.", imgUrl: "assets/img/ejes.jpg", precio: 68.50 },
      { id: 5, titulo: "Ruedas Spitfire Formula Four", descripcion: "99D Classic Shape.", imgUrl: "assets/img/ruedas.jpg", precio: 52.00 },
      { id: 6, titulo: "Rodamientos Bones Reds", descripcion: "Alta velocidad y durabilidad.", imgUrl: "assets/img/rodamientos.jpg", precio: 22.90 },
      { id: 7, titulo: "Tabla Element Section", descripcion: "Ideal para Street.", imgUrl: "assets/img/tabla-element.jpg", precio: 55.00 },
      { id: 8, titulo: "Lija Grizzly Grip", descripcion: "Máximo agarre.", imgUrl: "assets/img/lija.jpg", precio: 12.00 },
      { id: 9, titulo: "Llave T Multiusos", descripcion: "Herramienta esencial.", imgUrl: "assets/img/herramienta.jpg", precio: 14.50 },
      { id: 10, titulo: "Cera Skate Wax", descripcion: "Desliza en cualquier sitio.", imgUrl: "assets/img/cera.jpg", precio: 7.95 }
    ];
    await this.guardarEnStorage();
  }

  private async guardarEnStorage() {
    await this._storage?.set('productos', this.listaDeProductos);
  }
}