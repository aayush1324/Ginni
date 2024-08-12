import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { WishlistService } from '../../Services/wishlist.service';
import { SearchService } from '../../Services/search.service';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProductHelperService } from '../../Services/product-helper.service';
import { WishlistHelperService } from '../../Services/wishlist-helper.service';
import { CartHelperService } from '../../Services/cart-helper.service';

// Define sorting options
enum SortingOptions {
  FEATURED = 'featured',
  ALPHABET_UP = 'alphabetUp',
  ALPHABET_DOWN = 'alphabetDown',
  PRICE_UP = 'priceUp',
  PRICE_DOWN = 'priceDown'
}

@Component({
  selector: 'app-ginnidryfruitpista',
  templateUrl: './ginnidryfruitpista.component.html',
  styleUrl: './ginnidryfruitpista.component.css'
})
export class GinnidryfruitpistaComponent {

  public SortingOptions = SortingOptions;

  productlist: any[] = [];
  inStockProducts!: any[];
  outOfStockProducts!: any[];
  almonds!: any[];
  walnuts!: any[];
  cashews!: any[];
  raisins!: any[];
  pistas!: any[];
  dates!: any[];
  minPrice!: any[];
  maxPrice!: any[];
  sortingCriteria!: string;
  originalProductList: any[] = [];
  isFeaturedChecked: boolean = true;
  isAlphabetUpChecked: boolean = false;
  isAlphabetDownChecked: boolean = false;
  isPriceUpChecked: boolean = false;
  isPriceDownChecked: boolean = false;
  filteredData! : any[];
  searchTerm: string ='';
  availabilityForm: FormGroup;
  categoryForm: FormGroup;
  priceForm: FormGroup;
  minPrices: any;
  maxPrices: any;
  currentAvailabilityOption: string = ''; // Initialize currentAvailabilityOption
  currentCategoryOption: string = ''; // Initialize currentCategoryOption
  inWishlist!: boolean;
  totalWishlistItem:any;
  totalCartItem:any;
  productLength!: number;
  isOpenSortby: boolean = false;
  isOpenFilter: boolean = false;

  constructor( private cartService : CartService, private productService : ProductService, 
              private wishlistService : WishlistService, private searchService : SearchService,
              private router : Router, private ProductHelperService : ProductHelperService,
              private wishlistHelperService : WishlistHelperService, private cartHelperService : CartHelperService) 
  { 
    this.availabilityForm = new FormGroup({
      stock: new FormControl(null) // Define a FormControl for the radio buttons
    });

    this.categoryForm = new FormGroup({
      category: new FormControl(null) // Define a FormControl for the radio buttons
    });

    this.priceForm = new FormGroup({
      minPrice: new FormControl(0), 
      maxPrice:new FormControl(10000)
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.toggleFeaturedSorting(null);
    this.getCartItems();
    this.getWishlistItems();
    this.refreshCartItemCount();
    this.refreshWishlistItemCount();

    window.scrollTo(0, 0);

  }


  toggleSortby() {
    this.isOpenSortby = !this.isOpenSortby;
    this.isDropdownOpenSortby = !this.isDropdownOpenSortby;
  }

  closeSortby() {
    this.isOpenSortby = false;
    this.isDropdownOpenSortby = false;
  }

  toggleFilter() {
    this.isOpenFilter = !this.isOpenFilter;
  }

  closeFilter() {
    this.isOpenFilter = false;
  }


//.......................................................................................................
  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');

    return this.wishlistService.getToWishlists(UserID!).pipe(
      tap(res => {
        this.totalWishlistItem = res.length;
      })
    );
  }

  //Use WishlistHelperService
  refreshWishlistItemCount(): void {
    this.wishlistHelperService.getWishlistItems().subscribe({
      next: (items: any[]) => {
        this.totalWishlistItem = items.length;
      },
      error: (err: any) => {
        console.error('Error getting wishlist items:', err);
      }
    });
  }

  //Use WishlistHelperService
  addToWishlist(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = product.id;

    if (userId) {  
    // this.getWishlistItems().subscribe(() => {
      this.wishlistHelperService.addToWishlist(userId, productId, product).subscribe({
        next: (res) => {
          if (res) {
            this.refreshWishlistItemCount();
            this.wishlistService.updateCount(this.totalWishlistItem+1);  // Update the wishlist count
            this.getProducts(); // Call your method to refresh the product list
          }
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
      // })
    }
    else {
      console.warn('User ID not found in session storage');
      alert('Please login first');
      this.router.navigate(['/account/login']);
    }
  }
  
  //Use WishlistHelperService
  removeToWishlist(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = product.id;

    if (userId) {  
      // this.getWishlistItems().subscribe(() => {
      this.wishlistHelperService.removeWishlistItem(userId, productId, product).subscribe({
        next: (res: any) => {
          if (res) {
            this.refreshWishlistItemCount();
            this.wishlistService.updateCount(this.totalWishlistItem-1);  // Update the wishlist count
            this.getProducts(); // Call your method to refresh the product list
          }
        }
      });
      // })
    }
    else {
      console.warn('User ID not found in session storage');
      alert('Please login first');
      this.router.navigate(['/account/login']);
    }
  }
  

//......................................................................................................
  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        this.totalCartItem = res.length;
      })
    );
  }

