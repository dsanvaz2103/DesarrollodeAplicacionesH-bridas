import { Component } from '@angular/core';
import { IonicModule, ModalController, IonButton, IonInput, IonItem, IonList } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-detalle-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Nuevo Producto</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-input placeholder="Título" [(ngModel)]="producto.titulo"></ion-input>
        </ion-item>

        <ion-item>
          <ion-input placeholder="Descripción" [(ngModel)]="producto.descripcion"></ion-input>
        </ion-item>

        <ion-item>
          <ion-input placeholder="URL de la imagen" [(ngModel)]="producto.imgUrl"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="block" (click)="guardar()">Añadir Producto</ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class DetalleModalComponent {
  producto: Producto = { id: 0, titulo: '', descripcion: '', imgUrl: '' };

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (this.producto.titulo.trim() && this.producto.descripcion.trim()) {
      this.modalCtrl.dismiss(this.producto, 'confirm');
    }
  }
}
