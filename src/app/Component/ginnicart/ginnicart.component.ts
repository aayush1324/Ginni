import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';
import { PaymentService } from '../../Services/payment.service';

declare var Razorpay: any;

@Component({
  selector: 'app-ginnicart',
  templateUrl: './ginnicart.component.html',
  styleUrl: './ginnicart.component.css'
})
export class GinnicartComponent {
  public products : any = [];
  public grandTotal !: number;

  constructor(private cartService: CartService, private wishlistService : WishlistService, private paymentService : PaymentService) { }

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

  addToWishlistAndRemoveFromCart(item: any): void {

    // Remove the item from the wishlist
    this.removeItem(item);

    // Add the item to the cart
    this.addToWishlist(item);
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


  // payNow() {
  //   const grandTotalPrice = this.getTotalPrice();

  //   const RozarpayOptions  = {
  //     description: 'Sample Razorpay demo',
  //     currency: 'INR',
  //     amount: 1000,
  //     name: 'Ginni',
  //     key: 'rzp_test_NHayhA8KgRDaCx',
  //     image: 'https://i.imgur.com/FApqk3D.jpeg',
  //     prefill: {
  //       name: 'Anushka',
  //       email: 'aayushagrawal97@gmail.com',
  //       phone: '7877976611'
  //     },
  //     theme: {
  //       color: '#6466e3'
  //     },
  //     modal: {
  //       ondismiss:  () => {
  //         console.log('dismissed')
  //       }
  //     }
  //   }

  //   const successCallback = (paymentid: any) => {
  //     console.log(paymentid);
  //   }

  //   const failureCallback = (e: any) => {
  //     console.log(e);
  //   }

  //   Razorpay.open(RozarpayOptions ,successCallback, failureCallback)
  // }

  // handlePayment() {
  //   this.paymentService.createOrder().subscribe(
  //     (order) => {
  //       const options = {
  //         key: 'rzp_test_NHayhA8KgRDaCx',
  //         amount: this.getTotalPrice(),
  //         currency: 'INR',
  //         name: 'Ginni',
  //         description: 'Dry Fruits',
  //         order_id: order.id,
  //         handler: (response: any) => {
  //           this.paymentService.confirmPayment(response).subscribe(
  //             (confirmResponse) => {
  //               alert(confirmResponse);
  //             },
  //             (error) => {
  //               console.error(error);
  //             }
  //           );
  //         },
  //         prefill: {
  //           name: 'Test User',
  //           email: 'testuser@example.com'
  //         },
  //         theme: {
  //           color: '#F37254'
  //         },
  //         payment_method: {
  //           qr: true // Enable QR code scanning for UPI payments
  //         },
  //         notes: {
  //           merchant_order_id: 'your_merchant_order_id' // Add any custom notes if needed
  //         },
  //         display: {
  //           phonepe: true,
  //           googlepay: true,
  //           paytm: true
  //         }
  //       };
  //       const razorpay = new Razorpay(options);
  //       razorpay.open();
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // handleRazorpayPayment() {
  //     const data = {}; // Add any additional data needed for order creation
    
  //     this.paymentService.createOrder(data).subscribe(
  //       (response) => {
  //         const order_id = response.id;
  //         const options = {
  //           key: 'razorpay_key',
  //           amount: 200,
  //           name: 'Your Angular App',
  //           description: 'Pro Membership',
  //           image: '/your_logo.png',
  //           order_id: order_id,
  //           handler: (response: any) => {
  //             this.paymentService.confirmPayment(response).subscribe(
  //               (confirmResponse) => {
  //                 alert(confirmResponse.data);
  //               },
  //               (error) => {
  //                 console.error(error);
  //               }
  //             );
  //           },
  //           prefill: {
  //             name: 'TESTUSER',
  //             email: 'testuser@mail.com',
  //           },
  //           theme: {
  //             color: '#F37254'
  //           }
  //         };
  //         const rzp1 = new Razorpay(options);
  //         rzp1.open();
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }

  initiatePayment() {
    
    var amount = this.getTotalPrice();

    this.paymentService.createOrder(amount).subscribe(response => {
      const options = {
        key: 'rzp_test_NHayhA8KgRDaCx',
        amount: response.amount,
        currency: 'INR',
        name: 'Ginni Dry Fruits',
        description: 'Test Payment',
        order_id: response.id,
        handler: (response: any) => {
          this.handlePaymentSuccess(response);
        }
      };
      const razorpay = new Razorpay(options);
      razorpay.open();
    });
  }

  handlePaymentSuccess(response: any) {
    // You can perform any actions you need after a successful payment here
    console.log("Payment successful!");
    console.log("Payment ID:", response.razorpay_payment_id);
    console.log("Order ID:", response.razorpay_order_id);
    console.log("Signature:", response.razorpay_signature);

    // For example, you can display a success message to the user
    alert("Payment successful!");
  }
    
}
 

