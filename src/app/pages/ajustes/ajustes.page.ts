import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonList, IonListHeader, 
  IonItem, IonLabel, IonIcon, IonInput, IonToggle,
  IonCard, IonCardContent 
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
    IonCard, IonCardContent
  ]
})
export class AjustesPage implements OnInit {

  username: string = '';
  modoOscuro: boolean = false;

  constructor(private settings: SettingsService) {
    // Registramos los iconos para que Ionic los encuentre
    addIcons({ personOutline, moonOutline });
  }

  async ngOnInit() {
    // Al cargar la página, leemos lo que hay guardado en memoria
    this.username = await this.settings.get('username') || '';
    this.modoOscuro = await this.settings.get('darkMode') || false;
    
    // Aplicamos el tema guardado por si acaso
    document.body.classList.toggle('dark', this.modoOscuro);
  }

  async guardarNombre() {
    await this.settings.set('username', this.username);
  }

  async cambiarModoOscuro() {
    await this.settings.set('darkMode', this.modoOscuro);
    // Cambia el color de la app al instante
    document.body.classList.toggle('dark', this.modoOscuro);
  }
}