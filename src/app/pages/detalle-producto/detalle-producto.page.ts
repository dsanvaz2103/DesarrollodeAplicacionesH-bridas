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
import { trashOutline, ribbonOutline, shieldCheckmarkOutline, alertCircleOutline, createOutline, saveOutline } from 'ionicons/icons';
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
    DetalleModalComponent 
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
    // Añadimos saveOutline por si lo usas en el modal
    addIcons({ trashOutline, ribbonOutline, shieldCheckmarkOutline, alertCircleOutline, createOutline, saveOutline });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      // Intentamos obtener el producto directamente
      this.producto = this.taskService.getProductoPorId(Number(id));
      
      // Si no aparece (por delay del storage), reintentamos una vez
      if (!this.producto) {
        setTimeout(() => {
          this.producto = this.taskService.getProductoPorId(Number(id));
          if (!this.producto) this.manejarError();
        }, 500);
      }
    }
  }

  async abrirModificar() {
    if (!this.producto) return;

    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: {
        // Pasamos la copia del producto. 
        // TIP: Asegúrate de que en el modal 'esEdicion' se ponga a true si id > 0
        producto: { ...this.producto } 
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data) {
      // 1. Guardar en el Storage a través del servicio
      await this.taskService.actualizarProducto(data);
      
      // 2. Refrescar la referencia local para que Angular detecte el cambio en el HTML
      this.producto = { ...data };

      const toast = await this.toastCtrl.create({
        message: 'Producto actualizado correctamente',
        duration: 2000,
        color: 'success', // Cambiado a success para feedback visual verde
        position: 'top'
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