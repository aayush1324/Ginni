import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-ginnifivecombos',
  templateUrl: './ginnifivecombos.component.html',
  styleUrl: './ginnifivecombos.component.css'
})

export class GinnifivecombosComponent {
  productlist: any[] = [];

  constructor( private cartService : CartService, private productService : ProductService) { }

  ngOnInit(): void {
    this.getProduct();
    // console.log(this.productlist);
  }

  addtocart(item: any){
    console.log(item);
    this.cartService.addtoCart(item);
  }

  getProduct(): void {
    this.productService.getProductsWithImages().subscribe({
      next: (res) => {
        
        console.log(res);

        this.productlist = res.filter((product) => product.subcategory === 'combo');
        this.productlist = this.productlist.slice(0, 5);

        console.log(this.productlist);

      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }
}
