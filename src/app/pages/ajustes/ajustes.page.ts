import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonList, IonListHeader, 
  IonItem, IonLabel, IonIcon, IonInput, IonToggle,
  IonCard, IonCardContent // <--- Estos son los que te daban el error
} from '@ionic/angular/standalone';
import { SettingsService } from '../../services/settings.service';
import { addIcons } from 'ionicons';
import { personOutline, moonOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, IonToolbar, IonButtons, IonBackButton, 
    IonTitle, IonContent, IonList, IonListHeader, 
    IonItem, IonLabel, IonIcon, IonInput, IonToggle,
    IonCard, IonCardContent // <--- Deben estar aquí también
  ]
})
export class AjustesPage implements OnInit {

  username: string = '';
  modoOscuro: boolean = false;

  constructor(private settings: SettingsService) {
    // Registro de iconos necesarios para esta página
    addIcons({ personOutline, moonOutline });
  }

  async ngOnInit() {
    // Cargamos los valores guardados al iniciar
    this.username = await this.settings.get('username') || '';
    this.modoOscuro = await this.settings.get('darkMode') || false;
  }

  async guardarNombre() {
    await this.settings.set('username', this.username);
  }

  async cambiarModoOscuro() {
    await this.settings.set('darkMode', this.modoOscuro);
    // Aplicamos o quitamos la clase .dark al body para el cambio visual inmediato
    document.body.classList.toggle('dark', this.modoOscuro);
  }
}