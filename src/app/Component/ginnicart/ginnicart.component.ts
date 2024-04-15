import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-ginnicart',
  templateUrl: './ginnicart.component.html',
  styleUrl: './ginnicart.component.css'
})
export class GinnicartComponent {
  public products : any = [];
  public grandTotal !: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getToCart().subscribe(res=>{
        this.products = res;
        // this.grandTotal = this.cartService.getTotalPrice();
      })
      console.log(this.products);
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
    this.cartService.updateCartItem(item)
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

  removeItem(item: any): void {
    this.cartService.removeItem(item.id)
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

  removeAllItem() : void {
    this.cartService.emptyCart()
        .subscribe(
            () => {
                this.products = []; // Clear the local cart array
                alert('Cart emptied successfully');
            },
            error => {
                console.error('Error emptying cart:', error);
                alert('Error emptying cart');
            }
        );
  }


  getTotalPrice(): number {
    let totalPrice = 0;
    this.products.forEach((item: { quantity: number; price: number; }) => {
        totalPrice += item.quantity * item.price;
    });
    return totalPrice;
  }


  addToWishlist(item: any): void {
    this.cartService.addToWishlist(item)
        .subscribe(
            () => {
                this.removeItem(item); // Remove item from cart after adding to wishlist
                alert('Item added to wishlist successfully');
            },
            error => {
                console.error('Error adding item to wishlist:', error);
                alert('Error adding item to wishlist');
            }
        );
}
}
