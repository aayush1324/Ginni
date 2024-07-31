import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription, interval, take } from 'rxjs';

@Component({
  selector: 'app-ginnislider',
  templateUrl: './ginnislider.component.html',
  styleUrl: './ginnislider.component.css'
})
export class GinnisliderComponent  {
  images: string[] = [
    '../../assets/images/post/1.png',
    '../../assets/images/post/2.png',
    '../../assets/images/post/3.png',
    '../../assets/images/post/4.png',
    '../../assets/images/post/5.png',
    '../../assets/images/post/6.png',
    '../../assets/images/post/7.png',
    '../../assets/images/post/8.png',
    '../../assets/images/post/9.png',
    '../../assets/images/post/10.png',
    '../../assets/images/post/21.png',
    '../../assets/images/post/12.png',
    '../../assets/images/post/13.png',
    '../../assets/images/post/14.png',
    '../../assets/images/post/15.png',
    '../../assets/images/post/16.png',
    '../../assets/images/post/17.png',
    '../../assets/images/post/18.png',
    '../../assets/images/post/19.png',
    '../../assets/images/post/20.png',
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
