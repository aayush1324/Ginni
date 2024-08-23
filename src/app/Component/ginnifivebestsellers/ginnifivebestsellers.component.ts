import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-ginnifivebestsellers',
  templateUrl: './ginnifivebestsellers.component.html',
  styleUrl: './ginnifivebestsellers.component.css'
})

export class GinnifivebestsellersComponent {
  productlist: any[] = [];

  // @Input() rating: number = 0; // Default value to avoid undefined
  stars: number[] = [1, 2, 3, 4, 5];

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
        this.productlist = res.slice(0, 5);
        console.log(this.productlist);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }


}

