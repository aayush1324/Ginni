import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-ginniotp',
  templateUrl: './ginniotp.component.html',
  styleUrl: './ginniotp.component.css'
})
export class GinniotpComponent {

  otpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router : Router, private auth: AuthService, 
              private resetPasswordService : ResetPasswordService) 
  {
    this.otpForm = this.formBuilder.group({
      emailOtp: ['', [Validators.required, Validators.minLength(6)]],
      mobileOtp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  OtpForm (){

  }

}
