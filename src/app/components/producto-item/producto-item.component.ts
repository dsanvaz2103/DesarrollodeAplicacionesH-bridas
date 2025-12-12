import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// Importa IonicModule desde '@ionic/angular', no desde standalone
import { GestureController, Gesture, IonicModule } from '@ionic/angular';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.scss'],
  standalone: true,
  imports: [IonicModule] // Ahora Angular puede resolverlo
})
export class ProductoItemComponent implements AfterViewInit {

  @Input() producto!: Producto;
  @Output() eliminar = new EventEmitter<Producto>();

  @ViewChild('card', { read: ElementRef }) card!: ElementRef;

  constructor(private gestureCtrl: GestureController) {}

  ngAfterViewInit() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.card.nativeElement,
      gestureName: 'swipe-delete',
      threshold: 15,
      onMove: ev => {
        if (ev.deltaX < 0) {
          this.card.nativeElement.style.transform = `translateX(${ev.deltaX}px)`;
        }
      },
      onEnd: ev => {
        const swipeThreshold = this.card.nativeElement.offsetWidth * 0.4;

        if (Math.abs(ev.deltaX) > swipeThreshold) {
          this.card.nativeElement.style.transition = '.3s ease-out';
          this.card.nativeElement.style.transform = `translateX(-100%)`;
          setTimeout(() => this.eliminar.emit(this.producto), 300);
        } else {
          this.card.nativeElement.style.transition = '.2s ease-out';
          this.card.nativeElement.style.transform = `translateX(0px)`;
          setTimeout(() => {
            this.card.nativeElement.style.transition = '';
          }, 200);
        }
      },
    });

    gesture.enable(true);
  }
}
