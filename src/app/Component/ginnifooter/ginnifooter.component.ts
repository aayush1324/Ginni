import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

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

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if the clicked target is outside the account toggle and menu
    if (!target.closest('.mobileTnP') && !target.closest('.dropdown-term')) {
      this.isDropdownOpenTnP = false;
    }

    // Check if the clicked target is outside the account toggle and menu
    if (!target.closest('.mobileInf') && !target.closest('.dropdown-term')) {
      this.isDropdownOpenInf = false;
    }

    // Check if the clicked target is outside the account toggle and menu
    if (!target.closest('.mobileProd') && !target.closest('.dropdown-term')) {
      this.isDropdownOpenProduct = false;
    }

  }

}
