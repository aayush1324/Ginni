import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../../Services/seller.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserstoreService } from '../../Services/userstore.service';
import { ResetPasswordService } from '../../Services/reset-password.service';

@Component({
  selector: 'app-ginnisignin',
  templateUrl: './ginnisignin.component.html',
  styleUrl: './ginnisignin.component.css'
})
export class GinnisigninComponent {

  signInForm: FormGroup;
  authError:String='';

  constructor(private formBuilder: FormBuilder, private seller: SellerService, 
              private router : Router, private auth: AuthService, private toast: NgToastService,
              private userstore :UserstoreService, private resetPasswordService : ResetPasswordService) 
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
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          this.userstore.setFullNameForStore(tokenPayload.name);
          this.userstore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['/main/home'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          alert(err?.error.message);
        },
      })
    }
  }
}
