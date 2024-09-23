import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GinniaboutusComponent } from '../../Component/ginniaboutus/ginniaboutus.component';
import { GinnicontactusComponent } from '../../Component/ginnicontactus/ginnicontactus.component';
import { GinnitermserviceComponent } from '../../Component/ginnitermservice/ginnitermservice.component';
import { GinniprivacypolicyComponent } from '../../Component/ginniprivacypolicy/ginniprivacypolicy.component';
import { GinnishippingpolicyComponent } from '../../Component/ginnishippingpolicy/ginnishippingpolicy.component';
import { RouterModule, Routes } from '@angular/router';
import { GinnireturnpolicyComponent } from '../../Component/ginnireturnpolicy/ginnireturnpolicy.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'about-us', component: GinniaboutusComponent, data: { title: 'About Us' } },
  { path: 'contact-us', component: GinnicontactusComponent, data: { title: 'Contact Us' } },
  { path: 'terms-conditions', component: GinnitermserviceComponent, data: { title: 'Terms and Conditions' } },
  { path: 'privacy-policy', component: GinniprivacypolicyComponent, data: { title: 'Privacy Policy' } },
  { path: 'shipping-policy', component: GinnishippingpolicyComponent, data: { title: 'Shipping Policy' } },
  { path: 'return-policy', component: GinnireturnpolicyComponent, data: { title: 'Return Policy' } }
];

@NgModule({
  declarations: [
    GinniaboutusComponent,
    GinnicontactusComponent,
    GinnitermserviceComponent,
    GinniprivacypolicyComponent,
    GinnishippingpolicyComponent,
    GinnireturnpolicyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { 
  constructor() {
    console.log('PagesModule has been loaded.');
  }
  
}
