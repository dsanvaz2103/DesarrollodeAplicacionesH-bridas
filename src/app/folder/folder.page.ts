import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController, AnimationController, Animation } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Producto } from '../interfaces/producto';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';

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

  listaDeProductos: Producto[] = [
    { id: 1, titulo: "Tabla Santa Cruz Classic Dot", descripcion: "Ideal para principiantes y expertos.", imgUrl: "assets/img/santa-cruz-classic-dot-skateboard-deck-c8.jpg" },
    { id: 2, titulo: "Zapatillas DC Shoes", descripcion: "Comodidad y estilo en cada truco.", imgUrl: "assets/img/adys100634_dcshoes,p_210_frt4.jpg" },
    { id: 3, titulo: "Casco Pro", descripcion: "Protección segura y ligera.", imgUrl: "assets/img/protecciones.jpg" }
  ];

  @ViewChild('productGrid', { read: ElementRef }) productGrid!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';

    if (this.folder === 'productos') {
      // Simula carga de productos
      setTimeout(() => {
        this.cargandoProductos = false;
        this.skeletons = Array(this.listaDeProductos.length).fill(0);

        setTimeout(() => this.reproducirAnimacionProductos(), 50);
      }, 2000);
    }
  }

  async abrirModalAgregar() {
    // Aseguramos que el modal se abra correctamente
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: {}  // si necesitas pasar props
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data) {
      const nuevoProducto: Producto = { ...data, id: this.listaDeProductos.length + 1 };
      this.listaDeProductos.push(nuevoProducto);

      setTimeout(() => this.reproducirAnimacionProductos(), 50);
    }
  }

  agregarAlCarrito(producto: Producto) {
    console.log('Producto agregado al carrito:', producto);
  }

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
