import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-ginniimageslider',
  templateUrl: './ginniimageslider.component.html',
  styleUrls: ['./ginniimageslider.component.css']
})
export class GinniimagesliderComponent implements OnInit, OnDestroy {
  images: string[] = [
    '../../assets/images/slider/1.png',
    '../../assets/images/slider/2.png',
    '../../assets/images/slider/3.png',
    '../../assets/images/slider/4.png'
  ];

  currentIndex = 0;
  private slideshowSubscription: Subscription | undefined;

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

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  isHighlighted(index: number): boolean {
    return this.currentIndex === index;
  }
}

