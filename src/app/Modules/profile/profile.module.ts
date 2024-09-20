import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GinniaddressComponent } from '../../Component/ginniaddress/ginniaddress.component';
import { GinniorderComponent } from '../../Component/ginniorder/ginniorder.component';
import { GinnidetailorderComponent } from '../../Component/ginnidetailorder/ginnidetailorder.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../Guard/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'address', component: GinniaddressComponent, canActivate: [authGuard] },
  { path: 'order', component: GinniorderComponent, canActivate: [authGuard] },
  { path: 'order/:orderId', component: GinnidetailorderComponent, canActivate: [authGuard] }
];

@NgModule({
  declarations: [
    GinniaddressComponent,
    GinniorderComponent,
    GinnidetailorderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
