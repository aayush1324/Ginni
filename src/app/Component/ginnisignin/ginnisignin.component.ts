import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../Services/seller.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserstoreService } from '../../Services/userstore.service';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { WishlistService } from '../../Services/wishlist.service';
import { tap } from 'rxjs';
import { CartService } from '../../Services/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
declare var google :any;


@Component({
  selector: 'app-ginnisignin',
  templateUrl: './ginnisignin.component.html',
  styleUrl: './ginnisignin.component.css'
})
export class GinnisigninComponent {

  signInForm: FormGroup;
  authError:String='';
  totalWislistItem!: number;
  totalCartItem!: number;

  constructor(private formBuilder: FormBuilder, private seller: SellerService, 
              private router : Router, private auth: AuthService, private toast: NgToastService,
              private userstore :UserstoreService, private resetPasswordService : ResetPasswordService,
              private wishlist:WishlistService, private cartService: CartService, private toaster: ToastrService) 
  {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

    // Add this property to your component class
  showPassword: boolean = true;


  ngOnInit(): void {
    google.accounts.id.initialize({
      // client_id: '482416301228-u3d86ut8j17f08uhk0ltilir97s8h051.apps.googleusercontent.com',
      client_id: '277335348911-duj7mumogup3ft9l9mpl03j3mupamtr6.apps.googleusercontent.com',
      callback: (resp: any)=> {this.handleLogin(resp)}     
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size: 'large',
      shape: 'pill',
      width: 50
    });   

    window.scrollTo(0, 0);

  }

  handleLogin(response: any){
    console.log(response);
    if(response){
      console.log("Response");

      const token = response.credential;
      //decode the token
      const payload = this.decodeToken(token );
      console.log(payload);

      // Prepare the data to send to the API
      const userEmail = payload.email;  // Adjust this based on your token's structure


  
      if (userEmail) {
        this.auth.signInGoogle(userEmail).subscribe({
          next: (res) => {
            console.log(res);
            if (res.message != "Login Success!")
            {
              this.toaster.error('You have not registered yet !!!');
            }
            else
            {
              // alert("Login Success!");
              this.auth.storeToken(res.token);
              const tokenPayload = this.auth.decodedToken();
              console.log(tokenPayload);  
              sessionStorage.setItem("UserID", tokenPayload.UserID);  //set UserID in session storage
              this.userstore.setFullNameForStore(tokenPayload.name);
              this.userstore.setRoleForStore(tokenPayload.role);
    
              this.auth.isLoggedInSubject.next(true);
    
              this.getWishlistItems().subscribe((res)=>{
                 this.totalWislistItem= res.length;
                 this.wishlist.updateCount(this.totalWislistItem);
              })
     
              this.getCartItems().subscribe((res) => {
              this.totalCartItem = res.length;
              this.cartService.updateCount(this.totalCartItem);
              })
              
            this.toaster.success(res.message, 'SUCCESS', { 
              // progressBar: true, 
            });

              this.router.navigate([''])
            } 
          },
        error: (err) => {
          this.toaster.error("Something went wrong!", 'ERROR', {
            // progressBar: true 
          });

          // alert(err?.error.message);
        },
        })    
        
      }
    }
  }

  private decodeToken(token : string){
    return JSON.parse(atob(token.split(".")[1]));
  }


  togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
  }

  Login() {
    this.auth.isLoggedInSubject.next(true);
  }

  getWishlistItems() {
    const UserID = sessionStorage.getItem('UserID');
    // Fetch wishlist items and update totalWishlistItem
    return this.wishlist.getToWishlists(UserID!).pipe(
      tap(res => {
        setTimeout(() => {}, 2000); // Not sure why you have this timeout
        this.totalWislistItem = res.length;
      })
    );
  }

  getCartItems() {
    const UserID = sessionStorage.getItem('UserID');
  
    // Fetch cart items and update totalCartItem
    return this.cartService.getToCarts(UserID!).pipe(
      tap(res => {
        setTimeout(() => {}, 2000); // Not sure why you have this timeout
        this.totalCartItem = res.length;
      })
    );
  }

  SigninForm()  {
    if (this.signInForm.valid) 
    {
      console.log(this.signInForm.value);
      
      this.auth.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message != "Login Success!")
          {
            // alert(res.message);
            this.toaster.error(res.message);
            this.signInForm.reset();
          }
          else
          {
            // alert(res.message);
            this.signInForm.reset();
            this.auth.storeToken(res.token);
            const tokenPayload = this.auth.decodedToken();
            console.log(tokenPayload);  
            sessionStorage.setItem("UserID", tokenPayload.UserID);  //set UserID in session storage
            this.userstore.setFullNameForStore(tokenPayload.name);
            this.userstore.setRoleForStore(tokenPayload.role);
  
            this.auth.isLoggedInSubject.next(true);
  
            this.getWishlistItems().subscribe((res)=>{
               this.totalWislistItem= res.length;
               this.wishlist.updateCount(this.totalWislistItem);
            })
    
           this.getCartItems().subscribe((res) => {
            this.totalCartItem = res.length;
            this.cartService.updateCount(this.totalCartItem);
           })
            
           this.toaster.success(res.message, 'SUCCESS', { 
              // progressBar: true, 
            });

            this.router.navigate([''])
          } 
        },
      error: (err) => {
        this.toaster.error("Something went wrong!", 'ERROR', {
          // progressBar: true 
        });
             
        // alert(err?.error.message);
      },
      })
    }
  }

}
