import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { UserstoreService } from '../../Services/userstore.service';
import { CartService } from '../../Services/cart.service';


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
  isAdmin: boolean = false;
  isUser: boolean = true;
  cartCount: number = 0; // Initialize cart count`
  wishlistCount: number = 2; // Initialize wishlist count
  selectedLink: string = ''; // Initialize selected link
  public totalItem : number = 0;

  loggedIn: boolean = false;
  userName: string = '';
  role: string = '';

  constructor(private elementRef: ElementRef, private router:Router, private auth :AuthService, private userstore : UserstoreService, private cartService : CartService) {  
    // Subscribe to router events to update selectedLink
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedLink = event.url;
      }
    });

  // Check if a token exists
  const token = this.auth.getToken();

  // Set loggedIn to true if a token exists
  this.loggedIn = !!token;
  }

  ngOnInit() {
    this.userstore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.userName = val || fullNameFromToken
    });

    this.userstore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;

      this.isAdmin = this.role === 'Admin';
      this.isUser = this.role === 'User';
    })

    this.cartService.getToCart()
    .subscribe(res=>{
      this.totalItem = res.length;
      console.log(res);
    })
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

  logout(){
    this.auth.signOut();
    this.loggedIn = false;

    this.router.navigate(['/main/home'])
  }

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
