import { Component } from '@angular/core';

@Component({
  selector: 'app-ginniimageslider',
  templateUrl: './ginniimageslider.component.html',
  styleUrl: './ginniimageslider.component.css'
})
export class GinniimagesliderComponent {
  
  images: string[] = [
    'assets/images/slider/1.png',
    'assets/images/slider/2.png',
    'assets/images/slider/3.png',
    'assets/images/slider/4.png',
    'assets/images/slider/5.png'
  ];
  currentIndex = 0;

  constructor() { }

  showNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  showPrevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
