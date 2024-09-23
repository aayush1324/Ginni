import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GinnisigninComponent } from '../../Component/ginnisignin/ginnisignin.component';
import { GinnisignupComponent } from '../../Component/ginnisignup/ginnisignup.component';
import { GinniresetpasswordComponent } from '../../Component/ginniresetpassword/ginniresetpassword.component';
import { GinniforgotpasswordComponent } from '../../Component/ginniforgotpassword/ginniforgotpassword.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login', component: GinnisigninComponent, data: { title: 'Account' }},
  { path: 'register', component: GinnisignupComponent,  data: { title: 'Create Account' } },
  { path: 'reset-password', component: GinniresetpasswordComponent, data: { title: 'Account' } },
  { path: 'forgot-password', component: GinniforgotpasswordComponent, data: { title: 'Account' } }
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
