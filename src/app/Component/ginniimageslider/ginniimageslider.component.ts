import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-ginniimageslider',
  templateUrl: './ginniimageslider.component.html',
  styleUrl: './ginniimageslider.component.css'
})
export class GinniimagesliderComponent implements OnInit {
  slideIndex = 1;
  slides!: QueryList<ElementRef<HTMLDivElement>>;
  dots!: QueryList<ElementRef<HTMLSpanElement>>;

  @ViewChildren('slides') set slideElements(value: QueryList<ElementRef<HTMLDivElement>>) {
    if (value) {
      this.slides = value;
      this.showSlides(this.slideIndex);
    }
  }
  
  @ViewChildren('dots') set dotElements(value: QueryList<ElementRef<HTMLSpanElement>>) {
    if (value) {
      this.dots = value;
    }
  }

  ngOnInit() {
    // You can optionally call this.showSlides(this.slideIndex) here if you don't use ViewChild setters
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    if (!this.slides || !this.dots) return;

    const slides = this.slides.toArray();
    const dots = this.dots.toArray();

    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }

    slides.forEach(slide => slide.nativeElement.style.display = 'none');
    dots.forEach(dot => dot.nativeElement.className = dot.nativeElement.className.replace(' active', ''));

    slides[this.slideIndex - 1].nativeElement.style.display = 'block';
    dots[this.slideIndex - 1].nativeElement.className += ' active';
  }
}
