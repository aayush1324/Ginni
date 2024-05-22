import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { UserstoreService } from '../../Services/userstore.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ginniforgotpassword',
  templateUrl: './ginniforgotpassword.component.html',
  styleUrl: './ginniforgotpassword.component.css'
})
export class GinniforgotpasswordComponent {

  resetPasswordEmail: string = '';
  resetFrom: FormGroup;

  constructor(private router: Router, private toast: NgToastService, 
              private resetPasswordService: ResetPasswordService, private fb: FormBuilder) 
  {
    this.resetFrom = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public isValidEmail!: boolean;

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }
  
  confirmToReset() {
    if (this.resetFrom.valid) {
      const email = this.resetFrom.value.email;

      this.resetPasswordService.sendResetPasswordLink(email).subscribe({
        next: (res) => {
          alert(res.message);
          console.log("Email Sent Successfully");
          // Optionally, navigate to a different route after sending the email
          this.router.navigate(['/main/ginnisignin']);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 5000,
          });
        }
      });
    }
  }
}
