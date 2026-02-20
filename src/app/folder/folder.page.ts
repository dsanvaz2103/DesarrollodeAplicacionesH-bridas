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
  skeletons: number[] = [1, 2, 3, 4, 5, 6];
  listaDeProductos: Producto[] = [];

  @ViewChild('productGrid', { read: ElementRef })
  productGrid!: ElementRef;

  // Propiedades para Preferencias
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
    this.isDarkMode = await this.preferences.getDarkMode();
    this.username = await this.preferences.getUsername();

    document.body.classList.toggle('dark', this.isDarkMode);

    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';

    if (this.folder === 'productos') {
      this.cargarProductosSimulados();
    }
  }

  async toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    await this.preferences.setDarkMode(this.isDarkMode);
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  async saveUsername(event: any) {
    const name = event.target.value;
    const finalName = name?.toString() || '';
    this.username = finalName;
    await this.preferences.setUsername(finalName);
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