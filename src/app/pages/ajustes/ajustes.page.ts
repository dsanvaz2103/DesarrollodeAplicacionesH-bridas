import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonListHeader, 
  IonItem, 
  IonLabel, 
  IonToggle, 
  IonButtons, 
  IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [IonIcon, 
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonListHeader, 
    IonItem, 
    IonLabel, 
    IonToggle, 
    IonButtons, 
    IonBackButton
  ]
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false;

  constructor(private settingsService: SettingsService) { }

  async ngOnInit() {
    // Leemos la clave 'modo_oscuro' (la misma que en AppComponent)
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    this.aplicarTema(this.modoOscuro);
  }

  async cambiarModoOscuro() {
    // Guardamos el cambio
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    this.aplicarTema(this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    document.body.classList.toggle('dark', esOscuro);
  }
}