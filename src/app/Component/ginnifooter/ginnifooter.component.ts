import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ginnifooter',
  templateUrl: './ginnifooter.component.html',
  styleUrl: './ginnifooter.component.css'
})
export class GinnifooterComponent {

  isDropdownOpenTnP = false;
  isDropdownOpenInf = false;
  isDropdownOpenProduct = false;

  @ViewChild('menu', { static: false }) menu: ElementRef | undefined;

  toggleDropdownTnP() {
    this.isDropdownOpenTnP = !this.isDropdownOpenTnP;

    if (this.isDropdownOpenTnP && this.menu) {
      const menuHeight = Array.from(this.menu.nativeElement.children as HTMLCollectionOf<HTMLElement>)
        .map((item: HTMLElement) => item.clientHeight)
        .reduce((a, b) => a + b, 0);
      this.menu.nativeElement.style.height = `${menuHeight}px`;
    } else if (this.menu) {
      this.menu.nativeElement.style.height = '0px';
    }
  }

  toggleDropdownInf() {
    this.isDropdownOpenInf = !this.isDropdownOpenInf;
  }


  toggleDropdownProduct() {
    this.isDropdownOpenProduct = !this.isDropdownOpenProduct;
  }

}
