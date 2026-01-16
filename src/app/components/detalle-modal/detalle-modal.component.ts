import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Nuevo producto</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">Cancelar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input placeholder="Título" [(ngModel)]="titulo"></ion-input>
      <ion-input placeholder="Descripción" [(ngModel)]="descripcion"></ion-input>
      <ion-input placeholder="URL Imagen" [(ngModel)]="imgUrl"></ion-input>

      <ion-button expand="block" (click)="guardar()">
        Guardar
      </ion-button>
    </ion-content>
  `
})
export class DetalleModalComponent {

  titulo = '';
  descripcion = '';
  imgUrl = '';

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    this.modalCtrl.dismiss(
      {
        titulo: this.titulo,
        descripcion: this.descripcion,
        imgUrl: this.imgUrl
      },
      'confirm'
    );
  }
}
