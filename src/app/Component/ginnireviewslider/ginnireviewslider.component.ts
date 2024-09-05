import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ginnireviewslider',
  templateUrl: './ginnireviewslider.component.html',
  styleUrl: './ginnireviewslider.component.css'
})
export class GinnireviewsliderComponent implements OnInit, OnDestroy {
  images: string[] = [
    '../../assets/images/slider/1.png',
    '../../assets/images/slider/2.png',
    '../../assets/images/slider/3.png',
    '../../assets/images/slider/4.png',
    '../../assets/images/slider/5.png'
  ];

  currentIndex = 0;
  transitioning = false;
  slideshowInterval: any;
  private slideshowSubscription: Subscription | undefined;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    if (this.slideshowSubscription) {
      this.slideshowSubscription.unsubscribe();
    }
  }

  startSlideshow(): void {
    this.slideshowInterval = setInterval(() => {
      this.scroll(1); 
    }, 10000); 
  }

  scroll(direction: number): void {
    if (this.transitioning) return;
    
    const newIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    if (newIndex !== this.currentIndex) {
      this.transitioning = true;
      this.currentIndex = newIndex;
      setTimeout(() => {
        this.transitioning = false;
      }, 1000); 
    }
  }
  
  
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(): void {
    if (this.touchStartX - this.touchEndX > 50) {
      this.nextSlide(); // Swipe left, move to next slide
    }
    if (this.touchEndX - this.touchStartX > 50) {
      this.previousSlide(); // Swipe right, move to previous slide
    }
  }
}
