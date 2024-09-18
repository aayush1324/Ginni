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
  
  // Define a 5-star array
  stars: number[] = [1, 2, 3, 4, 5];

 // Sample item with rating
  item = {
    rating: 5.0  // Change this value to test different ratings
  };

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.slideshowSubscription) {
      this.slideshowSubscription.unsubscribe();
    }

    this.stopAutoSlide(); // Clean up to avoid memory leaks

  }


  testimonials = [
    {
      name: 'Vaibhav',
      photo: '../../assets/images/slider/vaibhav.jpg',
      rating: 5,
      review: 'A variety of ways to use my favourite coconut oil and honey. My skin feels nourished, my cuticles are soft, my lips are smooth, and many other benefits come from using them!'
    },
    {
      name: 'Juli',
      photo: '../../assets/images/slider/juli.jpg',
      rating: 4,
      review: 'Great experience using the products. I have been using them for months and they are consistently good.'
    },
    {
      name: 'Rajendra',
      photo: '../../assets/images/slider/rajendra.jpg',
      rating: 5,
      review: 'These products have changed my skincare routine. I absolutely love them!'
    },
    {
      name: 'Anushka',
      photo: '../../assets/images/slider/anushka.jpg',
      rating: 4,
      review: 'The products are fantastic, though the delivery took a little longer than expected.'
    },
    {
      name: 'Sachin',
      photo: '../../assets/images/slider/sachin.jpg',
      rating: 5,
      review: 'I have been recommending these products to all my friends. They are amazing!'
    }
  ];

  currentTestimonialIndex = 0;
  autoSlideInterval: any;

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
    }, 3000); // Change testimonial every 3 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
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
