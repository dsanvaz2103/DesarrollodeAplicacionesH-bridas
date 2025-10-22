import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonMenuButton, IonList, IonListHeader, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonMenuButton, IonList, IonListHeader, IonItem, IonLabel,
    CommonModule
  ],
})
export class FolderPage {
  folder: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.route.snapshot.paramMap.get('id') || 'inicio';
    this.folder = this.folder.charAt(0).toUpperCase() + this.folder.slice(1);
  }
}
