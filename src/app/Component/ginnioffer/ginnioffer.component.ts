import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-ginnioffer',
  templateUrl: './ginnioffer.component.html',
  styleUrl: './ginnioffer.component.css'
})
export class GinniofferComponent {
  isDropdownOpen: boolean = false;
  isAccountDropdown: boolean = false;
  showWishlist: boolean = false;
  showCart: boolean = false;
  showOrder: boolean = false;
  loggedIn: boolean = true;
  isAdmin: boolean = false;
  isUser: boolean = true;
  cartCount: number = 0; // Initialize cart count
  wishlistCount: number = 2; // Initialize wishlist count
  userName: string = '';
  selectedLink: string = ''; // Initialize selected link


  constructor(private elementRef: ElementRef, private router:Router) {  // Assuming authService provides methods like isLoggedIn(), getUserName(), and logout()
    // this.loggedIn = this.authService.isLoggedIn();
    // if (this.loggedIn) {
    //   this.userName = this.authService.getUserName();
    // }

    // Subscribe to router events to update selectedLink
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedLink = event.url;
      }
    });
  }

  isLinkActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  showDropdown() {
      this.isDropdownOpen = true;
  }

  hideDropdown() {
      this.isDropdownOpen = false;
  }

 
  showaccountDropdown() {
    this.isAccountDropdown = true;
  }

  hideaccountDropdown() {
    this.isAccountDropdown = false;
  }

  // logout(): void {
  //   this.authService.logout();
  //   this.loggedIn = false;
  // }

  // Method to update wishlist count when an item is added
  updateWishlistCount(count: number): void {
    this.wishlistCount = count;
  }
  
  showWishlistText() {
    this.showWishlist = true;
  }

  hideWishlistText() {
    this.showWishlist = false;
  }

  showCartText() {
    this.showCart = true;
  }

  hideCartText() {
    this.showCart = false;
  }

  showOrderText() {
    this.showOrder = true;
  }

  hideOrderText() {
    this.showOrder = false;
  }

 // Method to check if the dropdown is active based on the current route
  isDropdownActive(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith('/main/ginnidryfruit');
  }

}
