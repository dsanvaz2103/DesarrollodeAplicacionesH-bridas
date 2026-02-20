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
  personOutline, settingsOutline, moonOutline 
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
    addIcons({ 
      homeOutline, storefrontOutline, cartOutline, 
      personOutline, settingsOutline, moonOutline 
    });
  }

  async ngOnInit() {
    await this.cargarPreferencias();
  }

  async cargarPreferencias() {
    // Recuperamos tu nombre (Personalización)
    this.username = await this.settings.get('username') || 'Skater';

    // Recuperamos el Modo Oscuro con la clave oficial 4.12
    const modoOscuro = await this.settings.get('modo_oscuro');

    if (modoOscuro) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}