import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  IonRouterOutlet,
  IonToolbar,
  IonTitle,
  IonHeader
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  storefrontOutline, storefrontSharp,
  cartOutline, cartSharp,
  personOutline, personSharp,
  settingsOutline, settingsSharp,
  heartOutline, heartSharp
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterLink,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home-outline' },
    { title: 'Productos', url: '/folder/productos', icon: 'storefront-outline' },
    { title: 'Carrito', url: '/folder/carrito', icon: 'cart-outline' },
    { title: 'Cuenta', url: '/folder/cuenta', icon: 'person-outline' },
    { title: 'Configuración', url: '/folder/configuracion', icon: 'settings-outline' },
  ];

  public labels = ['Ofertas', 'Marcas', 'Accesorios', 'Ropa', 'Tablas', 'Zapatos'];

  constructor() {
    addIcons({
      homeOutline,
      storefrontOutline, storefrontSharp,
      cartOutline, cartSharp,
      personOutline, personSharp,
      settingsOutline, settingsSharp,
      heartOutline, heartSharp
    });
  }
}
