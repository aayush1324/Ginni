import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../Services/seller.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-ginnisignin',
  templateUrl: './ginnisignin.component.html',
  styleUrl: './ginnisignin.component.css'
})
export class GinnisigninComponent {

  signInForm: FormGroup;
  authError:String='';

  constructor(private formBuilder: FormBuilder, private seller: SellerService, private router : Router, private auth: AuthService) 
  {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  SigninForm()  {
    if (this.signInForm.valid) 
    {
      console.log(this.signInForm.value);
      
      this.auth.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.signInForm.reset();
          this.router.navigate(['/main/home'])
        },
        error: (err) => {
          alert(err?.error.message);
        },
      })
      // this.seller.sellerSignin(this.signInForm.value);
      // this.seller.isLoginError.subscribe((isError)=>{
      //   if(isError){
      //     this.authError="Email or password is not correct";
      //   }
      // })
    }
  }
}
