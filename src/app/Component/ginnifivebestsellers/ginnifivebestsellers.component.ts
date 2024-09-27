import { Component, Input } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { WishlistService } from '../../Services/wishlist.service';
import { SearchService } from '../../Services/search.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistHelperService } from '../../Services/wishlist-helper.service';
import { ProductHelperService } from '../../Services/product-helper.service';

import { CartHelperService } from '../../Services/cart-helper.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';


@Component({
  selector: 'app-ginnifivebestsellers',
  templateUrl: './ginnifivebestsellers.component.html',
  styleUrl: './ginnifivebestsellers.component.css'
})

export class GinnifivebestsellersComponent {
  productlist: any[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  totalCartItem: any;
  isLoading: boolean = true;  // Add a loading state

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private router: Router,
    private toaster: ToastrService,
    private cartHelperService: CartHelperService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.isLoading = true; // Set loading state to true when the request starts
    this.productService.getProductsWithImages().subscribe({
      next: (res) => {
        this.productlist = res.slice(0, 5);
        this.isLoading = false; 
        // setTimeout(() => {
        //   this.isLoading = false; 
        // }, 5000);      
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.isLoading = false; // Ensure loading state is set to false even on error
      }
    });
  }
  
  

  addToCart(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    if (userId) {  
      this.cartHelperService.addToCart(userId, product.id, product).subscribe({
        next: (res: any) => {
          if (res) {
            this.toaster.success(res.message, "Success");
            this.refreshCartItemCount();
          }
        },   
        error: (err) => {
          console.error('Error:', err);
        }   
      });
    } else {
      this.toaster.error("Please login first", "Error");
      this.router.navigate(['/account/login']);
    }
  }

  refreshCartItemCount(): void {
    this.cartHelperService.getCartItems().subscribe({
      next: (items: any[]) => {
        this.totalCartItem = items.length;
      },
      error: (err: any) => {
        console.error('Error getting cart items:', err);
      }
    });
  }
}


