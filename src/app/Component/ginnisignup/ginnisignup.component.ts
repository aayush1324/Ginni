import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../../Services/seller.service';
import { AuthService } from '../../Services/auth.service';
import { ConfirmPasswordValidator } from '../../Helpers/confirmpassword.validator';
import { UserstoreService } from '../../Services/userstore.service';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
declare var google :any;

@Component({
  selector: 'app-ginnisignup',
  templateUrl: './ginnisignup.component.html',
  styleUrl: './ginnisignup.component.css'
})

export class GinnisignupComponent {

  signupForm: FormGroup;
  showPassword: boolean = true;
  showConfirmPassword: boolean = true;
  authError:String='';
  totalWislistItem!: number;
  totalCartItem!: number;

  constructor(private formBuilder: FormBuilder, private seller: SellerService, 
    private router : Router, private auth: AuthService, private toast: NgToastService,
    private userstore :UserstoreService, private resetPasswordService : ResetPasswordService,
    private wishlist:WishlistService, private cartService: CartService, private toaster: ToastrService) 
  {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    },
    { validator: ConfirmPasswordValidator("password", "confirmPassword") });
  }


  ngOnInit(): void {
    google.accounts.id.initialize({
      // client_id: '482416301228-u3d86ut8j17f08uhk0ltilir97s8h051.apps.googleusercontent.com',
      client_id: '277335348911-duj7mumogup3ft9l9mpl03j3mupamtr6.apps.googleusercontent.com',
      callback: (resp: any)=> {this.handleSignup(resp)}     
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      type: 'standard', // 'standard' or 'icon'
      theme: 'filled_blue', // 'filled_blue', 'filled_black', 'outline'
      size: 'large', // 'small', 'medium', 'large'
      shape: 'circle', // 'rectangular', 'pill', 'circle', 'square'
      text: 'signup_with', // Changes text to "Sign up with Google"
      logo_alignment: 'left', // 'left' or 'center'
      width: 250 // Adjust button width as needed
    });   

    window.scrollTo(0, 0);

  }


  handleSignup(response: any){
    console.log(response);
    if(response){
      console.log("Response");

      const token = response.credential;
      //decode the token
      const payload = this.decodeToken(token );
      console.log(payload);

      // Prepare the data to send to the API
      const userEmail = payload.email;  // Adjust this based on your token's structure
      const userName = payload.name
      const firstname = payload.given_name;
      const lastname = payload.family_name;


      this.auth.signUpGoogle(userEmail, userName).subscribe({
        next: (res) => {
            console.log(res);         
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
            
            // this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
            this.toaster.success(res.message, 'SUCCESS', { 
              // progressBar: true, 
            });
            this.router.navigate([''])
          
        },
          error: (err) => {
            this.toaster.error("Something went wrong!", 'ERROR', {
              // progressBar: true 
            });
            // this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
            // alert(err?.error.message);
          },
      })    
      
      
    }
  }

  private decodeToken(token : string){
    return JSON.parse(atob(token.split(".")[1]));
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

  // Add this method to your component class
  togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
  }


  SignupForm() : void {
    if (this.signupForm.valid) 
    {
      console.log(this.signupForm.value);      

      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          // alert(res.message);
          this.toaster.success(res.message, 'Success', { 
            // progressBar: true, 
          });

          // alert("Please Check OTP on Email and Mobile ");
          this.toaster.success("Please Check OTP on Email and Mobile ");

          // alert("OTP is valid for 10 minutes ");
          this.toaster.success("OTP is valid for 10 minutes", 'Success', {
            timeOut: 600000, // 10 minutes in milliseconds
            progressBar: true, // Enables the progress bar
            progressAnimation: 'increasing', // Optional: 'increasing' or 'decreasing'
          });

          this.signupForm.reset();
          this.router.navigate(['/account/otp']);
        },
        error: (err) => {
          this.toaster.error("Something went wrong!", 'ERROR', {
            // progressBar: true 
          });
          // alert(err?.error);
        },
      })
    }
  }

}
