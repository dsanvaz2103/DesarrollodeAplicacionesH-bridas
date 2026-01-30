import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController, AnimationController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Producto } from '../interfaces/producto';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';
import { TaskService } from '../services/task.service';

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

  cargandoProductos = true;
  skeletons: number[] = [1, 2, 3];
  listaDeProductos: Producto[] = [];

  @ViewChild('productGrid', { read: ElementRef })
  productGrid!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private productService: TaskService
  ) {}

  ngOnInit() {
    // 🔹 Leemos el parámetro dinámico del folder (/folder/:id)
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';

    // 🔹 Solo cargamos productos si estamos en /folder/productos
    if (this.folder === 'productos') {
      setTimeout(() => {
        this.listaDeProductos = this.productService.getProductos();
        this.cargandoProductos = false;
        this.skeletons = Array(this.listaDeProductos.length).fill(0);

        // Animación de entrada
        setTimeout(() => this.reproducirAnimacionProductos(), 50);
      }, 2000);
    }
  }

  // 🔹 Modal para añadir productos
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

  // 🔹 Simulación de carrito
  agregarAlCarrito(producto: Producto) {
    console.log('Producto agregado al carrito:', producto);
  }

  // 🔹 Animación de entrada de tarjetas
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
}
