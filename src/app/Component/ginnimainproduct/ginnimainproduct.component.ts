import { Component } from '@angular/core';

@Component({
  selector: 'app-ginnimainproduct',
  templateUrl: './ginnimainproduct.component.html',
  styleUrl: './ginnimainproduct.component.css'
})
export class GinnimainproductComponent {

  slideIndex: number = 1;

  currentDiv(n: number) {
    this.showDivs(this.slideIndex = n);
  }

  showDivs(n: number) {
    let i: number;
    const x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = x.length; }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " w3-opacity-off";
  }
}
