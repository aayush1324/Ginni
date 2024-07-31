import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ginnireviewslider',
  templateUrl: './ginnireviewslider.component.html',
  styleUrl: './ginnireviewslider.component.css'
})
export class GinnireviewsliderComponent {
  images: string[] = [
    '../../assets/images/slider/1ch.png',
    '../../assets/images/slider/2ch.png',
    '../../assets/images/slider/3ch.png',
    '../../assets/images/slider/4ch.png',
    '../../assets/images/slider/5ch.png'
  ];

  currentIndex = 0;
  transitioning = false;
  slideshowInterval: any;

  constructor() { }

  ngOnInit(): void {
    // Start the slideshow when the component initializes
    this.startSlideshow();
  }

  startSlideshow(): void {
    this.slideshowInterval = setInterval(() => {
      this.scroll(1); // Move to the next image
    }, 5000); // Change image every 10 seconds
  }

  scroll(direction: number): void {
    if (this.transitioning) return;
    
    const newIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    if (newIndex !== this.currentIndex) {
      this.transitioning = true;
      this.currentIndex = newIndex;
      setTimeout(() => {
        this.transitioning = false;
      }, 1000); // Adjust transition duration as needed
    }
  }
  
}
