import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../../Services/seller.service';
import { AuthService } from '../../Services/auth.service';
import { ConfirmPasswordValidator } from '../../Helpers/confirmpassword.validator';

@Component({
  selector: 'app-ginnisignup',
  templateUrl: './ginnisignup.component.html',
  styleUrl: './ginnisignup.component.css'
})

export class GinnisignupComponent {

  signupForm: FormGroup;
  showPassword: boolean = true;
  showConfirmPassword: boolean = true;


  constructor(private formBuilder: FormBuilder, private seller: SellerService, 
              private router : Router, private auth: AuthService) 
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
          alert(res.message);
          alert("Please Check OTP on Email and Mobile ");
          alert("OTP is valid for 10 minutes ");
          this.signupForm.reset();
          this.router.navigate(['/main/ginniotp']);
        },
        error: (err) => {
          alert(err?.error);
        },
      })
    }
  }

}
