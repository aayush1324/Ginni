import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GinnisigninComponent } from '../../Component/ginnisignin/ginnisignin.component';
import { GinnisignupComponent } from '../../Component/ginnisignup/ginnisignup.component';
import { GinniresetpasswordComponent } from '../../Component/ginniresetpassword/ginniresetpassword.component';
import { GinniforgotpasswordComponent } from '../../Component/ginniforgotpassword/ginniforgotpassword.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login', component: GinnisigninComponent },
  { path: 'register', component: GinnisignupComponent },
  { path: 'reset-password', component: GinniresetpasswordComponent },
  { path: 'forgot-password', component: GinniforgotpasswordComponent }
];

@NgModule({
  declarations: [
    GinnisigninComponent,
    GinnisignupComponent,
    GinniresetpasswordComponent,
    GinniforgotpasswordComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule { }
