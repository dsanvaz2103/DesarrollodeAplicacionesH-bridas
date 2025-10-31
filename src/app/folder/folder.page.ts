import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Producto } from '../interfaces/producto';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class FolderPage implements OnInit {
  folder!: string;

  nuevoProducto: Producto = { 
    titulo: " ", 
    descripcion: " ", 
    imgUrl: " " 
  };

  listaDeProductos: Producto[] = [
    {
      titulo: "Tabla Santa Cruz Classic Dot",
      descripcion: "Ideal para principiantes y expertos.",
      imgUrl: "assets/img/santa-cruz-classic-dot-skateboard-deck-c8.jpg"
    },
    {
      titulo: "Zapatillas DC Shoes",
      descripcion: "Comodidad y estilo en cada truco.",
      imgUrl: "assets/img/adys100634_dcshoes,p_210_frt4.jpg"
    },
    {
      titulo: "Casco Pro",
      descripcion: "Protección segura y ligera.",
      imgUrl: "assets/img/protecciones.jpg"
    }
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') || 'inicio';
  }

  agregarProducto() {
    if (this.nuevoProducto.titulo.trim() && this.nuevoProducto.descripcion.trim()) {
      this.listaDeProductos.push({ ...this.nuevoProducto });
      this.nuevoProducto = { titulo: " ", descripcion: " ", imgUrl: " "};
    }
  }
}
