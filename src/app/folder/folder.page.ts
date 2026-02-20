import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
// Importamos los componentes individuales para standalone
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonList, IonListHeader, IonLabel, IonItem, 
  IonThumbnail, IonSkeletonText, IonButton, IonIcon, 
  IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonAvatar, IonFab, IonFabButton, ModalController, AnimationController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // Importante para registrar iconos
import { settingsOutline, cartOutline, flame, add, personOutline, moonOutline, receiptOutline, logOutOutline } from 'ionicons/icons'; // Añadido 'add'

// Interfaces y Servicios
import { Producto } from '../interfaces/producto';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';
import { TaskService } from '../services/task.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
    IonContent, IonList, IonListHeader, IonLabel, IonItem, 
    IonThumbnail, IonSkeletonText, IonButton, IonIcon, 
    IonGrid, IonRow, IonCol,
    IonAvatar, IonFab, IonFabButton
  ],
})
export class FolderPage implements OnInit {

  folder!: string;
  cargandoProductos = true;
  skeletons: number[] = [1, 2, 3, 4, 5, 6];
  listaDeProductos: Producto[] = [];
  username: string = '';

  @ViewChild('productGrid', { read: ElementRef })
  productGrid!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private productService: TaskService,
    private settings: SettingsService 
  ) {
    // REGISTRO DE ICONOS: Aquí es donde activamos el símbolo '+'
    addIcons({ 
      settingsOutline, 
      cartOutline, 
      flame, 
      add, // El icono para el botón flotante
      personOutline, 
      moonOutline, 
      receiptOutline, 
      logOutOutline 
    });
  }

  async ionViewWillEnter() {
    this.username = await this.settings.get('username') || 'Skater';
    
    if (this.folder === 'productos') {
      this.listaDeProductos = this.productService.getProductos();
      if (!this.cargandoProductos) {
        setTimeout(() => this.reproducirAnimacionProductos(), 50);
      }
    }
  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';
    this.username = await this.settings.get('username') || 'Skater';

    if (this.folder === 'productos') {
      this.cargarProductosSimulados();
    }
  }

  async saveUsername(event: any) {
    const name = event.target.value;
    const finalName = name?.toString() || '';
    this.username = finalName;
    await this.settings.set('username', finalName);
  }

  private cargarProductosSimulados() {
    this.cargandoProductos = true;
    setTimeout(() => {
      this.listaDeProductos = this.productService.getProductos();
      this.cargandoProductos = false;
      setTimeout(() => this.reproducirAnimacionProductos(), 100);
    }, 1500);
  }

  private reproducirAnimacionProductos() {
    if (!this.productGrid || !this.productGrid.nativeElement) return;
    const items = this.productGrid.nativeElement.querySelectorAll('.card-sombreada');
    if (items.length === 0) return;

    const itemsArray = Array.from(items) as HTMLElement[];
    itemsArray.forEach((item, index) => {
      this.animationCtrl.create()
        .addElement(item)
        .duration(400)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(15px)', 'translateY(0px)')
        .delay(index * 40)
        .play();
    });
  }

  async verDetalleProducto(producto: Producto) {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: { producto: producto }
    });
    await modal.present();
  }

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: {
        producto: { id: 0, titulo: '', descripcion: '', imgUrl: '' }
      }
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirm' && data) {
      this.productService.agregarProducto(data);
      this.listaDeProductos = this.productService.getProductos();
      setTimeout(() => this.reproducirAnimacionProductos(), 50);
    }
  }

  agregarAlCarrito(producto: Producto) {
    console.log('Añadido al carrito:', producto.titulo);
  }
}