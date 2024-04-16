import { Component } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-ginniwishlist',
  templateUrl: './ginniwishlist.component.html',
  styleUrl: './ginniwishlist.component.css'
})
export class GinniwishlistComponent {

  public products : any = [];
  public grandTotal !: number;

  constructor (private wishlistService : WishlistService, private cartService : CartService) {}

  ngOnInit(): void {
    this.wishlistService.getToWishlist().subscribe(res=>{
        this.products = res;
        // this.grandTotal = this.cartService.getTotalPrice();
      })
      console.log(this.products);
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

}
