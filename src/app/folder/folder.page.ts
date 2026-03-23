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
  ToastController, IonBadge,
  IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { 
  settingsOutline, cartOutline, flame, add, personOutline, 
  moonOutline, receiptOutline, logOutOutline, swapVerticalOutline,
  addCircleOutline, checkmarkCircleOutline, refreshOutline, trashOutline,
  cameraOutline, locateOutline, mapOutline, openOutline,
  shareSocialOutline // <-- AÑADIDO PARA EL 10
} from 'ionicons/icons'; 

// --- NATIVO: CAPACITOR (UT6) ---
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Share } from '@capacitor/share'; // <-- PLUGIN EXTRA 2 PARA EL 10

import { Producto } from '../interfaces/producto';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';
import { TaskService } from '../services/task.service';
import { SettingsService } from '../services/settings.service';
import { PhotoService } from '../services/photo'; 
import { LocationService } from '../services/location'; 

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
    IonBadge,
    IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCardContent 
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
    public productService: TaskService, 
    private settings: SettingsService,
    private toastCtrl: ToastController,
    public photoService: PhotoService,
    public locationService: LocationService 
  ) {
    addIcons({ 
      settingsOutline, cartOutline, flame, add, personOutline, 
      moonOutline, receiptOutline, logOutOutline, swapVerticalOutline,
      addCircleOutline, checkmarkCircleOutline, refreshOutline, trashOutline,
      cameraOutline, locateOutline, mapOutline, openOutline,
      shareSocialOutline // <-- REGISTRADO AQUÍ
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

  // --- LÓGICA NATIVA: COMPARTIR (MEJORA 2 - RA4.ce2) ---
  async compartirApp() {
    try {
      await Share.share({
        title: 'Urban Skate Shop',
        text: '¡Mira qué tablas de skate más guapas en la tienda de Javi!',
        url: 'https://github.com/tu-usuario/tu-repo', // Cambia por tu URL real
        dialogTitle: 'Compartir con amigos',
      });
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {
      console.log('Compartir cancelado o error');
    }
  }

  // --- LÓGICA NATIVA: CÁMARA ---
  async cambiarFotoPerfil() {
    try {
      await this.photoService.tomarFoto();
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {
      console.log('Error o cancelación de cámara');
    }
  }

  // --- LÓGICA NATIVA: GPS (UT6.2) ---
  async obtenerGPS() {
    try {
      await this.locationService.obtenerPosicionActual();
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.log("Error de permisos o GPS apagado");
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

  // --- LÓGICA DEL CARRITO CON VIBRACIÓN (MEJORA 1 - RA4.ce2) ---
  async agregarAlCarrito(producto: Producto) {
    await this.productService.agregarAlCarrito(producto);
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (e) { }

    const toast = await this.toastCtrl.create({
      message: `🛒 ${producto.titulo} añadido`,
      duration: 1500,
      color: 'dark'
    });
    await toast.present();
  }

  // --- FINALIZAR PEDIDO ---
  async realizarPedido() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) { }

    const toast = await this.toastCtrl.create({
      message: '¡Pedido realizado con éxito! 🛹',
      duration: 3000,
      color: 'success',
      position: 'middle'
    });
    await toast.present();
    
    await this.productService.limpiarCarrito(); 
  }

  // --- MANTENIMIENTO ---
  async restablecerTodo() {
    await this.productService.restablecerCatalogo();
    this.obtenerProductos();
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