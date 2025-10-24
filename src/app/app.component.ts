import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp, IonSplitPane, IonMenu, IonContent, IonList,
  IonListHeader, IonNote, IonMenuToggle, IonItem,
  IonIcon, IonLabel, IonRouterOutlet, IonRouterLink
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline, homeSharp,
  storefrontOutline, storefrontSharp,
  cartOutline, cartSharp,
  personOutline, personSharp,
  receiptOutline, receiptSharp,
  heartOutline, heartSharp,
  settingsOutline, settingsSharp
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent,
    IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel,
    IonRouterLink, IonRouterOutlet
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home' },
    { title: 'Productos', url: '/folder/productos', icon: 'storefront' },
    { title: 'Carrito', url: '/folder/carrito', icon: 'cart' },
    { title: 'Cuenta', url: '/folder/cuenta', icon: 'person' },
    { title: 'Configuración', url: '/folder/configuracion', icon: 'settings' },
  ];

  public labels = ['Ofertas', 'Marcas', 'Accesorios', 'Ropa', 'Tablas', 'Zapatos'];

  constructor() {
    addIcons({
      homeOutline, homeSharp,
      storefrontOutline, storefrontSharp,
      cartOutline, cartSharp,
      personOutline, personSharp,
      receiptOutline, receiptSharp,
      heartOutline, heartSharp,
      settingsOutline, settingsSharp
    });
  }
}
