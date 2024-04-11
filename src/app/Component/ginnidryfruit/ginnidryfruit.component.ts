import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-ginnidryfruit',
  templateUrl: './ginnidryfruit.component.html',
  styleUrl: './ginnidryfruit.component.css'
})
export class GinnidryfruitComponent {

  productlist: any[] = [];

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
        this.productlist = res;
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
