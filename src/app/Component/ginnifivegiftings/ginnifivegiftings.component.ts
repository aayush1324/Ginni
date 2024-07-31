import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-ginnifivegiftings',
  templateUrl: './ginnifivegiftings.component.html',
  styleUrl: './ginnifivegiftings.component.css'
})

export class GinnifivegiftingsComponent {
  productlist: any[] = [];

  constructor( private cartService : CartService, private productService : ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  addtocart(item: any){
    console.log(item);
    this.cartService.addtoCart(item);
  }

  getProduct(): void {
    this.productService.getProductsWithImages().subscribe({
      next: (res) => {       
        console.log(res);

        this.productlist = res.filter((product) => product.subcategory === 'bestseller');
        this.productlist = this.productlist.slice(0, 5); 
               
        console.log(this.productlist);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }


}
