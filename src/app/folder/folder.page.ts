import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController, AnimationController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Producto } from '../interfaces/producto';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';
import { TaskService } from '../services/task.service'; // <-- Servicio actualizado

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    DetalleModalComponent
  ],
})
export class FolderPage implements OnInit {

  folder!: string;
  cargandoProductos: boolean = true;
  skeletons: number[] = [1, 2, 3];
  listaDeProductos: Producto[] = [];

  @ViewChild('productGrid', { read: ElementRef }) productGrid!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private taskService: TaskService // <-- Inyección del servicio
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';

    if (this.folder === 'productos') {
      // Simulamos carga de productos
      setTimeout(() => {
        this.listaDeProductos = this.taskService.getProductos(); // obtenemos productos desde TaskService
        this.cargandoProductos = false;
        this.skeletons = Array(this.listaDeProductos.length).fill(0);

        // Reproducimos animación de los items
        setTimeout(() => this.reproducirAnimacionProductos(), 50);
      }, 2000);
    }
  }

  /**
   * Abre un modal para agregar un nuevo producto
   */
  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: {}
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data) {
      // Agregamos el nuevo producto usando el servicio
      this.taskService.agregarProducto(data as Producto);

      // Actualizamos la lista
      this.listaDeProductos = this.taskService.getProductos();

      // Animamos los nuevos items
      setTimeout(() => this.reproducirAnimacionProductos(), 50);
    }
  }

  /**
   * Agrega un producto al carrito (solo logueo por ahora)
   */
  agregarAlCarrito(producto: Producto) {
    console.log('Producto agregado al carrito:', producto);
  }

  /**
   * Reproduce animación de aparición de productos
   */
  private reproducirAnimacionProductos() {
    if (!this.productGrid) return;

    const items: HTMLElement[] = Array.from(this.productGrid.nativeElement.querySelectorAll('ion-item'));

    items.forEach((item, index) => {
      const anim = this.animationCtrl.create()
        .addElement(item)
        .duration(400)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(30px)', 'translateY(0px)')
        .delay(index * 100);
      anim.play();
    });
  }
}
