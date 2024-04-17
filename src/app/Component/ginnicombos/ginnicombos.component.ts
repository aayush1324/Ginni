import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { WishlistService } from '../../Services/wishlist.service';
import { SearchService } from '../../Services/search.service';

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
  private originalProductList: any[] = [];
  isInStockChecked: boolean = false;
  isOutOfStockChecked: boolean = false;
  // Define boolean variables to track the checked state of each category
  isAlmondChecked: boolean = false;
  isCashewChecked: boolean = false;
  isPistaChecked: boolean = false;
  isWalnutChecked: boolean = false;
  isRaisinChecked: boolean = false;
  // Define boolean variables to track the checked state of each sorting option
  isFeaturedChecked: boolean = true;
  isAlphabetUpChecked: boolean = false;
  isAlphabetDownChecked: boolean = false;
  isPriceUpChecked: boolean = false;
  isPriceDownChecked: boolean = false;

  filteredData! : any[];
  searchTerm: string ='';

  constructor( private cartService : CartService, private productService : ProductService, 
    private wishlistService : WishlistService, private searchService : SearchService) { }

  ngOnInit(): void {
    this.getProduct();
    console.log(this.productlist);

    this.toggleFeaturedSorting(null);
  }

  onSearch () {
    this.filteredData = this.productlist.filter((item) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
  } 

  addToCart(product: any): void {
    this.cartService.addtoCart(product)
      .subscribe(
        () => {
          console.log(product);
          alert('Item added to cart successfuly');
          // Optionally, you can perform additional actions after adding to cart
        },
        error => {
          console.error('Error adding item to cart:', error);
          alert("Error")
          // Handle error
        }
      );
  }


  addToWishlist(product: any): void {
    product.wishlistStatus = true; // Update the wishlist status
    this.wishlistService.addToWishlist(product)
      .subscribe(
        () => {
          console.log(product);
          // let countString = sessionStorage.getItem("TotalWishListItem");
          // let count = countString ? parseInt(countString) + 1 : 1;
          // sessionStorage.setItem("TotalWishListItem", JSON.stringify(count));
          alert('Item added to wishlist');
        },
        error => {
          console.error('Error adding item to wishlist:', error);
          alert('Error adding item to wishlist');
          // Rollback the wishlist status if there's an error
          product.wishlistStatus = false;
        }
      );
  }
  
  removeToWishlist(product: any): void {
    product.wishlistStatus = false; // Update the wishlist status
    this.wishlistService.removeItem(product.id)
      .subscribe(
        () => {
          alert('Item removed from wishlist successfully');
        },
        error => {
          console.error('Error removing item from wishlist:', error);
          alert('Error removing item from wishlist');
          // Rollback the wishlist status if there's an error
          product.wishlistStatus = true;
        }
      );
  }
  
  
  getProduct(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
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

        // Get minimum price
        this.minPrice = this.filteredData.reduce((min, product) => product.price < min ? product.price : min, this.productlist[0].price);
        // Get maximum price
        this.maxPrice = this.filteredData.reduce((max, product) => product.price > max ? product.price : max, this.productlist[0].price);
 
        console.log(this.productlist);

      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }



  showInStockProducts(event: any): void {
    this.isInStockChecked = true;
    this.isOutOfStockChecked = false;
    this.filteredData = this.inStockProducts 
    console.log(this.filteredData);
  }
  

  showOutStockProducts(event: any): void {
    this.isInStockChecked = false;
    this.isOutOfStockChecked = true;
    this.filteredData = this.outOfStockProducts
    console.log(this.filteredData);
  }
  

  resetAvailabilityFilters(): void {
    // Reset the availability filters
    this.isInStockChecked = false;
    this.isOutOfStockChecked = false;
    this.getProduct(); 
  }
  
  


  filterAlmond(event: any): void {
    this.isAlmondChecked = true;
    this.uncheckOtherCategories('almond');
    this.filteredData = this.almonds;
    console.log(this.filteredData);

  }
  
  
  filterCashew(event: any): void {
    this.isCashewChecked = true;
    this.uncheckOtherCategories('cashew');
    this.filteredData = this.cashews;
    console.log(this.filteredData);

  }
  
  filterPista(event: any): void {
    this.isPistaChecked = true;
    this.uncheckOtherCategories('pista');
    this.filteredData = this.pistas;
    console.log(this.filteredData);

  }
  
  filterWalnut(event: any): void {
    this.isWalnutChecked = true;
    this.uncheckOtherCategories('walnut');
    this.filteredData = this.walnuts;
    console.log(this.filteredData);

  }
  
  filterRaisin(event: any): void {
    this.isRaisinChecked = true;
    this.uncheckOtherCategories('raisin');
    this.filteredData = this.raisins;
    console.log(this.filteredData);

  }
  
  
  // Helper function to uncheck other categories when one is selected
  uncheckOtherCategories(category: string): void {
    const categories = ['almond', 'cashew', 'pista', 'walnut', 'raisin'];
    categories.forEach((cat) => {
      if (cat !== category) {
        document.getElementById(cat)?.removeAttribute('checked');
      }
    });
  }

  resetCategoryFilters(): void {
    // Reset all category filters
    this.isAlmondChecked = false;
    this.isCashewChecked = false;
    this.isPistaChecked = false;
    this.isWalnutChecked = false;
    this.isRaisinChecked = false;
    // Reset the product list to show all products
    this.getProduct();
  }


  
  // Method to apply price filter
  applyPriceFilter(): void {
    const minPriceInput = document.getElementById('minprice') as HTMLInputElement;
    const maxPriceInput = document.getElementById('maxprice') as HTMLInputElement;
    
    let minPrice = parseFloat(minPriceInput.value);
    let maxPrice = parseFloat(maxPriceInput.value);

    // Ensure that minPrice is not greater than maxPrice
    if (minPrice > maxPrice) {
      // Swap minPrice and maxPrice if minPrice is greater
      const temp = minPrice;
      minPrice = maxPrice;
      maxPrice = temp;

      // Update the input field values
      minPriceInput.value = minPrice.toString();
      maxPriceInput.value = maxPrice.toString();
    }

    // Filter products based on price range
    this.productlist = this.productlist.filter(product => product.price >= minPrice && product.price <= maxPrice);
  }

  resetPriceFilters(): void {
    // Calculate the original minimum and maximum prices from the original product list
    const originalPrices = this.originalProductList.map(product => product.price);
    const originalMinPrice = Math.min(...originalPrices);
    const originalMaxPrice = Math.max(...originalPrices);
  
    // Reset the product list to the original list
    this.productlist = this.originalProductList.slice();

    this.minPrice = this.originalProductList.reduce((min, product) => product.price < min ? product.price : min, this.originalProductList[0].price);

    // Get maximum price
    this.maxPrice = this.originalProductList.reduce((max, product) => product.price > max ? product.price : max, this.originalProductList[0].price);

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
    this.uncheckOtherCategories('featured');
    this.productlist = [...this.originalProductList]; // Reset to original order

    // this.isFeaturedChecked = !this.isFeaturedChecked;
    // if (this.isFeaturedChecked) {
    //   // this.productlist = [...this.originalProductList]; // Reset to original order
    //   this.getProduct();

    // } else {
    //   // Reset the product list to show all products
    //   this.getProduct();
    // }
  }
  
  toggleAlphabetUpSorting(event: any): void {
    this.isAlphabetUpChecked = true;
    this.uncheckOtherCategories('alphabetUp');
    this.productlist = this.productlist.slice().sort((a, b) => a.productName.localeCompare(b.productName))

    // this.isAlphabetUpChecked = !this.isAlphabetUpChecked;
    // if (this.isAlphabetUpChecked) {
    //   // Apply alphabetically ascending sorting logic
    //   // For example, sort the product list by name in ascending order
    //   this.productlist = this.productlist.slice().sort((a, b) => a.productName.localeCompare(b.productName))
    // } else {
    //   // Reset the product list to show all products
    //   this.getProduct();
    // }
  }
  
  toggleAlphabetDownSorting(event: any): void {
    this.isAlphabetDownChecked = true;
    this.uncheckOtherCategories('alphabetDown');
    this.productlist = this.productlist.slice().sort((a, b) => b.productName.localeCompare(a.productName));      

    // this.isAlphabetDownChecked = !this.isAlphabetDownChecked;
    // if (this.isAlphabetDownChecked) {
    //   this.productlist = this.productlist.slice().sort((a, b) => b.productName.localeCompare(a.productName));      
    // } else {
    //   // Reset the product list to show all products
    //   this.getProduct();
    // }
  }
  
  togglePriceUpSorting(event: any): void {
    this.isPriceUpChecked = true;
    this.uncheckOtherCategories('priceUp');
    this.productlist = this.productlist.slice().sort((a, b) => a.price - b.price);

    // this.isPriceUpChecked = !this.isPriceUpChecked;
    // if (this.isPriceUpChecked) {
    //   this.productlist = this.productlist.slice().sort((a, b) => a.price - b.price);
    // } else {
    //   // Reset the product list to show all products
    //   this.getProduct();
    // }
  }
  
  togglePriceDownSorting(event: any): void {
    this.isPriceDownChecked = true;
    this.uncheckOtherCategories('priceDown');
    this.productlist = this.productlist.slice().sort((a, b) => b.price - a.price);

    // this.isPriceDownChecked = !this.isPriceDownChecked;
    // if (this.isPriceDownChecked) {
    //   this.productlist = this.productlist.slice().sort((a, b) => b.price - a.price);
    // } else {
    //   // Reset the product list to show all products
    //   this.getProduct();
    // }
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
