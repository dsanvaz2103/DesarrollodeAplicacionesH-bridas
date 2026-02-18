import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController, AnimationController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Interfaces y Servicios
import { Producto } from '../interfaces/producto';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';
import { TaskService } from '../services/task.service';
import { PreferencesService } from '../services/preferences.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
})
export class FolderPage implements OnInit {

  folder!: string;

  // Propiedades para Productos
  cargandoProductos = true;
  skeletons: number[] = [1, 2, 3];
  listaDeProductos: Producto[] = [];

  @ViewChild('productGrid', { read: ElementRef })
  productGrid!: ElementRef;

  // 🔹 Propiedades para Preferencias (Persistencia)
  isDarkMode: boolean = false;
  username: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private productService: TaskService,
    private preferences: PreferencesService 
  ) {}

  async ngOnInit() {
    // 1. Leemos preferencias guardadas al iniciar
    this.isDarkMode = await this.preferences.getDarkMode();
    this.username = await this.preferences.getUsername();

    // Aplicamos el estado visual del modo oscuro inmediatamente
    document.body.classList.toggle('dark', this.isDarkMode);

    // 2. Leemos el parámetro de la ruta (/folder/:id)
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';

    // 3. Lógica para cargar productos si la ruta es 'productos'
    if (this.folder === 'productos') {
      this.cargarProductosSimulados();
    }
  }

  // --- MÉTODOS DE PREFERENCIAS (Solución a errores HTML) ---

  async toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Guardamos en el storage (Disco)
    await this.preferences.setDarkMode(this.isDarkMode);
    // Cambiamos la interfaz (Visual)
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  async saveUsername(name: any) {
    // Convertimos a string y evitamos nulos/undefined
    const finalName = name?.toString() || '';
    this.username = finalName;
    // Guardamos en el storage para que no haya "amnesia"
    await this.preferences.setUsername(finalName);
  }

  // --- MÉTODOS DE PRODUCTOS Y MODALES ---

  private cargarProductosSimulados() {
    this.cargandoProductos = true;
    setTimeout(() => {
      this.listaDeProductos = this.productService.getProductos();
      this.cargandoProductos = false;
      this.skeletons = Array(this.listaDeProductos.length).fill(0);

      // Animación de entrada
      setTimeout(() => this.reproducirAnimacionProductos(), 50);
    }, 2000);
  }

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data) {
      this.productService.agregarProducto(data);
      this.listaDeProductos = this.productService.getProductos();
      setTimeout(() => this.reproducirAnimacionProductos(), 50);
    }
  }

  private reproducirAnimacionProductos() {
    if (!this.productGrid) return;

    const items: HTMLElement[] = Array.from(
      this.productGrid.nativeElement.querySelectorAll('ion-item')
    );

    items.forEach((item, index) => {
      this.animationCtrl.create()
        .addElement(item)
        .duration(400)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(30px)', 'translateY(0px)')
        .delay(index * 100)
        .play();
    });
  }

  agregarAlCarrito(producto: Producto) {
    console.log('Producto agregado al carrito:', producto);
  }
}