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
import { ToastrService } from 'ngx-toastr';

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
  stars: number[] = [1, 2, 3, 4, 5];



  constructor(private cartService: CartService, private wishlistService : WishlistService, 
              private paymentService : PaymentService , private productService : ProductService,  
              private searchService : SearchService, private orderService : OrderService,
              private router : Router, private ProductHelperService : ProductHelperService,
              private cartHelperService : CartHelperService, private toaster: ToastrService,
              private wishlistHelperService: WishlistHelperService) { }

  ngOnInit(): void {

    const UserID: string = sessionStorage.getItem('UserID')!;
    console.log(UserID);

    if (UserID == null){    
      console.log("startnull");

      this.productss = [];
      console.log(this.productss)

      this.searchService.getSearchTerm().subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.onSearch();
      });
    }
    // else {
    //   this.cartService.getToCarts(UserID).subscribe(res=>{
    //     // res.forEach((item: { imageData: string; }) => {
    //     //   if (item.imageData) {
    //     //     item.imageData = 'data:image/jpeg;base64,' + item.imageData;
    //     //   }
    //     // });
    //     console.log("startId");
    //     console.log(res);
    //     this.productss = res;

    //     this.searchService.getSearchTerm().subscribe((searchTerm) => {
    //       this.searchTerm = searchTerm;
    //       this.onSearch();
    //     });
    //   })
    // }

    this.cartService.getToCarts(UserID).subscribe({
      next : (res) => {
        if (res && Array.isArray(res)) {
          console.log("res", res);
          this.productss = res;
          // Assuming `res` is the response data you receive from the backend
          this.productss = res.filter((product: any) => product.itemStock.toLowerCase() === 'instock');
          console.log("products", this.productss)
          this.searchService.getSearchTerm().subscribe((searchTerm) => {
            this.searchTerm = searchTerm;
            this.onSearch();
          });
        } else {
          this.totalCartItem = 0;
          // console.warn('Expected an array but received:', res);
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.totalCartItem = 0;
      }
    });
    
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }

  
  onSearch () {
    this.products = this.productss.filter((item: { productName: string; }) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  } 


  reloadPage(event: Event) {
    // Prevent the default navigation to allow the reload
    event.preventDefault();
    
    // Navigate to the cart page
    this.router.navigate(['/account/cart']).then(() => {
      // Reload the page
      window.location.reload();

      // Scroll to the top of the page
      window.scrollTo(0, 0);
    });
  }


  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        console.log(res);
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
      // alert('Please login first');
      this.toaster.error("Please login first")

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
              this.toaster.success('Cart Item Removed successfully', 'Success')                    
              this.cartService.updateCount(this.totalCartItem-1); 

              setTimeout(() => {
                window.location.reload();
                window.scrollTo(0, 0);
              }, 3000);   
            }
          },
          error: (err: any) => {
            // Handle error
            console.error('Error removing item:', err);
            // alert('Error removing item');
            this.toaster.error('Error removing item')
          }
        });
      })
    }
    else {
      console.error('User ID not found in session storage');

      // alert('Please login first');
      this.toaster.error('Please login first')

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
            // alert('Cart emptied successfully');
            this.toaster.success('Cart emptied successfully', 'Success')

            // Update the count after successfully emptying the cart
            this.totalCartItem = 0;
            this.cartService.updateCount(this.totalCartItem);
            
            setTimeout(() => {
              window.location.reload();
              window.scrollTo(0, 0);
            }, 3000);

          },
          error: (err) => {
            console.error('Error emptying cart:', err);
            // alert('Error emptying cart');
            this.toaster.error('Error emptying cart')
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
          // alert('itemQuantity updated successfully');
          this.toaster.success('itemQuantity updated successfully', "Success")
        },
        error: (err) => {
          console.error('Error updating quantity:', err);

          // alert('Error updating quantity');
          this.toaster.error('Error updating quantity')
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
      // alert('Please login first');
      this.toaster.error('Please login first')

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
    this.products.forEach((item: { itemQuantity: number; itemDiscountedPrice: number; }) => {
        totalPrice += item.itemQuantity * item.itemDiscountedPrice;
    });
    return totalPrice;
  }

  getDiscountPrice(): number {
    let totalPrice = 0;
    this.products.forEach((item: { itemQuantity: number; itemDiscountedPrice: number; itemPrice: number;}) => {
        totalPrice += (item.itemQuantity * item.itemPrice) -(item.itemQuantity * item.itemDiscountedPrice);
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
              // key: 'rzp_live_HO0cMQGQ5NHBLD',
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
                  next:  (confirmResponse) => {
                    // alert(confirmResponse.message);
                    this.toaster.success(confirmResponse.message , "Success")
                    console.log(confirmResponse);
                    // Reload the page to update the cart
                    window.location.reload();
                    window.scrollTo(0, 0);
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
              // key: 'rzp_live_HO0cMQGQ5NHBLD',
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

                    // alert(confirmResponse.message);
                    this.toaster.success(confirmResponse.message, "Success")

                    console.log(confirmResponse);
                     // Reload the page to update the cart
                    window.location.reload();
                    window.scrollTo(0, 0);
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

        // alert(response.message);
        this.toaster.success(response.message, "Success")

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
        // alert(response.entity);
        this.toaster.success(response.entity, "Success")

        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
 

