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
import { SettingsService } from '../services/settings.service';

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
  skeletons: number[] = [1, 2, 3, 4, 5, 6];
  listaDeProductos: Producto[] = [];

  @ViewChild('productGrid', { read: ElementRef })
  productGrid!: ElementRef;

  // Solo mantenemos el username para el saludo personalizado
  username: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private productService: TaskService,
    private settings: SettingsService 
  ) {}

  async ngOnInit() {
    // 1. Cargamos el nombre (mantenemos tu personalización)
    this.username = await this.settings.get('username') || '';

    // ¡IMPORTANTE! Hemos borrado el toggle del body que había aquí.
    // Ahora esta página NO decide si la app es oscura o clara, 
    // respeta lo que diga el AppComponent.

    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';

    if (this.folder === 'productos') {
      this.cargarProductosSimulados();
    }
  }

  // Eliminado toggleDarkMode() - Ahora se hace en la página de Ajustes

  async saveUsername(event: any) {
    const name = event.target.value;
    const finalName = name?.toString() || '';
    this.username = finalName;
    await this.settings.set('username', finalName);
  }

  private cargarProductosSimulados() {
    this.cargandoProductos = true;
    setTimeout(() => {
      this.listaDeProductos = this.productService.getProductos();
      this.cargandoProductos = false;
      setTimeout(() => this.reproducirAnimacionProductos(), 100);
    }, 1500);
  }

  async verDetalleProducto(producto: Producto) {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: { producto: producto }
    });
    await modal.present();
  }

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: {
        producto: { id: 0, titulo: '', descripcion: '', imgUrl: '' }
      }
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
    const items = this.productGrid.nativeElement.querySelectorAll('.card-sombreada');
    if (items.length === 0) return;

    const itemsArray = Array.from(items) as HTMLElement[];
    itemsArray.forEach((item, index) => {
      this.animationCtrl.create()
        .addElement(item)
        .duration(500)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(20px)', 'translateY(0px)')
        .delay(index * 80)
        .play();
    });
  }

  agregarAlCarrito(producto: Producto) {
    console.log('Añadido al carrito:', producto.titulo);
  }
}