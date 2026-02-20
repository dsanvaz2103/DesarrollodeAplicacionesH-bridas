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
  IonRouterOutlet, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  storefrontOutline, 
  cartOutline, 
  personOutline, 
  settingsOutline,
  moonOutline
} from 'ionicons/icons';

// 1. Corregimos la ruta de importación y el nombre de la clase
import { SettingsService } from './services/settings.service'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
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
    IonRouterOutlet
  ],
})
export class AppComponent implements OnInit {
  
  public appPages = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home-outline' },
    { title: 'Productos', url: '/folder/productos', icon: 'storefront-outline' },
    { title: 'Carrito', url: '/folder/carrito', icon: 'cart-outline' },
    { title: 'Cuenta', url: '/folder/cuenta', icon: 'person-outline' },
    { title: 'Configuración', url: '/folder/configuracion', icon: 'settings-outline' },
  ];

  public username: string = '';

  // 2. Cambiamos PreferencesService por SettingsService
  constructor(private settings: SettingsService) {
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
    // 3. Usamos el método genérico get() para recuperar el estado inicial
    const isDark = await this.settings.get('darkMode') || false;
    this.username = await this.settings.get('username') || 'Skater';

    // 4. Aplicamos el modo oscuro globalmente al arrancar la app
    document.body.classList.toggle('dark', isDark);
  }
}