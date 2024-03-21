import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-ginniimageslider',
  templateUrl: './ginniimageslider.component.html',
  styleUrl: './ginniimageslider.component.css'
})
export class GinniimagesliderComponent {
  
  images: string[] = ['../../assets/images/slider/1.png',
                      '../../assets/images/slider/2.png', 
                      '../../assets/images/slider/3.png', 
                      '../../assets/images/slider/4.png'];



  currentIndex = 0;

  setCurrentIndex(index: number) {
      this.currentIndex = index;
  }
  
}
