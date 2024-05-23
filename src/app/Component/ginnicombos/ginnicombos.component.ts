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
  selector: 'app-ginnicombos',
  templateUrl: './ginnicombos.component.html',
  styleUrl: './ginnicombos.component.css'
})

export class GinnicombosComponent {

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
    this.getProduct();
    this.toggleFeaturedSorting(null);
    this.getCartItems();
    this.getWishlistItems();
    this.refreshCartItemCount();
    this.refreshWishlistItemCount();
  }


  onSearch () {
    this.filteredData = this.productlist.filter((item) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  } 


//...................................................................
  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');

    return this.wishlistService.getToWishlists(UserID!).pipe(
      tap(res => {
        this.totalWishlistItem = res.length;
      })
    );
  }

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
    // this.getWishlistItems().subscribe(() => {
      this.wishlistHelperService.addToWishlist(product).subscribe({
        next: (res: any) => {
          if (res) {
            this.refreshWishlistItemCount();
            this.wishlistService.updateCount(this.totalWishlistItem+1);  // Update the wishlist count
            this.getProduct(); // Call your method to refresh the product list
          }
        }
      });
    // })
  }
  
  //Use WishlistHelperService
  removeToWishlist(product: any): void {
    // this.getWishlistItems().subscribe(() => {
      this.wishlistHelperService.removeToWishlist(product).subscribe({
        next: (res: any) => {
          if (res) {
            this.refreshWishlistItemCount();
            this.wishlistService.updateCount(this.totalWishlistItem-1);  // Update the wishlist count
            this.getProduct(); // Call your method to refresh the product list
          }
        }
      });
    // })
  }
  

//...................................................................
  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        this.totalCartItem = res.length;
      })
    );
  }

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

  addToCart(product: any): void {
    this.cartHelperService.addToCart(product).subscribe({
      next: (res: any) => {
        if (res) {
          this.refreshCartItemCount(); // Refresh cart item count after adding to cart
          this.cartService.updateCount(this.totalCartItem+1); 
          this.getProduct();
        }
      },      
    });
  }



//...........................................................................................
  getProduct(): void {
    const UserID = sessionStorage.getItem('UserID');
    // if (!UserID) {
    //   console.error('User ID not found in session storage');
    //   return;
    // }

    if(UserID == null){
      this.productService.getProductsWithImages().subscribe({
        next: (res) => {
          console.log(res);
  
          this.productLength = res.length;
          res.forEach(item => {
            if (item.imageData) {
              // Prepend 'data:image/jpeg;base64,' to the imageData field
              item.imageData = 'data:image/jpeg;base64,' + item.imageData;
            }
          });
  
          this.productlist = res.filter((product) => product.subcategory === 'combo');
          this.originalProductList = [...this.productlist];
  
          this.searchService.getSearchTerm().subscribe((searchTerm) => {
            this.searchTerm = searchTerm;
            this.onSearch();
          });
      
            // Filter products based on status
          this.inStockProducts = this.filteredData.filter(product => product.status === 'instock');
          this.outOfStockProducts = this.filteredData.filter(product => product.status === 'outofstock');
  
          // Filter products based on category
          this.almonds = this.filteredData.filter(product => product.category === 'almond');
          this.raisins = this.filteredData.filter(product => product.category === 'raisin');
          this.walnuts = this.filteredData.filter(product => product.category === 'walnut');
          this.cashews = this.filteredData.filter(product => product.category === 'cashew');
          this.pistas = this.filteredData.filter(product => product.category === 'pista');
          this.dates = this.filteredData.filter(product => product.category === 'date');
  
          // Filter products based on price
          this.minPrices = this.filteredData.reduce((min, product) => product.price < min ? product.price : min, this.productlist[0].price);
          this.maxPrices = this.filteredData.reduce((max, product) => product.price > max ? product.price : max, this.productlist[0].price);
          this.priceForm.get('minPrice')?.setValue(this.minPrices);
          this.priceForm.get('maxPrice')?.setValue(this.maxPrices);
        },
  
        error: (err) => {
          console.error('Error fetching addresses:', err);
        }
      });
    }
    else {  
      this.productService.getProductsWithImage(UserID).subscribe({
        next: (res) => {
          console.log(res);

          this.productLength = res.length;
          res.forEach(item => {
            if (item.imageData) {
              // Prepend 'data:image/jpeg;base64,' to the imageData field
              item.imageData = 'data:image/jpeg;base64,' + item.imageData;
            }
          });

          this.productlist = res.filter((product) => product.subcategory === 'combo');
          this.originalProductList = [...this.productlist];

          this.searchService.getSearchTerm().subscribe((searchTerm) => {
            this.searchTerm = searchTerm;
            this.onSearch();
          });
      
          // Filter products based on status
          this.inStockProducts = this.filteredData.filter(product => product.status === 'instock');
          this.outOfStockProducts = this.filteredData.filter(product => product.status === 'outofstock');

          // Filter products based on category
          this.almonds = this.filteredData.filter(product => product.category === 'almond');
          this.raisins = this.filteredData.filter(product => product.category === 'raisin');
          this.walnuts = this.filteredData.filter(product => product.category === 'walnut');
          this.cashews = this.filteredData.filter(product => product.category === 'cashew');
          this.pistas = this.filteredData.filter(product => product.category === 'pista');
          this.dates = this.filteredData.filter(product => product.category === 'date');

          // Filter products based on price
          this.minPrices = this.filteredData.reduce((min, product) => product.price < min ? product.price : min, this.productlist[0].price);
          this.maxPrices = this.filteredData.reduce((max, product) => product.price > max ? product.price : max, this.productlist[0].price);
          this.priceForm.get('minPrice')?.setValue(this.minPrices);
          this.priceForm.get('maxPrice')?.setValue(this.maxPrices);
        },

        error: (err) => {
          console.error('Error fetching addresses:', err);
        }
      });
    }

  }

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
    } else if (selectedStock === 'In Stock') {
        this.currentAvailabilityOption = 'In Stock';
    } else if (selectedStock === 'Out of Stock') {
        this.currentAvailabilityOption = 'Out of Stock';
    }
  }


  onCategoryChange() {
    // Use optional chaining to safely access the value of category control
    const selectedCategory = this.categoryForm?.get('category')?.value;
    
    // Update currentCategoryOption when category option changes
    if (!this.categoryForm.dirty) {
      this.currentCategoryOption = ''; // Reset currentCategoryOption if the form is reset
  } else {
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

  // Function to reset Price filters
  removePriceFilters() {
    this.priceForm.reset(); 
    this.onChange();
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
    this.getProduct();
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
  isDropdownOpenPricing: boolean = false;
  isDropdownOpenSortby: boolean = false;
  currentSortingOption: string = 'Featured'; // Initialize currentSortingOption


  toggleDropdownAvailability() {
    this.isDropdownOpenAvailability = !this.isDropdownOpenAvailability;
  }

  toggleDropdownCategory() {
    this.isDropdownOpenCategory = !this.isDropdownOpenCategory;
  }

  toggleDropdownPricing() {
    this.isDropdownOpenPricing = !this.isDropdownOpenPricing;
  }

  toggleDropdownSortby() {
    this.isDropdownOpenSortby = !this.isDropdownOpenSortby;
  }

   // Define methods to handle toggling sorting options
   toggleSortingOption(option: string) {
    this.currentSortingOption = option;
    // Add your existing logic for toggling sorting options
}

  resetFilters(): void {
    // Uncheck all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((value: Element) => {
      const radio = value as HTMLInputElement;
      radio.checked = false;
    });

    this.getProduct();
  }

}
