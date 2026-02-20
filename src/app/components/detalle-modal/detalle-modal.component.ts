import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styleUrls: ['./detalle-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class DetalleModalComponent implements OnInit {
  @Input() producto: Producto = { id: 0, titulo: '', descripcion: '', imgUrl: '' };
  
  cargando = true;
  esNuevo = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Si entramos sin datos, activamos modo formulario
    if (!this.producto || !this.producto.titulo) {
      this.esNuevo = true;
      this.cargando = false;
    } else {
      setTimeout(() => {
        this.cargando = false;
      }, 1200);
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  agregar() {
    this.modalCtrl.dismiss(this.producto, 'confirm');
  }
}