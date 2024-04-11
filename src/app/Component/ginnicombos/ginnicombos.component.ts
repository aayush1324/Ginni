import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';

interface Almond {
  name: string;
  price: number;
  isBestSeller: boolean;
}

@Component({
  selector: 'app-ginnicombos',
  templateUrl: './ginnicombos.component.html',
  styleUrl: './ginnicombos.component.css'
})

export class GinnicombosComponent {

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
  displayedOutStockProducts!: any[];
  displayedInStockProducts!: any[];
  displayedWalnuts!: any[];
  displayedCashews!: any[];
  displayedRaisins!: any[];
  displayedAlmonds!: any[];
  displayedPistas!: any[];
  sortingCriteria!: string;


  constructor( private cartService : CartService, private productService : ProductService) { }

  ngOnInit(): void {
    this.getProduct();
    console.log(this.productlist);
  }

  addtocart(item: any){
    console.log(item);
    this.cartService.addtoCart(item);
  }

  getProduct(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productlist = res.filter((product) => product.subcategory === 'combo');

         // Filter products based on status
        this.inStockProducts = this.productlist.filter(product => product.status === 'instock');
        this.outOfStockProducts = this.productlist.filter(product => product.status === 'outofstock');

        // Filter products based on category
        this.almonds = this.productlist.filter(product => product.category === 'almond');
        this.raisins = this.productlist.filter(product => product.category === 'raisin');
        this.walnuts = this.productlist.filter(product => product.category === 'walnut');
        this.cashews = this.productlist.filter(product => product.category === 'cashew');
        this.pistas = this.productlist.filter(product => product.category === 'pista');
        this.dates = this.productlist.filter(product => product.category === 'date');

        // Get minimum price
        this.minPrice = this.productlist.reduce((min, product) => product.price < min ? product.price : min, this.productlist[0].price);

        // Get maximum price
        this.maxPrice = this.productlist.reduce((max, product) => product.price > max ? product.price : max, this.productlist[0].price);


        console.log(this.productlist);

      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

  showInStockProducts(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.displayedInStockProducts = this.productlist.filter(product => product.status === 'instock');
      console.log(this.displayedInStockProducts);
    } else {
      this.displayedInStockProducts = []; // Reset the displayed in-stock products
      console.log(this.displayedInStockProducts);

    }
  }
  
  showOutStockProducts(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.displayedOutStockProducts = this.productlist.filter(product => product.status === 'outofstock');
      console.log(this.displayedOutStockProducts);

    } else {
      this.displayedOutStockProducts = []; // Reset the displayed out-of-stock products
      console.log(this.displayedOutStockProducts);
    }
  }

  filterWalnut(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.displayedWalnuts = this.productlist.filter(product => product.category === 'walnut');
      console.log(this.displayedWalnuts);
    } else {
      this.displayedWalnuts = []; // Reset the displayed walnuts
      console.log(this.displayedWalnuts);
    }
  } 

  filterCashew(event: any): void {
      const isChecked = event.target.checked;
      if (isChecked) {
        this.displayedCashews = this.productlist.filter(product => product.category === 'cashew');
        console.log(this.displayedCashews);
      } else {
        this.displayedCashews = []; // Reset the displayed cashews
        console.log(this.displayedCashews);
      }
  }

  filterRaisin(event: any): void {
      const isChecked = event.target.checked;
      if (isChecked) {
        this.displayedRaisins = this.productlist.filter(product => product.category === 'raisin');
        console.log(this.displayedRaisins);
      } else {
        this.displayedRaisins = []; // Reset the displayed raisins
        console.log(this.displayedRaisins);
      }
  }

  filterAlmond(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.displayedAlmonds = this.productlist.filter(product => product.category === 'almond');
      console.log(this.displayedAlmonds);
    } else {
      this.displayedAlmonds = []; // Reset the displayed almonds
      console.log(this.displayedAlmonds);
    }
  }

  filterPista(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.displayedPistas = this.productlist.filter(product => product.category === 'pista');
      console.log(this.displayedPistas);
    } else {
      this.displayedPistas = []; // Reset the displayed pistas
      console.log(this.displayedPistas);
    }
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
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((value: Element) => {
      const checkbox = value as HTMLInputElement;
      checkbox.checked = false;
    });
  
    // Uncheck all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((value: Element) => {
      const radio = value as HTMLInputElement;
      radio.checked = false;
    });
  }
  
  
}
