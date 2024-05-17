import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { UserstoreService } from '../../Services/userstore.service';
import { CartService } from '../../Services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';
import { ProductService } from '../../Services/product.service';
import { SearchService } from '../../Services/search.service';


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
  public totalCartItem : number = 0;
  totalWislistItem : number = 0;

  loggedIn: boolean = false;
  userName: string = '';
  role: string = '';
  itemsCount: any;

  productList: any[] = []; // Assuming productList contains your list of products
  originalProductList: any[] = []; // Original list of products (not filtered)
  searchResults: string[] = []; // Assuming searchResults will hold the results of the search


  constructor(private elementRef: ElementRef, private router:Router, 
    private auth :AuthService, private userstore : UserstoreService, 
    private cartService : CartService, private wishlistService: WishlistService,
    private productService : ProductService, private searchService : SearchService) 
  { 
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

    // Initialize your product list here, fetch data from API or any other source
    // this.productList = this.getProduct();
    // Make a copy of the original product list for filtering
    this.originalProductList = [...this.productList];

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Call your function here
        this.updateSearchTerm("");
      }
    });
  }


  updateSearchTerm(newSearchTerm: string) {
    this.searchService.setSearchTerm(newSearchTerm);
  }
  
  ngOnInit() {
    const tokens = this.auth.getToken();
    this.loggedIn = !!tokens;

    if(tokens){
      this.auth.isLoggedInSubject.next(true);
    }

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

    const UserID: string = sessionStorage.getItem('UserID')!;

    this.cartService.countCart$.subscribe(count => {
      console.log("Received count update:", count); // Add this for debugging
      this.totalCartItem = count;
    });

    this.cartService.getToCarts(UserID)
    .subscribe(res=>{
      this.totalCartItem = res.length;
    })

    this.wishlistService.countWishList$.subscribe(count => {
      console.log("Received count update:", count); // Add this for debugging
      this.totalWislistItem = count;
    });

    this.wishlistService.getToWishlists(UserID)
    .subscribe(res=>{
      this.totalWislistItem = res.length;
    })

    this.auth.isLoggedIn$.subscribe((val)=>{
      this.loggedIn = val;      
    })

    this.getProduct();
  }


  getProduct(): void {
    this.productService.getProductsWithImages().subscribe({
      next: (res) => {
        console.log(this.productList);
        console.log(this.originalProductList);
        this.productList = res;
        this.originalProductList = [...this.productList];
        console.log(this.productList);
        console.log(this.originalProductList);
      },
      error: (err) => {
        console.error('Error fetching product:', err);
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

  logout() {
    this.loggedIn = false;
    const token = sessionStorage.getItem('token');
    if (token) {
      this.auth.logout(token).subscribe(
        () => {
          console.log('Logged out successfully');
          sessionStorage.clear();
          sessionStorage.removeItem('token');

          this.wishlistService.updateCount(0);
          this.cartService.updateCount(0);
          // Redirect or perform any additional actions after logout
        },
        error => {
          console.error('Logout failed', error);
        }
      );
    }
  }

  // Method to update wishlist count when an item is added
  updateWishlistCount(count: number): void {
    this.wishlistCount = count;
  }

  updateCartCount(count: number): void {
    this.cartCount = count;
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
