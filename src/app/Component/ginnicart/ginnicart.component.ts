import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';
import { PaymentService } from '../../Services/payment.service';
import { ProductService } from '../../Services/product.service';
import { SearchService } from '../../Services/search.service';

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


  constructor(private cartService: CartService, private wishlistService : WishlistService, 
    private paymentService : PaymentService , private productService : ProductService,  private searchService : SearchService) { }

  ngOnInit(): void {
    this.getProduct();
    const UserID: string = sessionStorage.getItem('UserID')!;

    this.cartService.getToCarts(UserID).subscribe(res=>{
      console.log(res);
        this.productss = res;
        // this.grandTotal = this.cartService.getTotalPrice();

        this.searchService.getSearchTerm().subscribe((searchTerm) => {
          this.searchTerm = searchTerm;
          this.onSearch();
        });
      })

      console.log(this.productss);
  }

  onSearch () {
    this.products = this.productss.filter((item: { productName: string; }) =>
      item.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
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

  
  addToCart(product: any): void {
    this.cartService.addtoCart(product)
      .subscribe(
        () => {
          console.log(product);
          alert('Item added to cart successfuly');
          // Optionally, you can perform additional actions after adding to cart
        },
        error => {
          console.error('Error adding item to cart:', error);
          alert("Error")
          // Handle error
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


  razorpay_Id : string = "";
  razororder_Id: string = "";

  initiatePayment() {  
    var amount = this.getTotalPrice();

    this.paymentService.createOrder(amount).subscribe(response => {
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
          this.paymentService.confirmPayment(responses).subscribe(
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
  }

  initiatesPayment(amount : any) {  
    this.paymentService.createOrder(amount).subscribe(response => {
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
          this.paymentService.confirmPayment(responses).subscribe(
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
 