  //Use CartHelperService
  refreshCartItemCount(): void {
    this.cartHelperService.getCartItems().subscribe({
      next: (items: any[]) => {
        this.totalCartItem = items.length;
      },
      error: (err: any) => {
        console.error('Error getting cart items:', err);
      }
    });
  }

  //Use CartHelperService
  addToCart(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = product.id;

    if (userId) {  
      this.cartHelperService.addToCart(userId, productId, product).subscribe({
        next: (res: any) => {
          if (res) {
            this.refreshCartItemCount(); // Refresh cart item count after adding to cart
            this.cartService.updateCount(this.totalCartItem+1); 
          }
        },   
        error: (err) => {
          console.error('Error:', err);
        }   
      });    
    }
    else {
      console.warn('User ID not found in session storage');
      alert('Please login first');
      this.router.navigate(['/account/login']);
    }
  }



//...........................................................................................
  onSearch () {
    this.filteredData = this.productlist.filter((item) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  } 


  private processProductData(res: any[]): void {
    console.log('Received products:', res);
  
    if (res.length === 0) {
      console.warn('No products found.');
      this.minPrices = 0;
      this.maxPrices = 0;
      return;
    }
  
    console.log('Processing products:', res);
    
    this.inStockProducts = res.filter(product => product.status === 'instock');
    this.outOfStockProducts = res.filter(product => product.status === 'outofstock');
  
    // Filter products based on category
    this.almonds = res.filter(product => product.category === 'almond');
    this.raisins = res.filter(product => product.category === 'raisin');
    this.walnuts = res.filter(product => product.category === 'walnut');
    this.cashews = res.filter(product => product.category === 'cashew');
    this.pistas = res.filter(product => product.category === 'pista');
    this.dates = res.filter(product => product.category === 'date');
  
    // Filter products based on price
    this.minPrices = res.reduce((min, product) => product.price < min ? product.price : min, res[0].price);
    this.maxPrices = res.reduce((max, product) => product.price > max ? product.price : max, res[0].price);
    console.log('Min price:', this.minPrices);
    console.log('Max price:', this.maxPrices);
  
    this.priceForm.get('minPrice')?.setValue(this.minPrices);
    this.priceForm.get('maxPrice')?.setValue(this.maxPrices);
  }

  //Use ProductHelperService
  getProducts(): void {
    const UserID = sessionStorage.getItem('UserID');

    this.ProductHelperService.getProducts(UserID).subscribe({
      next: (res) => {
        this.productLength = res.length;
        this.productlist = res.filter((product) => product.category === 'pista');
        this.originalProductList = [...this.productlist];
        this.processProductData(res);
        this.searchService.getSearchTerm().subscribe((searchTerm) => {
          this.searchTerm = searchTerm;
          this.onSearch();
        });
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }




//.............................................................................................
  // onchange in availability , category and Price
  onChange() {
    const selectedAvalability = this.availabilityForm.get('stock')?.value;
    const selectedCategory = this.categoryForm.get('category')?.value;
    const minPrice = this.priceForm.get('minPrice')?.value;
    const maxPrice = this.priceForm.get('maxPrice')?.value;

    this.filteredData=this.applyFilters(selectedAvalability,selectedCategory,minPrice,maxPrice);
  }


  onAvailabilityChange() {
   // Use optional chaining to safely access the value of stock control
    const selectedStock = this.availabilityForm?.get('stock')?.value;
          
    // Update currentAvailabilityOption when availability option changes
    if (!this.availabilityForm.dirty) {
        this.currentAvailabilityOption = '';
    } 
    else if (selectedStock === 'In Stock') {
        this.currentAvailabilityOption = 'In Stock';
    } 
    else if (selectedStock === 'Out of Stock') {
        this.currentAvailabilityOption = 'Out of Stock';
    }
  }


  onCategoryChange() {
    // Use optional chaining to safely access the value of category control
    const selectedCategory = this.categoryForm?.get('category')?.value;
    
    // Update currentCategoryOption when category option changes
    if (!this.categoryForm.dirty) {
      this.currentCategoryOption = ''; // Reset currentCategoryOption if the form is reset
    } 
    else {
      this.currentCategoryOption = selectedCategory;
    }
  }


  applyFilters(availabilityFilter: string, categoryFilter: string, minPrice:number, maxPrice:number) {
    let filteredProducts =this.productlist;
        
    // Filter by availability if availabilityFilter is provided and not null
    if (availabilityFilter !== null) {
      if (availabilityFilter === 'In Stock') {
        filteredProducts = filteredProducts.filter(product => product.status === 'instock');        
      } 
      else if (availabilityFilter === 'Out of Stock') {
        filteredProducts = filteredProducts.filter(product => product.status === 'outofstock');
      }
    }

    // Filter by category if categoryFilter is provided and not null
    if (categoryFilter !== null && categoryFilter !== 'All') {
      filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    // Filter by price if priceFilter is provided and not null
    if(minPrice!=null && maxPrice!=null){
      filteredProducts = filteredProducts.filter(product => {
        const productPrice = product.price; // Assuming product has a 'price' property
        // Filter products whose price is within the specified range
        return productPrice >= minPrice && productPrice <= maxPrice;
      });
    }

    // this.inStockProducts = filteredProducts.filter(product => product.status === 'instock');
    //     this.outOfStockProducts = filteredProducts.filter(product => product.status === 'outofstock');

    //   this.almonds = filteredProducts.filter(product => product.category === 'almond');
    //     this.raisins = filteredProducts.filter(product => product.category === 'raisin');
    //     this.walnuts = filteredProducts.filter(product => product.category === 'walnut');
    //     this.cashews = filteredProducts.filter(product => product.category === 'cashew');
    //     this.pistas = filteredProducts.filter(product => product.category === 'pista');
    //     this.dates = filteredProducts.filter(product => product.category === 'date');

        // this.minPrices = filteredProducts.reduce((min, product) => product.price < min ? product.price : min, filteredProducts[0].price);
        // this.maxPrices = filteredProducts.reduce((max, product) => product.price > max ? product.price : max, filteredProducts[0].price);
        // console.log(this.maxPrices);
        // this.priceForm.get('minPrice')?.setValue(this.minPrices);
        // this.priceForm.get('maxPrice')?.setValue(this.maxPrices);
    
    return filteredProducts;
  }


  // Function to reset Availability filters
  removeAvailabilityFilters() {
    this.availabilityForm.reset();
    this.onChange();
    this.onAvailabilityChange();
  }

  // Function to reset Category filters
  removeCategoryFilters() {
    this.categoryForm.reset(); 
    this.onChange();
    this.onCategoryChange();
  }



  // Method to select the sorting option
  // selectSortingOption(option: SortingOptions): void {
  //   switch (option) {
  //     case SortingOptions.FEATURED:
  //       this.productlist = [...this.originalProductList]; // Reset to original order
  //       break;
  //     case SortingOptions.ALPHABET_UP:
  //       // Sort alphabetically A-Z
  //       this.productlist = this.productlist.slice().sort((a, b) => a.productName.localeCompare(b.productName));
  //       break;
  //     case SortingOptions.ALPHABET_DOWN:
  //       // Sort alphabetically Z-A
  //       this.productlist = this.productlist.slice().sort((a, b) => b.productName.localeCompare(a.productName));
  //       break;
  //     case SortingOptions.PRICE_UP:
  //       // Sort by price low to high
  //       this.productlist = this.productlist.slice().sort((a, b) => a.price - b.price);
  //       break;
  //     case SortingOptions.PRICE_DOWN:
  //       // Sort by price high to low
  //       this.productlist = this.productlist.slice().sort((a, b) => b.price - a.price);
  //       break;
  //     default:
  //       this.productlist = this.productlist; // Default to original order
  //       break;
  //   }
  // }

  // resetSortbyFilters(): void {
  //   // Uncheck radio buttons within the availability form
  //   const radioButtons = document.querySelectorAll('.sortby input[type="radio"]');
  //   radioButtons.forEach((radio) => {
  //     (radio as HTMLInputElement).checked = false;
  //   });

  //   // Reset the product list to the original list
  //   this.productlist = this.originalProductList.slice();
  // }

  toggleFeaturedSorting(event: any): void {
    this.isFeaturedChecked = true;
    this.uncheckOtherSortOptions('featured');
    this.filteredData = this.filteredData; // Reset to original order
  }
  
  toggleAlphabetUpSorting(event: any): void {
    this.isAlphabetUpChecked = true;
    this.uncheckOtherSortOptions('alphabetUp');
    this.filteredData = this.filteredData.slice().sort((a, b) => a.productName.localeCompare(b.productName))

  }
  
  toggleAlphabetDownSorting(event: any): void {
    this.isAlphabetDownChecked = true;
    this.uncheckOtherSortOptions('alphabetDown');
    this.filteredData = this.filteredData.slice().sort((a, b) => b.productName.localeCompare(a.productName));      
  }
  
  togglePriceUpSorting(event: any): void {
    this.isPriceUpChecked = true;
    this.uncheckOtherSortOptions('priceUp');
    this.filteredData = this.filteredData.slice().sort((a, b) => a.price - b.price);
  }
  
  togglePriceDownSorting(event: any): void {
    this.isPriceDownChecked = true;
    this.uncheckOtherSortOptions('priceDown');
    this.filteredData = this.filteredData.slice().sort((a, b) => b.price - a.price);
  }

  resetSortbyFilter(): void {
    // Reset all sorting options
    this.isFeaturedChecked = false;
    this.isAlphabetUpChecked = false;
    this.isAlphabetDownChecked = false;
    this.isPriceUpChecked = false;
    this.isPriceDownChecked = false;

      // Toggle Featured sorting to apply its logic
    this.toggleFeaturedSorting(null);

    // Reset the product list to show all products
    this.getProducts();
  }

  uncheckOtherSortOptions(category: string): void {
    const sortOptions = ['featured', 'alphabetUp', 'alphabetDown', 'priceUp', 'priceDown'];
    sortOptions.forEach((option) => {
        if (option !== category) {
          document.getElementById(option)?.removeAttribute('');
        }
    });
  }

  

  
  isDropdownOpenAvailability: boolean = false;
  isDropdownOpenCategory: boolean = false;
  isDropdownOpenSortby: boolean = false;
  currentSortingOption: string = 'Featured'; // Initialize currentSortingOption


  toggleDropdownAvailability() {
    this.isDropdownOpenAvailability = !this.isDropdownOpenAvailability;
  }

  toggleDropdownCategory() {
    this.isDropdownOpenCategory = !this.isDropdownOpenCategory;
  }

  toggleDropdownSortby() {
    this.isDropdownOpenSortby = !this.isDropdownOpenSortby;
  }



  toggleSortingOption(option: string) {
    this.currentSortingOption = option;
  }

  resetFilters(): void {
    // Uncheck all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((value: Element) => {
      const radio = value as HTMLInputElement;
      radio.checked = false;
    });

    this.getProducts();
  }


}
