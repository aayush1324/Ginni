import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';



@Component({
  selector: 'app-ginniproducts',
  templateUrl: './ginniproducts.component.html',
  styleUrl: './ginniproducts.component.css'
})
export class GinniproductsComponent {

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
        this.productlist = res.slice(0, 5);
        console.log(this.productlist);

      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }


}
