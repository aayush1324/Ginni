import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';
import { PaymentService } from '../../Services/payment.service';
import { ProductService } from '../../Services/product.service';
import { SearchService } from '../../Services/search.service';
import { tap } from 'rxjs';
import { OrderService } from '../../Services/order.service';
import { Router } from '@angular/router';
import { ProductHelperService } from '../../Services/product-helper.service';
import { CartHelperService } from '../../Services/cart-helper.service';
import { WishlistHelperService } from '../../Services/wishlist-helper.service';

declare var Razorpay: any;

@Component({
  selector: 'app-ginnicart',
  templateUrl: './ginnicart.component.html',
  styleUrl: './ginnicart.component.css'
})
export class GinnicartComponent {
  public productss : any = [];
  public grandTotal !: number;
  productlist! : any[];
  searchTerm: string ='';
  products: any;
  totalCartItem!: number;
  totalWishlistItem! : number;


  constructor(private cartService: CartService, private wishlistService : WishlistService, 
              private paymentService : PaymentService , private productService : ProductService,  
              private searchService : SearchService, private orderService : OrderService,
              private router : Router, private ProductHelperService : ProductHelperService,
              private cartHelperService : CartHelperService, private wishlistHelperService: WishlistHelperService) { }

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
      this.cartService.getToCarts(UserID).subscribe(res=>{
        res.forEach((item: { imageData: string; }) => {
          if (item.imageData) {
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
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

  removeCartItem(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = product.productId;

    if (userId) {  
      this.getCartItems().subscribe(() => {
        this.cartHelperService.removeCartItem(userId, productId, this.products).subscribe({
          next: (res: any) => {
            if (res) {
              const index = this.products.findIndex((item: { productId: any; }) => item.productId === productId);
              if (index !== -1) {
                this.products.splice(index, 1);
              }
              this.cartService.updateCount(this.totalCartItem-1); 
            }
          },
          error: (err: any) => {
            // Handle error
            console.error('Error removing item:', err);
            alert('Error removing item');
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

  removeAllItem() : void {
    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
      console.error('User ID not found in session storage');
      return;
    }

    this.getCartItems().subscribe(() => {
      this.cartService.emptyCart(userId)
        .subscribe({
          next: (res) => {
            this.products = []; // Clear the local cart array
            alert('Cart emptied successfully');
            // Update the count after successfully emptying the cart
            this.totalCartItem = 0;
            this.cartService.updateCount(this.totalCartItem);
          },
          error: (err) => {
            console.error('Error emptying cart:', err);
            alert('Error emptying cart');
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
    this.cartService.updateCartItem(item)
      .subscribe({
        next: (res) => {
          alert('itemQuantity updated successfully');
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
          alert('Error updating quantity');
        }
      });
  }



  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');

    return this.wishlistService.getToWishlists(UserID!).pipe(
      tap(res => {
        this.totalWishlistItem = res.length;
      })
    );
  }

  addToWishlist(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    const productId = product.productId;

    if (userId) {  
    this.getWishlistItems().subscribe(() => {
      this.wishlistHelperService.addToWishlist(userId, productId, product).subscribe({
        next: (res) => {
          if (res) {
            this.wishlistService.updateCount(this.totalWishlistItem+1);  // Update the wishlist count
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


  addToWishlistAndRemoveFromCart(item: any): void {
    // Remove the item from the wishlist
    this.removeCartItem(item);

    // Add the item to the cart
    this.addToWishlist(item);
  }




  getTotalPrice(): number {
    let totalPrice = 0;
    this.products.forEach((item: { itemQuantity: number; itemPrice: number; }) => {
        totalPrice += item.itemQuantity * item.itemPrice;
    });
    return totalPrice;
  }

  razorpay_Id : string = "";
  razororder_Id: string = "";

  initiatePayment() {  
    const amount = this.getTotalPrice();
    const UserID = sessionStorage.getItem('UserID');
    
    if (UserID !== null) {
      this.orderService.createOrders(UserID).subscribe({
        next : (res: any) => {
          console.log(res);
          const orderId = res.orderId;
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
                    window.location.reload();
                  },
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

                this.paymentService.confirmPayments(responses, orderId, UserID).subscribe({
                  next : (confirmResponse) => {
                    alert(confirmResponse.message);
                    console.log(confirmResponse);
                     // Reload the page to update the cart
                    window.location.reload();
                  },
                  error : (err) => {
                    console.error(err);
                    console.log("error");
                  }
                });
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



  // Service or Component where you handle failure payment
  handleFailurePayment() {
    var orderId = "order_O0PrQwUhVAB0FW";
    this.paymentService.failurePayment( orderId ).subscribe(
      (response) => {
        alert(response.message);
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Service or Component where you handle refund payment
  handleRefundPayment() {
    var paymentId = "pay_O0ProNZmIOLgHh";
    var orderId = "order_O0PrQwUhVAB0FW";
    this.paymentService.refundPayment( orderId,  paymentId ).subscribe(
      (response) => {
        alert(response.entity);
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
 

