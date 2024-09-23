import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { WishlistService } from '../../Services/wishlist.service';
import { SearchService } from '../../Services/search.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { ImageService } from '../../Services/image.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

declare var Razorpay: any;
export interface Image {
  id: string;
  productId: string;
  profileImage: string; // Assuming this is the image data in base64 format
  // Add any other properties that are present in your Image model
}

export interface CartList {
  userId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  profileImage: string | null;
  imageData: string | null;
  created_at: Date;
  modified_at: Date | null;
  deleted_at: Date | null;
  
}

@Component({
  selector: 'app-ginnimainproduct',
  templateUrl: './ginnimainproduct.component.html',
  styleUrl: './ginnimainproduct.component.css'
})
export class GinnimainproductComponent {
  productName!: string;
  productId!: string;
  productDetails: any;
  productlist!: any[];
  images: Image[] = [];
  imageList!: any[];
  slideIndex = 1;
  quantity: number = 1; // Initialize the quantity to 1
  selectedImageIndex = 0;
  stars: number[] = [1, 2, 3, 4, 5];



  constructor(private route: ActivatedRoute,  private cartService : CartService, 
    private productService : ProductService,  private toaster: ToastrService,
    private imageService: ImageService, private wishlistService : WishlistService, 
    private searchService : SearchService , private paymentService : PaymentService,
    private titleService: Title) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.route.params.subscribe(params => {
      const productName = params['productName'];
      // Set the title to the product name, replacing hyphens with spaces
      const formattedTitle = productName.replace(/-/g, ' '); // Converts 'product-name' to 'product name'
      this.titleService.setTitle(formattedTitle);
    });
    
    this.getProduct();

     // Get the product name from route parameters
     this.route.params.subscribe(params => {
      this.productName = params['productName'];
      // Fetch the product details using the product name
      console.log(this.productName);
      this.getProductDetails(this.productName);
      console.log(this.productDetails);
    });

    this.getImagesByProductId(this.productId);
    this.showSlides(this.slideIndex);


  }


  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    this.selectedImageIndex = n-1;

    let i;
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>;
    const captionText = document.getElementById("caption");

    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
    // captionText.innerHTML = dots[this.slideIndex - 1].alt;
  }

  getProductDetails(productName: string): void {
    this.productService.getProductDetailsByName(productName).subscribe({
      next: (data: any) => {
        console.log(data);
        data.imageData = 'data:image/jpeg;base64,' + data.imageData;
        const productId = data.id;
        // this.getImagesByProductId(productId);  
        console.log(productId);
        this.productDetails = data;
        console.log(this.productDetails);
      },
      error: (error: any) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  getImagesByProductId(productId: string): void {
    console.log(productId);
    this.imageService.getImagesByProductId(productId).subscribe({
      next: (res) => {
        console.log(res);
        res.forEach((item: { imageData: string; }) => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        this.imageList = res; 
        console.log(this.imageList);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });   
  }

  addToCart(product: any): void {
    const userId = sessionStorage.getItem('UserID');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    
    const cartItem: CartList = {
      userId: userId,
      productId: product.id,
      productName: product.productName,
      quantity: this.quantity,
      price: product.price,
      totalPrice: this.quantity * product.price,
      profileImage: product.profileImage,
      imageData: product.imageData,
      created_at: new Date(),
      modified_at: null,
      deleted_at: null
    };

    this.cartService.addToCart(cartItem)
      .subscribe({
        next: (res) => {
          console.log('Item added to cart:', cartItem);
          // alert('Item added to cart successfully');
          this.toaster.success("Item added to cart successfully", "Success")
        },
        error: error => {
          console.error('Error adding item to cart:', error);
          // alert('Error adding item to cart');
          this.toaster.error("Error adding item to cart" , "Error")
          // Handle error
        }
      });
    }

 
  addToWishlist(product: any): void {
    product.wishlistStatus = true; // Update the wishlist status
    this.wishlistService.addToWishlist(product)
      .subscribe({
        next: (res) => {
          console.log(product);
          // let countString = sessionStorage.getItem("TotalWishListItem");
          // let count = countString ? parseInt(countString) + 1 : 1;
          // sessionStorage.setItem("TotalWishListItem", JSON.stringify(count));

          // alert('Item added to wishlist');
          this.toaster.success("Item added to cart wishlist", "Success")

        },
        error: error => {
          console.error('Error adding item to wishlist:', error);

          // alert('Error adding item to wishlist');
          this.toaster.error("Error adding item to wishlist" , "Error")

          // Rollback the wishlist status if there's an error
          product.wishlistStatus = false;
        }
    });
  }
  
  removeToWishlist(product: any): void {
    product.wishlistStatus = false; // Update the wishlist status
    this.wishlistService.removeItem(product.id)
      .subscribe({
        next: (res) => {
          // alert('Item removed from wishlist successfully');
          this.toaster.success("Item removed from wishlist successfully'", "Success")

        },
        error: error => {
          console.error('Error removing item from wishlist:', error);

          // alert('Error removing item from wishlist');
          this.toaster.error("Error removing item from wishlist" , "Error")

          product.wishlistStatus = true;
        }
    });
  }

  getProduct(): void {
    this.productService.getProductsWithImages().subscribe({
      next: (res) => {
        console.log(res);
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

  incrementQuantity() {
    // You can set any limit here, if you want to set a maximum limit for the quantity
    // For example, if you want to limit the maximum quantity to 10
    // if (this.quantity < 10) {
    //   this.quantity += 1;
    // }
    this.quantity += 1;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  updateCartItemQuantity(item: any): void {
    // Calculate the new total price
    item.totalPrice = item.quantity * item.offerPrice;

    // Update the cart item
    this.cartService.updateCartItem(item)
      .subscribe({
        next: (res) =>{
              // alert('Quantity updated successfully');
              this.toaster.success("Quantity updated successfully", "Success")

          },
          error: error => {
              console.error('Error updating quantity:', error);
              
              // alert('Error updating quantity');
              this.toaster.error("Error updating quantity" , "Error")

          }
      });
    }

  
  getTotalPrice(): number {
    let totalPrice = 0;
    totalPrice += this.quantity * this.productDetails.offerPrice;
    // this.productDetails.forEach((item: { quantity: number; price: number; }) => {
    //     totalPrice += item.quantity * item.price;
    // });
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
          this.paymentService.confirmPayment(responses).subscribe({
            next:(confirmResponse) => {
              // alert(confirmResponse.message);
              this.toaster.success(confirmResponse.message, "Success")
              console.log(confirmResponse);
            },
            error: (error) => {
              console.error(error);
              console.log("error");
            }
        });
        },
      };
      const razorpay = new Razorpay(options);
      razorpay.open();
    });
  }


}
