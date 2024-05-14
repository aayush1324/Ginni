import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription, interval, take } from 'rxjs';

@Component({
  selector: 'app-ginnislider',
  templateUrl: './ginnislider.component.html',
  styleUrl: './ginnislider.component.css'
})
export class GinnisliderComponent  {
  images: string[] = [
    '../../assets/images/slider/1.png',
    '../../assets/images/slider/2.png',
    '../../assets/images/slider/3.png',
    '../../assets/images/slider/4.png',
    '../../assets/images/slider/1.png',
    '../../assets/images/slider/2.png',
    '../../assets/images/slider/3.png',
    '../../assets/images/slider/4.png',
    '../../assets/images/slider/2.png',
    '../../assets/images/slider/2.png'
  ];

  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  isHighlighted(index: number): boolean {
    return this.currentIndex === index;
  }


  scroll(direction: number): void {
    const container = this.sliderContainer.nativeElement as HTMLElement;
    const imageWidth = container.offsetWidth*2.5 / this.images.length; // Assuming equal width for each image
    const scrollAmount = imageWidth * direction;
    container.scrollLeft += scrollAmount;
  }

  
}
