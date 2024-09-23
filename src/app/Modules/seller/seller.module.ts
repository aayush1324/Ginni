import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerdashboardComponent } from '../../Component/sellerdashboard/sellerdashboard.component';
import { SellercustomerlistComponent } from '../../Component/sellercustomerlist/sellercustomerlist.component';
import { SellerorderlistComponent } from '../../Component/sellerorderlist/sellerorderlist.component';
import { SellerproductlistComponent } from '../../Component/sellerproductlist/sellerproductlist.component';
import { SellerzipcodelistComponent } from '../../Component/sellerzipcodelist/sellerzipcodelist.component';
import { authGuard } from '../../Guard/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { 
    path: '', 
    component: SellerdashboardComponent,
    children: [
      { path: 'sellercustomerlist', component: SellercustomerlistComponent, canActivate: [authGuard], data: { title: 'CustomerList' } },
      { path: 'sellerorderlist', component: SellerorderlistComponent, canActivate: [authGuard],data: { title: 'OrderList' } },
      { path: 'sellerproductlist', component: SellerproductlistComponent, canActivate: [authGuard], data: { title: 'ProductList' } },
      { path: 'sellerzipcodelist', component: SellerzipcodelistComponent, canActivate: [authGuard], data: { title: 'ZipCodeList' } },
      { path: '', redirectTo: 'sellerproductlist', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    SellerdashboardComponent,
    SellercustomerlistComponent,
    SellerorderlistComponent,
    SellerproductlistComponent,
    SellerzipcodelistComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SellerModule { }
