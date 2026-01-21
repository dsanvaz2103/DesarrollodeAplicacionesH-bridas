import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Producto } from 'src/app/interfaces/producto';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton
  ]
})
export class DetalleProductoPage implements OnInit {

  producto: Producto | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.producto = this.taskService.getProductoPorId(Number(id));
    }
  }
}
