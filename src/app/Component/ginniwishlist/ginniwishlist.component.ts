import { Component } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { SearchService } from '../../Services/search.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-ginniwishlist',
  templateUrl: './ginniwishlist.component.html',
  styleUrl: './ginniwishlist.component.css'
})
export class GinniwishlistComponent {

  public productss : any = [];
  public grandTotal !: number;
  productlist! : any[];
  searchTerm: string ='';
  products: any;
  totalWislistItem!: number;



  constructor (private wishlistService : WishlistService, private cartService : CartService, 
    private productService : ProductService,  private searchService : SearchService) {}

  ngOnInit(): void {
    const UserID: string = sessionStorage.getItem('UserID')!;

    if (UserID == null){    
      this.productss = [];
      console.log(this.productss)

      this.searchService.getSearchTerm().subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.onSearch();
      });
    }
    else {
      this.wishlistService.getToWishlists(UserID).subscribe(res=>{
        console.log(res);
          this.productss = res;
          // this.grandTotal = this.cartService.getTotalPrice();
          console.log(this.productss);
  
          this.searchService.getSearchTerm().subscribe((searchTerm) => {
            this.searchTerm = searchTerm;
            this.onSearch();
          });
        })
    }

    

      console.log(this.productss);

      this.getProduct();

  }

  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');
    // Fetch wishlist items and update totalWishlistItem
    return this.wishlistService.getToWishlists(UserID!).pipe(
      tap(res => {
        // setTimeout(() => {}, 2000); // Not sure why you have this timeout
        this.totalWislistItem = res.length;
      })
    );
  }

  onSearch () {
    this.products = this.productss.filter((item: { productName: string; }) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  } 

  addToCart(item: any): void {
    // Implement logic to add the item to the cart using your cart service
    // For example:
    this.cartService.addtoCart(item)
        .subscribe(
            () => {
                console.log('Item added to cart successfully');
                // Optionally, you can perform additional actions after adding to cart
            },
            error => {
                console.error('Error adding item to cart:', error);
                alert('Error adding item to cart');
                // Handle error
            }
        );
  }


  removeItem(item: any): void {

    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
      console.error('User ID not found in session storage');
      return;
    }

    this.getWishlistItems().subscribe(() => {
      this.wishlistService.removeItems(userId, item.productId)
      .subscribe({
        next: () => {
            // Remove the item from the local array if needed
            const index = this.products.indexOf(item);
            if (index !== -1) {
                this.products.splice(index, 1);
            }
            alert('Item removed successfully');
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

  addToCartAndRemoveFromWishlist(item: any): void {
    // Add the item to the cart
    this.addToCart(item);

    // Remove the item from the wishlist
    this.removeItem(item);
  }

  removeAllItem() : void {
    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
      console.error('User ID not found in session storage');
      return;
    }

    this.getWishlistItems().subscribe(() => {
      this.wishlistService.emptyWishlist(userId)
        .subscribe(
          () => {
            this.products = []; // Clear the local cart array
            alert('Wishlist emptied successfully');
            // Update the count after successfully emptying the wishlist
            this.totalWislistItem = 0;
            this.wishlistService.updateCount(this.totalWislistItem);
          },
          error => {
            console.error('Error emptying wishlist:', error);
            alert('Error emptying wishlist');
          }
        );
    });
  }
  
  incrementQuantity(item: any): void {
    console.log(item);
    item.quantity++;
    this.updateCartItemQuantity(item);
  }

  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      console.log(item);
      item.quantity--;
      this.updateCartItemQuantity(item);
    }
  }

  updateCartItemQuantity(item: any): void {
    // Calculate the new total price
    item.totalPrice = item.quantity * item.price;

    // Update the cart item
    this.wishlistService.updateWishlistItem(item)
        .subscribe(
            () => {
                alert('Quantity updated successfully');
            },
            error => {
                console.error('Error updating quantity:', error);
                alert('Error updating quantity');
            }
        );
  }

  removeToWishlist(product: any): void {
    product.wishlistStatus = false; // Update the wishlist status
    this.wishlistService.removeItem(product.id)
      .subscribe(
        () => {
          alert('Item removed from wishlist successfully');
        },
        error => {
          console.error('Error removing item from wishlist:', error);
          alert('Error removing item from wishlist');
          // Rollback the wishlist status if there's an error
          product.wishlistStatus = true;
        }
      );
  }

  addToWishlist(product: any): void {
    this.wishlistService.addToWishlist(product)
      .subscribe(
        () => {
          console.log(product);
          alert('Item added to wishlist');
        },
        error => {
          console.error('Error adding item to wishlist:', error);
          alert('Error adding item to wishlist');
        }
      );
  }

  getProduct(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
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
