import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Producto } from 'src/app/interfaces/producto';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonButton, IonIcon, IonCard, 
  IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonBadge, IonList, IonItem, IonLabel, IonListHeader } from '@ionic/angular/standalone';
import { AlertController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, ribbonOutline, shieldCheckmarkOutline, alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
  standalone: true,
  imports: [ 
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
    IonContent, IonButton, IonIcon, IonCard, IonCardHeader, 
    IonCardSubtitle, IonCardTitle, IonCardContent, IonBadge,
    IonList, IonItem, IonLabel
  ]
})
export class DetalleProductoPage implements OnInit {

  producto: Producto | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { 
    addIcons({ trashOutline, ribbonOutline, shieldCheckmarkOutline, alertCircleOutline });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.producto = this.taskService.getProductoPorId(Number(id));
    }

    if (!this.producto) {
      this.manejarError();
    }
  }

  async manejarError() {
    const toast = await this.toastCtrl.create({
      message: 'Elemento no encontrado',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
    this.router.navigate(['/folder/productos']);
  }

  async eliminarConConfirmacion() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar borrado',
      message: `¿Estás seguro de que quieres eliminar "${this.producto?.titulo}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sí, eliminar',
          handler: () => {
            if (this.producto) {
              // Borramos en el servicio
              this.taskService.eliminarProducto(this.producto.id);
              // Redirigimos a la lista (Mejora 2)
              this.router.navigate(['/folder/productos']);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}