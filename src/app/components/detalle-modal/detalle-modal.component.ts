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
  // Recibe el producto desde la página de detalle o desde la lista
  @Input() producto: Producto = { id: 0, titulo: '', descripcion: '', imgUrl: '' };
  
  cargando = false; // Lo ponemos en false por defecto para evitar skeletons innecesarios
  esNuevo = false;
  esEdicion = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Verificamos si es un producto nuevo o existente
    if (!this.producto || this.producto.id === 0) {
      // MODO: CREAR
      this.esNuevo = true;
      this.esEdicion = false;
    } else {
      // MODO: MODIFICAR
      // Al activar esEdicion, el HTML debería mostrarte los inputs con los datos actuales
      this.esNuevo = false;
      this.esEdicion = true;
    }
    
    // Aseguramos que cargando sea false para que se vea el formulario inmediatamente
    this.cargando = false;
  }

  /**
   * Cierra el modal sin realizar cambios
   */
  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  /**
   * Envía los datos del formulario de vuelta a la página principal
   * Se llama 'agregar' para mantener compatibilidad con tu HTML actual
   */
  agregar() {
    this.modalCtrl.dismiss(this.producto, 'confirm');
  }
}