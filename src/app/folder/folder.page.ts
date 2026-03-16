import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonList, IonListHeader, IonLabel, IonItem, 
  IonThumbnail, IonSkeletonText, IonButton, IonIcon, 
  IonGrid, IonRow, IonCol, IonAvatar, IonFab, IonFabButton, 
  ModalController, AnimationController, IonSearchbar, IonSelect, IonSelectOption,
  ToastController, IonBadge // <--- AÑADIDO IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { 
  settingsOutline, cartOutline, flame, add, personOutline, 
  moonOutline, receiptOutline, logOutOutline, swapVerticalOutline,
  addCircleOutline, checkmarkCircleOutline, refreshOutline
} from 'ionicons/icons'; 

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
    IonGrid, IonRow, IonCol, IonAvatar, IonFab, IonFabButton,
    IonSearchbar, IonSelect, IonSelectOption,
    IonBadge // <--- AÑADIDO AQUÍ TAMBIÉN
  ],
})
export class FolderPage implements OnInit {

  folder!: string;
  cargandoProductos = true;
  skeletons: number[] = [1, 2, 3, 4, 5, 6];
  listaDeProductos: Producto[] = [];
  username: string = '';

  // Filtros
  queryBusqueda: string = '';
  campoOrden: string = 'titulo';

  @ViewChild('productGrid', { read: ElementRef }) productGrid!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    public productService: TaskService, // <--- CAMBIADO A PUBLIC para el HTML
    private settings: SettingsService,
    private toastCtrl: ToastController
  ) {
    addIcons({ 
      settingsOutline, cartOutline, flame, add, personOutline, 
      moonOutline, receiptOutline, logOutOutline, swapVerticalOutline,
      addCircleOutline, checkmarkCircleOutline, refreshOutline
    });
  }

  async ionViewWillEnter() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';
    this.username = await this.settings.get('username') || 'Skater';
    
    if (this.folder === 'productos') {
      this.obtenerProductos();
    }
  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';
    if (this.folder === 'productos') {
      this.cargarProductosSimulados();
    }
  }

  // --- LÓGICA DE PRODUCTOS Y FILTROS ---
  obtenerProductos() {
    this.listaDeProductos = this.productService.getProductos(this.queryBusqueda, this.campoOrden);
    if (!this.cargandoProductos) {
        setTimeout(() => this.reproducirAnimacionProductos(), 50);
    }
  }

  onSearchChange(event: any) {
    this.queryBusqueda = event.detail.value;
    this.obtenerProductos();
  }

  onSortChange(event: any) {
    this.campoOrden = event.detail.value;
    this.obtenerProductos();
  }

  // --- LÓGICA DEL CARRITO ---
  async agregarAlCarrito(producto: Producto) {
    this.productService.agregarAlCarrito(producto);

    const toast = await this.toastCtrl.create({
      message: `🛒 ${producto.titulo} añadido - ${producto.precio}€`,
      duration: 1500,
      position: 'bottom',
      color: 'dark',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  // --- MANTENIMIENTO ---
  async restablecerTodo() {
    await this.productService.restablecerCatalogo();
    this.obtenerProductos();
    
    const toast = await this.toastCtrl.create({
      message: 'Catálogo restablecido correctamente',
      duration: 2000,
      color: 'primary'
    });
    await toast.present();
  }

  // --- CARGA Y ANIMACIONES ---
  private cargarProductosSimulados() {
    this.cargandoProductos = true;
    setTimeout(() => {
      this.obtenerProductos();
      this.cargandoProductos = false;
      setTimeout(() => this.reproducirAnimacionProductos(), 100);
    }, 1200);
  }

  private reproducirAnimacionProductos() {
    if (!this.productGrid || !this.productGrid.nativeElement) return;
    const items = this.productGrid.nativeElement.querySelectorAll('.card-sombreada');
    Array.from(items).forEach((item: any, index: number) => {
      this.animationCtrl.create()
        .addElement(item)
        .duration(400)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(20px)', 'translateY(0px)')
        .delay(index * 40)
        .play();
    });
  }

  // --- MODALES ---
  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: { producto: { id: 0, titulo: '', descripcion: '', imgUrl: '', precio: 0 } }
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirm' && data) {
      await this.productService.agregarProducto(data);
      this.obtenerProductos();
    }
  }
}