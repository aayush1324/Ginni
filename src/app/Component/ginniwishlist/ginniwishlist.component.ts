import { Component } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { SearchService } from '../../Services/search.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProductHelperService } from '../../Services/product-helper.service';
import { WishlistHelperService } from '../../Services/wishlist-helper.service';

@Component({
  selector: 'app-ginniwishlist',
  templateUrl: './ginniwishlist.component.html',
  styleUrl: './ginniwishlist.component.css'
})

export class GinniwishlistComponent {

  productss : any = [];
  grandTotal !: number;
  productlist! : any[];
  searchTerm: string ='';
  products: any;
  totalWislistItem!: number;
  productLength!: number;

  constructor (private wishlistService : WishlistService, private cartService : CartService, 
              private productService : ProductService,  private searchService : SearchService,
              private router : Router, private ProductHelperService : ProductHelperService,
              private wishlistHelperService : WishlistHelperService) {}

  ngOnInit(): void {
    this.getProduct();

    const UserID: string = sessionStorage.getItem('UserID')!;

    if (UserID == null){    
      this.productss = [];

      this.searchService.getSearchTerm().subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.onSearch();
      });
    }
    else {
      this.wishlistService.getToWishlists(UserID).subscribe(res=>{
        res.forEach((item: { imageData: string; }) => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        console.log(res);
        this.productss = res;
  
        this.searchService.getSearchTerm().subscribe((searchTerm) => {
          this.searchTerm = searchTerm;
          this.onSearch();
        });
      })
    }
  }


  onSearch () {
    this.products = this.productss.filter((item: { productName: string; }) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  } 

   //chnage into helper service
  getProducts(): void {
    const UserID = sessionStorage.getItem('UserID');
    
    if(UserID == null){
        this.productService.getProductsWithImages().subscribe({
          next: (res) => {
            console.log(res);
            this.productLength = res.length;
            res.forEach(item => {
              if (item.imageData) {
                // Prepend 'data:image/jpeg;base64,' to the imageData field
                item.imageData = 'data:image/jpeg;base64,' + item.imageData;
              }
            });
            this.productlist = res.slice(0, 5);
            console.log(this.productlist);
          },
          error: (err) => {
            console.error('Error fetching addresses:', err);
          }
        });
    }
      else {
        this.productService.getProductsWithImage(UserID).subscribe({
          next: (res) => {
            console.log(res);
            this.productLength = res.length;
            res.forEach(item => {
              if (item.imageData) {
                // Prepend 'data:image/jpeg;base64,' to the imageData field
                item.imageData = 'data:image/jpeg;base64,' + item.imageData;
              }
            });
            this.productlist = res.slice(0, 5);
            console.log(this.productlist);
          },
          error: (err) => {
            console.error('Error fetching addresses:', err);
          }
        });
      }        
  }

  getProduct(): void {
    this.ProductHelperService.getProduct().subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.productLength = res.length;
        this.productlist = res.slice(0, 5);
        console.log(this.productlist);
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }



  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');
    // Fetch wishlist items and update totalWishlistItem
    return this.wishlistService.getToWishlists(UserID!).pipe(
      tap(res => {
        console.log(res);
        res.forEach((item: { imageData: string; }) => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        // setTimeout(() => {}, 2000); // Not sure why you have this timeout
        this.totalWislistItem = res.length;
      })
    );
  }


  
  //chnage into helper service
  addToWishlists(product: any): void {
    const UserID = sessionStorage.getItem('UserID');
    const ProductID = product.id;

    if (!UserID) {
      this.router.navigate(['/main/ginnisignin'])
      return alert("Please Login First");    
    }

    this.wishlistService.addToWishlists(UserID, ProductID)
      .subscribe({
        next: (res: any) => {
          console.log(product);
          alert('Item added to wishlist');
          this.getProduct();
          this.wishlistService.updateCount(this.totalWislistItem+1); 
        },
        error: (err: any) => {
          console.error('Error adding item to wishlist:', err);
          alert('Error adding item to wishlist');
        }
      });
  }

  addToWishlist(product: any): void {
    this.wishlistHelperService.addToWishlist(product).subscribe({
      next: (res: any) => {
        if (res) {
          this.getProduct(); // Call your method to refresh the product list
          this.wishlistService.updateCount(this.totalWislistItem+1);  // Update the wishlist count
        }
      }
    });
  }



  //chnage into helper service
  removeItems(item: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = item.productId;
   

    if (!userId) {
      console.error('User ID not found in session storage');
      return;
    }

    this.getWishlistItems().subscribe(() => {
      this.wishlistService.removeItems(userId, productId)
      .subscribe({
        next: () => {
            // Remove the item from the local array if needed
            const index = this.products.indexOf(item);
            if (index !== -1) {
                this.products.splice(index, 1);
            }
            alert('Item removed successfully');
            this.getProduct();
            // Update the count after successfully removing the item
            this.wishlistService.updateCount(this.totalWislistItem-1); 
          },
          error: (err) => {
            console.error('Error removing item:', err);
            alert('Error removing item');
          }
      });
    });
  }

  removeItem(item: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = item.productId;

    if (userId) {  // Type guard to check if userId is not null
      this.getWishlistItems().subscribe(() => {
        this.wishlistHelperService.removeWishlistItem(userId, productId, this.products).subscribe({
          next: (res) => {
            if (res) {
              this.getProduct(); // Call your method to refresh the product list
              // Update the count after successfully removing the item
              this.wishlistService.updateCount(this.totalWislistItem-1); 
            }
          },
          error: (err) => {
            console.error('Error:', err);
          }
        });
      });
    } 
    else {
      console.error('User ID not found in session storage');
      alert('Please login first');
    }
  }



  removeAllItem() : void {
    const userId = sessionStorage.getItem('UserID');

    if (!userId) {
      console.error('User ID not found in session storage');
      return;
    }

    this.getWishlistItems().subscribe(() => {
      this.wishlistService.emptyWishlist(userId)
        .subscribe({
          next :  (res) => {
            this.products = []; // Clear the local cart array
            alert('Wishlist emptied successfully');
            // Update the count after successfully emptying the wishlist
            this.totalWislistItem = 0;
            this.wishlistService.updateCount(this.totalWislistItem);
          },
          error : (err: any) => {
            console.error('Error emptying wishlist:', err);
            alert('Error emptying wishlist');
          }
        });
      });
  }
  


  incrementQuantity(item: any): void {
    item.itemQuantity++;
    this.updateCartItemQuantity(item);
  }

  decrementQuantity(item: any): void {
    if (item.itemQuantity > 1) {
      item.itemQuantity--;
      this.updateCartItemQuantity(item);
    }
  }

  updateCartItemQuantity(item: any): void {
    // Calculate the new total price
    item.itemTotalPrice = item.itemQuantity * item.itemPrice;

    // Update the cart item
    this.wishlistService.updateWishlistItem(item)
      .subscribe({
        next: (res) => {
            alert('Quantity updated successfully');
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
          alert('Error updating quantity');
        }
      });
  }



  // removeToWishlist(product: any): void {
  //   const userId = sessionStorage.getItem('UserID');
  //   const productId = product.id;
   

  //   if (!userId) {
  //     console.error('User ID not found in session storage');
  //     return;
  //   }

  //   this.getWishlistItems().subscribe(() => {
  //     this.wishlistService.removeItems(userId, productId)
  //     .subscribe({
  //       next: () => {
  //           // Remove the item from the local array if needed
  //           const index = this.products.indexOf(product);
  //           if (index !== -1) {
  //               this.products.splice(index, 1);
  //           }
  //           alert('Item removed successfully');
  //           // Update the count after successfully removing the item
  //           this.wishlistService.updateCount(this.totalWislistItem-1); 
  //         },
  //         error: (err) => {
  //           console.error('Error removing item:', err);
  //           alert('Error removing item');
  //         }
  //     });
  //   });
  // }

  addToCart(item: any): void {
    this.cartService.addtoCart(item)
      .subscribe({
        next: (res: any) => {
              console.log('Item added to cart successfully');
        },
        error: (err: any) => {
            console.error('Error adding item to cart:', err);
            alert('Error adding item to cart');
        }
      });
  }

  addToCartAndRemoveFromWishlist(item: any): void {
    // Add the item to the cart
    this.addToCart(item);

    // Remove the item from the wishlist
    this.removeItems(item);
  }



 





}
