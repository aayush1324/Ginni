import { Component, EventEmitter,  OnDestroy, OnInit,  HostListener, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-ginniimageslider',
  templateUrl: './ginniimageslider.component.html',
  styleUrls: ['./ginniimageslider.component.css']
})
export class GinniimagesliderComponent implements OnInit, OnDestroy {
  
  desktopImages: string[] = [
    '../../assets/images/slider/1ch.png',
    '../../assets/images/slider/2ch.png',
    '../../assets/images/slider/3ch.png',
    '../../assets/images/slider/4ch.png',
    '../../assets/images/slider/5ch.png'
  ];

  mobileImages: string[] = [
    '../../assets/images/slider/1mo.jpg',
    '../../assets/images/slider/2mo.jpg',
    '../../assets/images/slider/3mo.jpg',
    '../../assets/images/slider/4mo.jpg',
    '../../assets/images/slider/5mo.jpg'
  ];

  images: string[] = [];
  currentIndex = 0;
  private slideshowSubscription: Subscription | undefined;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  
  constructor() {}

  @Output() loaded = new EventEmitter<void>();

  ngOnInit(): void {
    this.checkDeviceType();
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    if (this.slideshowSubscription) {
      this.slideshowSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkDeviceType();
  }

  checkDeviceType(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) { // Consider 768px as mobile breakpoint
      this.images = this.mobileImages;
    } else {
      this.images = this.desktopImages;
    }
  }

  startSlideshow(): void {
    this.slideshowSubscription = interval(10000)
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
      this.nextSlide();
    }
    if (this.touchEndX - this.touchStartX > 50) {
      this.previousSlide();
    }
  }
}
