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
  { path: 'about-us', component: GinniaboutusComponent },
  { path: 'contact-us', component: GinnicontactusComponent },
  { path: 'terms-conditions', component: GinnitermserviceComponent },
  { path: 'privacy-policy', component: GinniprivacypolicyComponent },
  { path: 'shipping-policy', component: GinnishippingpolicyComponent },
  { path: 'return-policy', component: GinnireturnpolicyComponent }
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
