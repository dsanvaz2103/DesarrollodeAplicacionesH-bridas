import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonApp, 
  IonSplitPane, 
  IonMenu, 
  IonContent, 
  IonList, 
  IonListHeader, 
  IonNote, 
  IonMenuToggle, 
  IonItem, 
  IonIcon, 
  IonRouterOutlet, IonLabel, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  storefrontOutline, 
  cartOutline, 
  personOutline, 
  settingsOutline,
  moonOutline
} from 'ionicons/icons';

// Importamos el servicio para evitar la "amnesia" de la app
import { PreferencesService } from './services/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonLabel,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonRouterOutlet],
})
export class AppComponent implements OnInit {
  
  // Definición de las rutas del menú lateral
  public appPages = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home-outline' },
    { title: 'Productos', url: '/folder/productos', icon: 'storefront-outline' },
    { title: 'Carrito', url: '/folder/carrito', icon: 'cart-outline' },
    { title: 'Cuenta', url: '/folder/cuenta', icon: 'person-outline' },
    { title: 'Configuración', url: '/folder/configuracion', icon: 'settings-outline' },
  ];

  public username: string = '';

  constructor(private preferences: PreferencesService) {
    // Registramos los iconos que vamos a usar en el menú
    addIcons({ 
      homeOutline, 
      storefrontOutline, 
      cartOutline, 
      personOutline, 
      settingsOutline,
      moonOutline 
    });
  }

  async ngOnInit() {
    // 1. Al arrancar, recuperamos las preferencias del "disco duro" (Storage)
    const isDark = await this.preferences.getDarkMode();
    this.username = await this.preferences.getUsername();

    // 2. Aplicamos el modo oscuro visualmente si estaba activado
    // Esto evita que la app "parpadee" en blanco al recargar
    document.body.classList.toggle('dark', isDark);
  }
}