import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styleUrls: ['./detalle-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class DetalleModalComponent {

  nuevoProducto: Partial<Producto> = {};

  constructor(private modalCtrl: ModalController) {}

  // Cierra el modal sin retornar datos
  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // Envía los datos del nuevo producto al cerrar el modal
  agregar() {
    if (this.nuevoProducto.titulo && this.nuevoProducto.descripcion && this.nuevoProducto.imgUrl) {
      this.modalCtrl.dismiss(this.nuevoProducto, 'confirm');
    } else {
      // Puedes agregar un alert si quieres avisar que faltan campos
      console.warn('Faltan campos por completar');
    }
  }
}
