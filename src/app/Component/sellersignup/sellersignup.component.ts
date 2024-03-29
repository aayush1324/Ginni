import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../Services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellersignup',
  templateUrl: './sellersignup.component.html',
  styleUrl: './sellersignup.component.css'
})
export class SellersignupComponent {
  
  signupForm: FormGroup;
  // signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private seller: SellerService, private router : Router) 
  {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

  }


  submitForm() : void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      this.seller.sellerSignup(this.signupForm.value);
      
      // this.seller.sellerSignup(this.signupForm.value).subscribe((result) => {
      //     console.log(result); // Log the result from the service
      //     // this.signupForm.reset();
      //     if(result) {
      //       localStorage.setItem('seller',JSON.stringify(result))
      //       this.router.navigate(['main/sellersignin']);
      //     }
      //   },

      //   (error) => {
      //     console.error('Error occurred:', error); // Handle any errors
      //   }
      // );
    }
  }


}
