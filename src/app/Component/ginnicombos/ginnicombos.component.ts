import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { WishlistService } from '../../Services/wishlist.service';
import { SearchService } from '../../Services/search.service';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export interface WishlistItem {
  userId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  wishlistStatus: boolean;
  profileImage: string | null; // Profile image as string or null if not available
  imageData: string | null; // Image data as string or null if not available
  created_at: Date;
  modified_at: Date | null;
  deleted_at: Date | null;
}

export interface CartList {
  userId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  profileImage: string | null;
  imageData: string | null;
  created_at: Date;
  modified_at: Date | null;
  deleted_at: Date | null;
}



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
  totalWislistItem:any;
  totalCartItem:any;
  productLength!: number;

  constructor( private cartService : CartService, private productService : ProductService, 
                private wishlistService : WishlistService, private searchService : SearchService,
              private router : Router) 
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
  }


  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');
    // Fetch wishlist items and update totalWishlistItem
    return this.wishlistService.getToWishlists(UserID!).pipe(
      tap(res => {
        setTimeout(() => {}, 2000); // Not sure why you have this timeout
        this.totalWislistItem = res.length;
      })
    );
  }


  onSearch () {
    this.filteredData = this.productlist.filter((item) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  } 


  addToWishlist(product: any): void {
    // Assuming UserId is stored in session storage with key 'userId'
    const UserID = sessionStorage.getItem('UserID');
    if (!UserID) {
      this.router.navigate(['/main/ginnisignin'])
      return alert("Please Login First");  
    }

      // Create a WishlistItem object to send to the service
    const wishlistItem: WishlistItem = {
      userId: UserID,
      productId: product.id,
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      totalPrice: product.quantity * product.price,
      wishlistStatus: true, // Assuming you want to set the status to true
      profileImage: product.profileImage, // Assuming you have the profile image available
      imageData: product.imageData, // Assuming you have the image data available
      created_at: new Date(), // Assuming you want to set the current date/time as creation time
      modified_at: null, // No modification yet
      deleted_at: null // Item not deleted
    };

    
    this.getWishlistItems().subscribe(() => {
      this.wishlistService.addToWishlist(wishlistItem)
        .subscribe({
          next: () => {
            console.log('Item added to wishlist:', wishlistItem);
            alert('Item added to wishlist');
            this.getProduct();
            // Update the count after successfully adding the item
            this.wishlistService.updateCount(this.totalWislistItem+1);
          },
          error: (err) => {
            console.error('Error adding item to wishlist:', err);
            alert('Error adding item to wishlist');
            // Rollback the wishlist status if there's an error
          }
        });
    });
  }
  
  removeToWishlist(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
      console.error('User ID not found in session storage');
      return;
    }
  
    this.getWishlistItems().subscribe(() => {
      this.wishlistService.removeItems(userId, product.id)
      .subscribe({
        next: (res) => {
          alert('Item removed from wishlist successfully');
          this.getProduct();
          this.wishlistService.updateCount(this.totalWislistItem-1);
        },
        error: (err) => {
          console.error('Error removing item from wishlist:', err);
          alert('Error removing item from wishlist');
          // Rollback the wishlist status if there's an error
        }
      });
    });
  }
  
  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    // Fetch cart items and update totalCartItem
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        setTimeout(() => {}, 2000); // Not sure why you have this timeout
        this.totalCartItem = res.length;
      })
    );
  }

  addToCart(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
      this.router.navigate(['/main/ginnisignin'])
      return alert("Please Login First");    
    }
    
    const cartItem: CartList = {
      userId: userId,
      productId: product.id,
      productName: product.productName,
      quantity: 1,
      price: product.price,
      totalPrice: 1 * product.price,
      profileImage: product.profileImage,
      imageData: product.imageData,
      created_at: new Date(),
      modified_at: null,
      deleted_at: null
    };

    this.getCartItems().subscribe(() => {
      this.cartService.addToCart(cartItem)
      .subscribe({
        next: () => {
            console.log('Item added to cart:', cartItem);
            alert('Item added to cart successfully');
            // Update the count after successfully adding the item
              this.cartService.updateCount(this.totalCartItem+1);        
          },
          error: (err) => {
            console.error('Error adding item to cart:', err);
            alert('Error adding item to cart');
          }     
        });
    });

  }
  
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
