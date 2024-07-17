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
              private wishlist:WishlistService, private cartService: CartService) 
  {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

    // Add this property to your component class
  showPassword: boolean = true;

  // Add this method to your component class
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
            alert(res.message);
            this.signInForm.reset();
          }
          else
          {
            alert(res.message);
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
  
            this.getWishlistItems().subscribe((res)=>{
              this.totalWislistItem= res.length;
              this.wishlist.updateCount(this.totalWislistItem);
           })
  
           this.getCartItems().subscribe((res) => {
            this.totalCartItem = res.length;
            this.cartService.updateCount(this.totalCartItem);
           })
            
            this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
            this.router.navigate([''])
          } 
        },
      error: (err) => {
        this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
        alert(err?.error.message);
      },
      })
    }
  }
}
