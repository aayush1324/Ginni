import { Component } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-ginniwishlist',
  templateUrl: './ginniwishlist.component.html',
  styleUrl: './ginniwishlist.component.css'
})
export class GinniwishlistComponent {

  public products : any = [];
  public grandTotal !: number;
  productlist! : any[];


  constructor (private wishlistService : WishlistService, private cartService : CartService, private productService : ProductService) {}

  ngOnInit(): void {
    const UserID: string = localStorage.getItem('UserID')!;

    this.wishlistService.getToWishlists(UserID).subscribe(res=>{
      console.log(res);
        this.products = res;
        // this.grandTotal = this.cartService.getTotalPrice();
        console.log(this.products);
      })

      console.log(this.products);

      this.getProduct();

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
    this.wishlistService.removeItem(item.id)
        .subscribe(
            () => {
                // Remove the item from the local array if needed
                const index = this.products.indexOf(item);
                if (index !== -1) {
                    this.products.splice(index, 1);
                }
                alert('Item removed successfully');
            },
            error => {
                console.error('Error removing item:', error);
                alert('Error removing item');
            }
        );
  }

  addToCartAndRemoveFromWishlist(item: any): void {
    // Add the item to the cart
    this.addToCart(item);

    // Remove the item from the wishlist
    this.removeItem(item);
  }

  removeAllItem() : void {
    this.wishlistService.emptyWishlist()
        .subscribe(
            () => {
                this.products = []; // Clear the local cart array
                alert('Wishlist emptied successfully');
            },
            error => {
                console.error('Error emptying cart:', error);
                alert('Error emptying cart');
            }
        );
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
