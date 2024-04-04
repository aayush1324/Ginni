import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../../Models/resetPassword.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { ConfirmPasswordValidator } from '../../Helpers/confirmpassword.validator';

@Component({
  selector: 'app-ginniresetpassword',
  templateUrl: './ginniresetpassword.component.html',
  styleUrl: './ginniresetpassword.component.css'
})
export class GinniresetpasswordComponent implements OnInit {
  
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  
  constructor(private fb: FormBuilder, private activated: ActivatedRoute,
    private toast: NgToastService, private router: Router,
    private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },
      { validator: ConfirmPasswordValidator("password", "confirmPassword") }
      );
      
    this.activated.queryParams.subscribe(val => {
      console.log(val);
      this.emailToReset = val['email'];
      let uriToken = (val['code']);
      console.log(this.emailToReset);
  
      this.emailToken = uriToken.replace(/ /g, '+');
      console.log(this.emailToken)
    });
  }


  reset() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      this.resetPasswordService.resetPassword(this.resetPasswordObj)
        .subscribe({
          next: (res) => {
            console.log("Reset Successfully")
            this.toast.success({
              detail: 'SUCCESS',
              summary: res.message,
              duration: 3000,
            });
            this.router.navigate(['/'])
          },
          error: (err) => {
            this.toast.error({
              detail: 'SUCCESS',
              summary: "Something went wrong",
              duration: 3000,
            });
          }
        })
    } else {
      // ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }
}