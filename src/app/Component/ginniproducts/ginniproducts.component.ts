import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';

// Define your item object structure
interface Item {
  save: string;
  variety: string;
  name: string;
  price: string;
}

@Component({
  selector: 'app-ginniproducts',
  templateUrl: './ginniproducts.component.html',
  styleUrl: './ginniproducts.component.css'
})
export class GinniproductsComponent {

  // Initialize an example item object
  item: Item = {
    save: 'Save Rs 2',
    variety: 'Best seller',
    name: 'Almond',
    price: 'From Rs 1000'
  };
  
  constructor( private cartService : CartService) { }

  addtocart(item: any){
    console.log(item);
    this.cartService.addtoCart(item);
  }
}
