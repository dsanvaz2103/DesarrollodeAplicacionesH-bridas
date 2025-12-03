import { Component, OnInit } from '@angular/core';
import { IonButton, IonCard, IonItem, IonImg, IonCheckbox, IonLabel, IonCol, IonThumbnail } from "@ionic/angular/standalone";

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.scss'],
  imports: [IonItem, IonThumbnail, IonImg, IonCard, IonLabel],
})
export class ProductoItemComponent  implements OnInit {
[x: string]: any;

  constructor() { }

  ngOnInit() {}

}