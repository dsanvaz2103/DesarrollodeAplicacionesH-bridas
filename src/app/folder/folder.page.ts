import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule, ToastController, ModalController } from '@ionic/angular';
import { Producto } from '../interfaces/producto';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';
import { ProductoItemComponent } from '../components/producto-item/producto-item.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,          // ⚡ Incluye IonCard, IonItem, IonLabel, IonSkeletonText
    ProductoItemComponent // Nuestro componente standalone
  ],
})
export class FolderPage implements OnInit {
  folder!: string;
  listaDeProductos: Producto[] = [];
  cargando: boolean = true;

  private productosIniciales: Producto[] = [
    { id: 0, titulo: "Tabla Santa Cruz Classic Dot", descripcion: "Ideal para principiantes y expertos.", imgUrl: "assets/img/santa-cruz-classic-dot-skateboard-deck-c8.jpg" }, 
    { id: 1, titulo: "Zapatillas DC Shoes", descripcion: "Comodidad y estilo en cada truco.", imgUrl: "assets/img/adys100634_dcshoes,p_210_frt4.jpg" }, 
    { id: 2, titulo: "Casco Pro", descripcion: "Protección segura y ligera.", imgUrl: "assets/img/protecciones.jpg" }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';

    if(this.folder === 'productos'){
      setTimeout(() => {
        this.listaDeProductos = [...this.productosIniciales];
        this.cargando = false;
      }, 2000);
    } else {
      this.listaDeProductos = [...this.productosIniciales];
      this.cargando = false;
    }
  }

  async abrirModalAgregar() {
    const modal = await this.modalController.create({
      component: DetalleModalComponent
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirm' && data) {
      data.id = this.listaDeProductos.length;
      this.listaDeProductos.push(data);
      this.mostrarToast('Producto añadido correctamente!');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
