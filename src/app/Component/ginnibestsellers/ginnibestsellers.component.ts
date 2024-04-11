import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';

interface Almond {
  name: string;
  price: number;
  isBestSeller: boolean;
}


@Component({
  selector: 'app-ginnibestsellers',
  templateUrl: './ginnibestsellers.component.html',
  styleUrl: './ginnibestsellers.component.css'
})
export class GinnibestsellersComponent {

  productlist: any[] = [];
  inStockProducts!: any[];
  outOfStockProducts!: any[];
  almonds!: any[];
  walnuts!: any[];
  cashews!: any[];
  raisins!: any[];
  pistas!: any[];
  dates!: any[];

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
        this.productlist = res.filter((product) => product.subcategory === 'bestseller');

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

         
        console.log(this.productlist);

      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
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
  
}
