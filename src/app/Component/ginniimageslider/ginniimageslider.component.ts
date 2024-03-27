import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-ginniimageslider',
  templateUrl: './ginniimageslider.component.html',
  styleUrl: './ginniimageslider.component.css'
})
export class GinniimagesliderComponent implements AfterViewInit {
  
  images: string[] = ['../../assets/images/slider/1.png',
                      '../../assets/images/slider/2.png', 
                      '../../assets/images/slider/3.png', 
                      '../../assets/images/slider/4.png'];



  currentIndex = 0;

  constructor() { }

  ngAfterViewInit(): void {
    console.log('Component initialized');
    this.startSlideshow();
  }

  startSlideshow(): void {
    console.log('Starting slideshow');
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Change image every 3 seconds (adjust as needed)
  }

  nextSlide(): void {
    console.log('Changing slide');
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }
  
}
