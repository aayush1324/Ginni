import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ginniotp',
  templateUrl: './ginniotp.component.html',
  styleUrl: './ginniotp.component.css'
})
export class GinniotpComponent {

  otpForm: FormGroup;
  authError:String='';

  constructor(private formBuilder: FormBuilder,private router : Router, 
    private auth: AuthService,  private toaster: ToastrService) 
  {
    this.otpForm = this.formBuilder.group({
      emailOtp: ['', [Validators.required, Validators.minLength(6) , Validators.maxLength(6)]],
      mobileOtp: ['', [Validators.required, Validators.minLength(6) , Validators.maxLength(6)]],
    });
  }


  OtpForm () {
    if (this.otpForm.valid) {
      const emailOtp = this.otpForm.value.emailOtp;
      const phoneOtp = this.otpForm.value.mobileOtp;

      // Call your backend service to verify OTPs
      this.auth.verifyOtps(emailOtp, phoneOtp).subscribe({
        next: (response) => {      
            console.log(response);           
            if (response.message == "OTP verification successful") 
            {
              // alert(response.message);
              this.toaster.success(response.message, "Success")

              this.otpForm.reset();
              this.router.navigate(['/account/login']);
            }
            else  
            {
              // alert(response.message);
              this.toaster.error(response.message)
            }                  
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

    // OtpForms() {
  //   if (this.otpForm.valid) {
  //     const emailOtp = this.otpForm.value.emailOtp;
  //     const phoneOtp = this.otpForm.value.mobileOtp;

  //     // Call your backend service to verify OTPs
  //     this.auth.verifyOtps(emailOtp, phoneOtp).subscribe({
  //       next: (response) => {
  //         if (response) {
  //           console.log(response);
  //           alert(response.message);
  //           this.otpForm.reset();
  //           this.router.navigate(['/main/ginnisignin']);
  //         } else {
  //           // OTPs are not valid, display an error message
  //           this.authError = 'Invalid OTPs. Please try again.';
  //         }
  //       },
  //       error: (error) => {
  //         // Handle error response
  //         console.error('Error verifying OTPs:', error);
  //         if (error && error.error && error.error.message && error.error.message.includes('OTP expired')) {
  //           // Display alert for OTP expiration
  //           alert('OTP Expired');
  //         } else {
  //           // Display generic error message or handle other error cases
  //           alert('An error occurred during OTP verification');
  //         }
  //       },
  //     });
  //   }
  // }
}
