import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonApp, IonSplitPane, IonMenu, IonContent, IonList, 
  IonListHeader, IonNote, IonMenuToggle, IonItem, 
  IonIcon, IonRouterOutlet, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, storefrontOutline, cartOutline, 
  personOutline, settingsOutline, moonOutline,
  mailOutline, buildOutline // 'buildOutline' es genial para representar "ejes" o "herramientas"
} from 'ionicons/icons';

import { SettingsService } from './services/settings.service'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonLabel, CommonModule, RouterLink, RouterLinkActive,
    IonApp, IonSplitPane, IonMenu, IonContent, IonList,
    IonListHeader, IonNote, IonMenuToggle, IonItem,
    IonIcon, IonRouterOutlet
  ],
})
export class AppComponent implements OnInit {
  
  public appPages = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home-outline' },
    { title: 'Productos', url: '/folder/productos', icon: 'storefront-outline' },
    { title: 'Carrito', url: '/folder/carrito', icon: 'cart-outline' },
    { title: 'Cuenta', url: '/folder/cuenta', icon: 'person-outline' },
    { title: 'Configuración', url: '/ajustes', icon: 'settings-outline' }, 
  ];

  public username: string = '';

  constructor(private settings: SettingsService) {
    // Registramos solo iconos que existen 100% en la librería
    addIcons({ 
      homeOutline, 
      storefrontOutline, 
      cartOutline, 
      personOutline, 
      settingsOutline, 
      moonOutline,
      mailOutline, 
      buildOutline 
    });
  }

  async ngOnInit() {
    await this.cargarPreferencias();
  }

  async cargarPreferencias() {
    this.username = await this.settings.get('username') || 'Skater';
    const modoOscuro = await this.settings.get('modo_oscuro');

    if (modoOscuro) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}