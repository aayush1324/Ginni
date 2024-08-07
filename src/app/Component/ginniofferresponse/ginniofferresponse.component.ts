import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { UserstoreService } from '../../Services/userstore.service';
import { WishlistService } from '../../Services/wishlist.service';
import { SearchService } from '../../Services/search.service';
import { ProductService } from '../../Services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ginniofferresponse',
  templateUrl: './ginniofferresponse.component.html',
  styleUrl: './ginniofferresponse.component.css'
})
export class GinniofferresponseComponent implements  OnInit, OnDestroy {

  isAccountDropdown: boolean = false;
  isMenuOpen: boolean = false;
  isAccountOpen: boolean = false;
  
  isSearchBarVisible: boolean = false;
  isSearchContainerOpen: boolean = false;
  // changeDetectorRef: any;

  toggleSearchContainer() {
      this.isSearchContainerOpen = !this.isSearchContainerOpen;
  }
  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleAccount() {
    this.isAccountOpen = !this.isAccountOpen;
  }

  closeAccount() {
    this.isAccountOpen = false;
  }

  toggleAccountDropdown(){
    this.isAccountDropdown = !this.isAccountDropdown;
  }

  closeAccountDropdown() {
    this.isAccountDropdown = false;
  }
  
  showaccountDropdown() {
    this.isAccountDropdown = true;
  }

  hideaccountDropdown() {
    this.isAccountDropdown = false;
  }


  isDropdownOpen: boolean = false;
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

  
  searchTerms: string = '';

  searchTerm: string = '';
  searchTermSubscription: Subscription | undefined;
  searchResultss: any[] = [];


  constructor(private elementRef: ElementRef, private router:Router, 
    private auth :AuthService, private userstore : UserstoreService, private changeDetectorRef: ChangeDetectorRef, 
    private cartService : CartService, private wishlistService: WishlistService,
    private productService : ProductService, private searchService : SearchService, private cd: ChangeDetectorRef) 
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

    // document.addEventListener('click', this.handleClickOutside.bind(this));

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
    console.log(UserID);

    this.cartService.countCart$.subscribe(count => {
      console.log("Received count update:", count); // Add this for debugging
      this.totalCartItem = count;
    });

    // this.cartService.getToCarts(UserID)
    // .subscribe(res=>{
    //   this.totalCartItem = res.length;
    // })

    this.cartService.getToCarts(UserID).subscribe({
      next : (res) => {
        if (res && Array.isArray(res)) {
          this.totalCartItem = res.length;
        } else {
          // Handle cases where res is null or not an array
          this.totalCartItem = 0;
          // console.warn('Expected an array but received:', res);
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.totalCartItem = 0;
      }
    });

    this.wishlistService.countWishList$.subscribe(count => {
      console.log("Received count update:", count); // Add this for debugging
      this.totalWislistItem = count;
    });

    // this.wishlistService.getToWishlists(UserID)
    // .subscribe(res=>{
    //   this.totalWislistItem = res.length;
    // })

    this.wishlistService.getToWishlists(UserID).subscribe({
      next : (res) => {
        if (res && Array.isArray(res)) {
          this.totalWislistItem = res.length;
        } else {
          this.totalWislistItem = 0;
          // console.warn('Expected an array but received:', res);
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.totalWislistItem = 0;
      }
    });

    this.auth.isLoggedIn$.subscribe((val)=>{
      this.loggedIn = val;      
    })

    this.getProduct();

    this.searchTerm = this.searchService.getSearchVal();

    this.searchTermSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerms = term;
      this.search();
   });
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }


  handleClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.accountlaptopdropdown');
    if (!clickedInside) {
      this.closeAccount();
    }
  }

  reloadPage(event: Event) {
    // Prevent the default navigation to allow the reload
    event.preventDefault();
    
    // Navigate to the cart page
    this.router.navigate(['/account/cart']).then(() => {
      window.location.reload();
    });
  }

  reloadPagess(event: Event) {
    // Prevent the default navigation to allow the reload
    event.preventDefault();
    
    // Navigate to the dummy route and then back to the cart page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/account/cart']);
    });
  }


  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
   console.log("Current route I am on:",this.router.url);
   const url=self ? this.router.url :urlToNavigateTo;
   this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
     this.router.navigate([`/${url}`]).then(()=>{
       console.log(`After navigation I am on:${this.router.url}`)
     })
   })
  }

  search(): void {
    //this.searchService.setSearchTerm(this.searchTerms);

    this.productService.searchProducts(this.searchTerms).subscribe({
      next : (res) => {
        this.searchResultss = res;
        console.log(this.searchResultss);
        this.searchResultss.forEach(item => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        console.log(this.searchResultss);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
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



  logout() {
    this.loggedIn = false;
    const token = sessionStorage.getItem('token');
    if (token) {
      this.auth.logout(token).subscribe({
        next: (res) => {
          alert('Logged out successfully')
          console.log('Logged out successfully');
          sessionStorage.clear();

          this.wishlistService.updateCount(0);
          this.cartService.updateCount(0);
          // Redirect or perform any additional actions after logout
        },
        error: (err) => {
          console.error('Logout failed', err);
        }
      });
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
    return currentRoute.startsWith('/collections/dryfruit');
  }
}
