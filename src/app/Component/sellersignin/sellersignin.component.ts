import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../Services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellersignin',
  templateUrl: './sellersignin.component.html',
  styleUrl: './sellersignin.component.css'
})
export class SellersigninComponent {
  signInForm: FormGroup;
  authError:String='';

  constructor(private formBuilder: FormBuilder, private seller: SellerService, private router : Router) 
  {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  submitForm()  {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);

      this.seller.sellerSignin(this.signInForm.value);
      this.seller.isLoginError.subscribe((isError)=>{
        if(isError){
          this.authError="Email or password is not correct";
        }
      })

    //   this.seller.sellerSignin(this.signInForm.value).subscribe((result) => {
    //     console.log(result); // Log the result from the service
    //     this.signInForm.reset();
    //     if(result) {
    //       this.router.navigate(['main/sellerhome']);
    //     }
    //   },
    // );

    }
  }
}
