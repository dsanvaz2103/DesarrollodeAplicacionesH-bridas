import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Producto } from 'src/app/interfaces/producto';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonButton, IonIcon, IonCard, 
  IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonBadge, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, ribbonOutline, shieldCheckmarkOutline, alertCircleOutline, createOutline } from 'ionicons/icons';
import { DetalleModalComponent } from '../../components/detalle-modal/detalle-modal.component';

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
    IonList, IonItem, IonLabel,
    DetalleModalComponent // <--- IMPORTANTE: Si esto no está aquí, el modal no se abre
  ]
})
export class DetalleProductoPage implements OnInit {

  producto: Producto | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController 
  ) { 
    addIcons({ trashOutline, ribbonOutline, shieldCheckmarkOutline, alertCircleOutline, createOutline });
  }

  async ngOnInit() {
    // Esperamos a que el servicio esté listo (importante por el Storage)
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      // Intentamos obtener el producto. 
      // Si el service carga del storage, puede tardar un poco.
      this.producto = this.taskService.getProductoPorId(Number(id));
    }

    if (!this.producto) {
      // Damos un margen por si el storage es lento
      setTimeout(() => {
        this.producto = this.taskService.getProductoPorId(Number(id));
        if(!this.producto) this.manejarError();
      }, 500);
    }
  }

  async abrirModificar() {
    if (!this.producto) return;

    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: {
        producto: { ...this.producto } 
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data) {
      // Guardamos permanentemente
      await this.taskService.actualizarProducto(data);
      // Refrescamos la vista
      this.producto = data;

      const toast = await this.toastCtrl.create({
        message: 'Producto actualizado correctamente',
        duration: 2000,
        color: 'primary'
      });
      await toast.present();
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
          handler: async () => {
            if (this.producto) {
              await this.taskService.eliminarProducto(this.producto.id);
              this.router.navigate(['/folder/productos']);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}