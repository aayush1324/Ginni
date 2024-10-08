import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { UserstoreService } from '../../Services/userstore.service';
import { WishlistService } from '../../Services/wishlist.service';
import { SearchService } from '../../Services/search.service';
import { ProductService } from '../../Services/product.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ginniofferresponse',
  templateUrl: './ginniofferresponse.component.html',
  styleUrl: './ginniofferresponse.component.css'
})
export class GinniofferresponseComponent implements  OnInit, OnDestroy {

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchInputMobile') searchInputMobile!: ElementRef;


  isAccountDropdown: boolean = false;
  isMenuOpen: boolean = false;
  isAccountOpen: boolean = false;
  
  isSearchBarVisible: boolean = false;
  isSearchContainerOpen: boolean = false;
  // changeDetectorRef: any;

  placeholderText: string = '';
  placeholderOptions: string[] = ['Search Nuts', 'Search Dried Fruits', 'Search Roasted', 
    'Search Mixes', 'Search Seeds', 'Search Berries'];
  placeholderIndex: number = 0;
  charIndex: number = 0;
  deleting: boolean = false;
  typewriterInterval: any;

    // Adjustable speeds (in milliseconds)
    typingSpeed: number = 200; // Speed of typing each letter
    deletingSpeed: number = 200; // Speed of deleting each letter
    pauseDuration: number = 1000; // Pause when the word is fully typed

  toggleSearchContainer() {
      this.isSearchContainerOpen = !this.isSearchContainerOpen;
      
      // Manage scrolling
      if (this.isSearchContainerOpen) {
        this.disableScrolling();
      } else {
        this.enableScrolling();
      }

      this.searchTerms = "";
      this.searchResultss = [];

      if (this.isSearchContainerOpen) {
        setTimeout(() => {
          this.searchInput.nativeElement.focus();
        }, 0); // Timeout is necessary to wait for the view to update
      }
    }

  toggleSearchContainerMobile() {
    this.isSearchContainerOpen = !this.isSearchContainerOpen;

      // Manage scrolling
      if (this.isSearchContainerOpen) {
        this.disableScrolling();
      } else {
        this.enableScrolling();
      }

    this.searchTerms = "";
    this.searchResultss = [];

    if (this.isSearchContainerOpen) {
      setTimeout(() => {
        this.searchInputMobile.nativeElement.focus();
      }, 0); // Timeout is necessary to wait for the view to update
    }

  }
      
  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Manage scrolling
    if (this.isMenuOpen) {
      this.disableScrolling();
    } else {
      this.enableScrolling();
    }
  
    // Update the menu toggle button class
    this.updateMenuToggleButtonClass();
  }
  
  disableScrolling(): void {
    document.body.style.overflow = 'hidden';
  }
  
  enableScrolling(): void {
    document.body.style.overflow = 'auto';
  }
  
  closeMenu(): void {
    this.isMenuOpen = false;
    this.enableScrolling(); // Ensure scrolling is enabled when the menu is closed
    this.updateMenuToggleButtonClass(); // Update the button icon class when the menu closes
  }
  
  // Function to handle class updates for the menu toggle button
  updateMenuToggleButtonClass(): void {
    const menuToggleButton = document.querySelector('.menu-toggle');
    if (menuToggleButton) {
      if (this.isMenuOpen) {
        menuToggleButton.classList.add('menu-open');
      } else {
        menuToggleButton.classList.remove('menu-open');
      }
    }
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

  clickedOutside(): void {
    this.isAccountOpen = false;
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
  stars: number[] = [1, 2, 3, 4, 5];



  constructor(private elementRef: ElementRef, private router:Router, 
    private auth :AuthService, private userstore : UserstoreService, private changeDetectorRef: ChangeDetectorRef, 
    private cartService : CartService, private wishlistService: WishlistService, private toaster: ToastrService,
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



    this.startTypewriterEffect();

  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));

    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }
  startTypewriterEffect(): void {
    this.typewriterInterval = setInterval(() => {
      const currentText = this.placeholderOptions[this.placeholderIndex];

      if (!this.deleting && this.charIndex < currentText.length) {
        // Typing effect: add one character at a time
        this.placeholderText += currentText[this.charIndex];
        this.charIndex++;
      } else if (this.deleting && this.charIndex > 0) {
        // Deleting effect: remove one character at a time
        this.placeholderText = this.placeholderText.slice(0, -1);
        this.charIndex--;
      } else if (this.charIndex === 0) {
        // After deletion, switch to the next word
        this.deleting = false;
        this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholderOptions.length;
      } else if (this.charIndex === currentText.length) {
        // Pause after typing is complete before starting to delete
        this.deleting = true;
        clearInterval(this.typewriterInterval);
        setTimeout(() => {
          this.startTypewriterEffect();
        }, this.pauseDuration); // Adjust pause duration here
      }
    }, this.deleting ? this.deletingSpeed : this.typingSpeed); // Use different speeds for typing and deleting
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

       // Slight delay to ensure scroll adjustment happens after reload
    setTimeout(() => 
      window.scrollTo(0, 0), 
    10);
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
        this.searchResultss = res.slice(0, 5);

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
          // alert('Logged out successfully')
          this.toaster.success('Logged out successfully');

          console.log('Logged out successfully');
          sessionStorage.clear();

          this.wishlistService.updateCount(0);
          this.cartService.updateCount(0);
          // Redirect or perform any additional actions after logout
        },
        error: (err) => {
          console.error('Logout failed', err);
          this.toaster.error("Logout failed", err, {
            // progressBar: true 
          });
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

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if the clicked target is outside the account toggle and menu
    if (!target.closest('.account-toggle') && !target.closest('.accountmobiledropdown') && !target.closest('.accountlaptopdropdown')) {
      this.isAccountOpen = false;
    }

    // Check if the clicked target is outside the account toggle and menu
    if (!target.closest('.searchnavbaricon') && !target.closest('.search-containermobile') && !target.closest('.search-container')) {
      this.isSearchContainerOpen = false;

      this.searchTerms = "";
      this.searchResultss = [];
    }

    // Check if the clicked target is outside the menu toggle and menu
    if (!target.closest('.menu-toggle') && !target.closest('.navbarmenumobile')) {
      this.isMenuOpen = false;

      const menuToggleButton = document.querySelector('.menu-toggle');
      if (menuToggleButton) {
        menuToggleButton.classList.remove('menu-open');
      }
    }
  }
}
