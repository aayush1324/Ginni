import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';
import { PaymentService } from '../../Services/payment.service';
import { ProductService } from '../../Services/product.service';
import { SearchService } from '../../Services/search.service';
import { tap } from 'rxjs';
import { OrderService } from '../../Services/order.service';
import { Router } from '@angular/router';
import { log } from 'console';

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


  constructor(private cartService: CartService, private wishlistService : WishlistService, 
              private paymentService : PaymentService , private productService : ProductService,  
              private searchService : SearchService, private orderService : OrderService,
              private router : Router) { }

  ngOnInit(): void {
    this.getProduct();

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


  getProduct(): void {
    this.productService.getProductsWithImages().subscribe({
      next: (res) => {
        res.forEach(item => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        this.productlist = res
        this.productlist = res.slice(0, 5);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }



  addToCart(product: any): void {
    const UserID = sessionStorage.getItem('UserID');
    const ProductID = product.id;

    if (!UserID) {
      this.router.navigate(['/main/ginnisignin'])
      return alert("Please Login First");    
    }
    

    this.getCartItems().subscribe(() => {
      this.cartService.addToCarts(UserID, ProductID).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log('Item added to cart:', product);
          alert('Item added to cart successfully');
          this.cartService.updateCount(this.totalCartItem+1); 
        },
        error: (err: any) => {
          console.error('Error adding item to cart:', err);
          alert('Error adding item to cart');
        }
      });      
    });

  }



  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        res.forEach((item: { imageData: string; }) => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        console.log(res);
        this.totalCartItem = res.length;
      })
    );
  }



  removeItem(item: any): void {
    const UserID = sessionStorage.getItem('UserID');
    if (!UserID) {
      console.error('User ID not found in session storage');
      return;
    }

    this.getCartItems().subscribe(() => {
      this.cartService.removeItem(UserID, item.cartId)
      .subscribe({
        next: () => {
            // Remove the item from the local array if needed
            const index = this.products.indexOf(item);
            if (index !== -1) {
                this.products.splice(index, 1);
            }
            alert('Item removed successfully');
            // Update the count after successfully removing the item
            this.cartService.updateCount(this.totalCartItem-1); 
          },
          error: (err) => {
            console.error('Error removing item:', err);
            alert('Error removing item');
          }
      });
    });
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






  addToWishlist(product: any): void {
    this.wishlistService.addToWishlist(product)
      .subscribe({
        next: (res) => {
          console.log(product);
          alert('Item added to wishlist');
        },
        error: (err) => {
          console.error('Error adding item to wishlist:', err);
          alert('Error adding item to wishlist');
        }
    });
  }

  removeToWishlist(product: any): void {
    this.wishlistService.removeItem(product.id)
      .subscribe({
        next: (res) => {
          alert('Item removed from wishlist successfully');
        },
        error: (err) => {
          console.error('Error removing item from wishlist:', err);
          alert('Error removing item from wishlist');
          // Rollback the wishlist status if there's an error
          product.wishlistStatus = true;
        }
    });
  }

  addToWishlistAndRemoveFromCart(item: any): void {
    // Remove the item from the wishlist
    this.removeItem(item);

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
                this.paymentService.confirmPayments(responses, orderId, UserID).subscribe(
                  (confirmResponse) => {
                    alert(confirmResponse.message);
                    console.log(confirmResponse);
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
 

