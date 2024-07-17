import { Component } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { SearchService } from '../../Services/search.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProductHelperService } from '../../Services/product-helper.service';
import { WishlistHelperService } from '../../Services/wishlist-helper.service';
import { CartHelperService } from '../../Services/cart-helper.service';
import { OrderService } from '../../Services/order.service';
import { PaymentService } from '../../Services/payment.service';

declare var Razorpay: any;

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
  totalWishlistItem!: number;
  productLength!: number;
  totalCartItem!: number;

  constructor (private wishlistService : WishlistService, private cartService : CartService, 
              private productService : ProductService,  private searchService : SearchService,
              private router : Router, private ProductHelperService : ProductHelperService,
              private orderService : OrderService, private paymentService : PaymentService,
              private wishlistHelperService : WishlistHelperService, private cartHelperService : CartHelperService) {}

  ngOnInit(): void {
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



  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');

    return this.wishlistService.getToWishlists(UserID!).pipe(
      tap(res => {
        this.totalWishlistItem = res.length;
      })
    );
  }
  
  removeWishlistItem(item: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = item.productId;

    if (userId) {  
      this.getWishlistItems().subscribe(() => {
        this.wishlistHelperService.removeWishlistItem(userId, productId, this.products).subscribe({
          next: (res) => {
            if (res) {
              const index = this.products.findIndex((item: { productId: any; }) => item.productId === productId);
              if (index !== -1) {
                this.products.splice(index, 1);
              }
              // Update the count after successfully removing the item
              this.wishlistService.updateCount(this.totalWishlistItem-1); 
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
            this.totalWishlistItem = 0;
            this.wishlistService.updateCount(this.totalWishlistItem);
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


  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        this.totalCartItem = res.length;
      })
    );
  }
  
  addToCart(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = product.productId;

    if (userId) {  
      this.getCartItems().subscribe(() => {
        this.cartHelperService.addToCart(userId, productId, product).subscribe({
          next: (res: any) => {
            if (res) {
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
      console.error('User ID not found in session storage');
      alert('Please login first');
      this.router.navigate(['/account/login']);
    }
  }

  addToCartAndRemoveFromWishlist(item: any): void {
    // Add the item to the cart
    this.addToCart(item);

    // Remove the item from the wishlist
    this.removeWishlistItem(item);
  }


  razorpay_Id : string = "";
  razororder_Id: string = "";

  initiatesPayment(productId : any , amount :any) { 
    const UserID = sessionStorage.getItem('UserID');

    if (UserID !== null) {
      this.orderService.createOrder(UserID,productId).subscribe({
        next : (res: any) => {
          console.log(res);
          const orderId = res.orderId
          console.log("OrderIDDDDD",orderId);

          this.paymentService.createOrders(amount, orderId, UserID).subscribe(response => {
            console.log(response.id);
            const options = {
              key: 'rzp_test_NHayhA8KgRDaCx',
              amount: response.amount,
              currency: 'INR',
              name: 'Ginni Dry Fruits',
              description: 'Test Payment',
              order_id: response.id,
              
              handler: (responses: any) => {
                var razorpay_Id = responses.razorpay_payment_id;
                var razororder_Id = responses.razorpay_order_id;
                console.log(responses);
                this.paymentService.confirmPayments(responses, orderId, UserID).subscribe(
                  (confirmResponse) => {
                    alert(confirmResponse.message);
                    console.log(confirmResponse);
                    // Reload the page to update the cart
                    window.location.reload();                  },
                  (error) => {
                    console.error(error);
                    console.log("error");
                  }
                );
              },
            };
            const razorpay = new Razorpay(options);
            razorpay.open();
          });
        },
        error : (err: any) => {
          console.error(err);
        }
      });
    }
  }

}
