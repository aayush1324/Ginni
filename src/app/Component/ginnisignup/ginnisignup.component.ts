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
  // signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private seller: SellerService, private router : Router, private auth: AuthService) 
  {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    },
    { validator: ConfirmPasswordValidator("password", "confirmPassword") });

  }


  SignupForm() : void {
    if (this.signupForm.valid) 
    {
      console.log(this.signupForm.value);      

      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          alert("Please Confirm you email ");
          this.signupForm.reset();
          this.router.navigate(['/main/ginnisignin']);
          alert(res.message)
        },
        error: (err) => {
          alert(err?.error.message);
        },
      })
    }
  }

}
