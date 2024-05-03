import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-ginniotp',
  templateUrl: './ginniotp.component.html',
  styleUrl: './ginniotp.component.css'
})
export class GinniotpComponent {

  otpForm: FormGroup;
  authError:String='';

  constructor(private formBuilder: FormBuilder,
              private router : Router, private auth: AuthService) 
  {
    this.otpForm = this.formBuilder.group({
      emailOtp: ['', [Validators.required, Validators.minLength(6)]],
      mobileOtp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  OtpForm () {
    if (this.otpForm.valid) {
      const emailOtp = this.otpForm.value.emailOtp;
      const phoneOtp = this.otpForm.value.mobileOtp;

      // Call your backend service to verify OTPs
      this.auth.verifyOtps(emailOtp, phoneOtp).subscribe({
        next: (response) => {
          // Handle success response
          if (response) {
            console.log(response);
            alert(response.message);
            this.otpForm.reset();
            this.router.navigate(['/main/ginnisignin']);
          } else {
            // OTPs are not valid, display an error message
            this.authError = 'Invalid OTPs. Please try again.';
          }
        },
        error: (error) => {
          // Handle error response
          console.error('Error verifying OTPs:', error);
          // this.authError = 'Invalid OTP';
          alert(this.authError)
          alert(error)
        }
      });
    }
  }
}
