import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-ginnifiveproducts',
  templateUrl: './ginnifiveproducts.component.html',
  styleUrl: './ginnifiveproducts.component.css'
})

export class GinnifiveproductsComponent {
  productlist: any[] = [];

  // @Input() rating: number = 0; // Default value to avoid undefined
  stars: number[] = [1, 2, 3, 4, 5];
  totalCartItem: any;
  isLoading: boolean = true;  // Add a loading state


  constructor(  private cartService : CartService, private productService : ProductService, 
    private wishlistService : WishlistService, private searchService : SearchService,
    private router : Router, private ProductHelperService : ProductHelperService,
    private wishlistHelperService : WishlistHelperService,  private toaster: ToastrService,
     private cartHelperService : CartHelperService) 
  {    console.log("5productCO");
  }

  @Output() loaded = new EventEmitter<void>();

  ngOnInit(): void {
    this.getProduct();

    // Simulate loading time
    setTimeout(() => {
      this.loaded.emit(); // Emit when loading is complete
    }, 1000); // Replace with actual loading logic
  
    console.log("5productNG");

  }


  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        this.totalCartItem = res.length;
      })
    );
  }

  //Use CartHelperService
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


    //Use CartHelperService
    addToCart(product: any): void {
      const userId = sessionStorage.getItem('UserID');
      const productId = product.id;
  
      if (userId) {  
        this.cartService.getToCarts(userId).subscribe(() => {
          this.cartHelperService.addToCart(userId, productId, product).subscribe({
            next: (res: any) => {
              if (res) {
                this.toaster.success(res.message, "Success")
                console.log(res);
                this.refreshCartItemCount(); // Refresh cart item count after adding to cart
                this.cartService.updateCount(this.totalCartItem+1); 
              }
            },   
            error: (err) => {
              console.error('Error:', err);
            }   
          });   
        }) 
      }
      else {
        console.warn('User ID not found in session storage');
        // alert('Please login first');
        this.toaster.error("'Please login first'" , "Error")
  
        this.router.navigate(['/account/login']);
      }
    }


  getProduct(): void {
    this.productService.getProductsWithImages().subscribe({
      next: (res) => {       
        console.log(res);
        this.productlist = res.slice(0, 5);
        console.log(this.productlist);
         setTimeout(() => {
          this.isLoading = false; 
        }, 5000);   
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
        this.isLoading = false;
      }
    });
  }


}

