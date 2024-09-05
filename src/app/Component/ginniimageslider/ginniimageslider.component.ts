import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-ginniimageslider',
  templateUrl: './ginniimageslider.component.html',
  styleUrls: ['./ginniimageslider.component.css']
})

export class GinniimagesliderComponent implements OnInit, OnDestroy {
  
  images: string[] = [
    '../../assets/images/slider/1ch.png',
    '../../assets/images/slider/2ch.png',
    '../../assets/images/slider/3ch.png',
    '../../assets/images/slider/4ch.png',
    '../../assets/images/slider/5ch.png'
  ];

  currentIndex = 0;
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
    this.slideshowSubscription = interval(10000) // Change image every 10 seconds
      .subscribe(() => {
        this.nextSlide();
      });
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  isHighlighted(index: number): boolean {
    return this.currentIndex === index;
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
