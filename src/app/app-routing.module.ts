import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Component/main/main.component';
import { GinniaboutusComponent } from './Component/ginniaboutus/ginniaboutus.component';
import { GinniallproductsComponent } from './Component/ginniallproducts/ginniallproducts.component';
import { GinnicartComponent } from './Component/ginnicart/ginnicart.component';
import { GinnicontactusComponent } from './Component/ginnicontactus/ginnicontactus.component';
import { GinnicustomerreviewComponent } from './Component/ginnicustomerreview/ginnicustomerreview.component';
import { GinnifaqComponent } from './Component/ginnifaq/ginnifaq.component';
import { GinnifilterComponent } from './Component/ginnifilter/ginnifilter.component';
import { GinnifooterComponent } from './Component/ginnifooter/ginnifooter.component';
import { GinniforgotpasswordComponent } from './Component/ginniforgotpassword/ginniforgotpassword.component';
import { GinniimagesliderComponent } from './Component/ginniimageslider/ginniimageslider.component';
import { GinnimainproductComponent } from './Component/ginnimainproduct/ginnimainproduct.component';
import { GinniofferComponent } from './Component/ginnioffer/ginnioffer.component';
import { GinniprivacypolicyComponent } from './Component/ginniprivacypolicy/ginniprivacypolicy.component';
import { GinniproductsComponent } from './Component/ginniproducts/ginniproducts.component';
import { GinnireturnpolicyComponent } from './Component/ginnireturnpolicy/ginnireturnpolicy.component';
import { GinnishippingpolicyComponent } from './Component/ginnishippingpolicy/ginnishippingpolicy.component';
import { GinnisigninComponent } from './Component/ginnisignin/ginnisignin.component';
import { GinnisignupComponent } from './Component/ginnisignup/ginnisignup.component';
import { GinnitermserviceComponent } from './Component/ginnitermservice/ginnitermservice.component';
import { GinnitextandimageComponent } from './Component/ginnitextandimage/ginnitextandimage.component';
import { GinniupperfooterComponent } from './Component/ginniupperfooter/ginniupperfooter.component';
import { HomeComponent } from './Component/home/home.component';


const routes: Routes = [{
    path:"main" ,component : MainComponent, children: [
      {path: "ginniaboutus" , component : GinniaboutusComponent},
      {path: "ginniallproducts" , component : GinniallproductsComponent},
      {path: "ginnicart" , component : GinnicartComponent},
      {path: "ginnicontactus" , component : GinnicontactusComponent},
      {path: "ginnicustomerreview" , component : GinnicustomerreviewComponent},
      {path: "ginnifaq", component : GinnifaqComponent},
      {path: "ginnifilter", component : GinnifilterComponent},
      {path: "ginnifooter",  component : GinnifooterComponent},
      {path: "ginniforgotpassword", component : GinniforgotpasswordComponent},
      {path: "ginniimageslider" , component : GinniimagesliderComponent},
      {path: "ginnimainproduct" , component : GinnimainproductComponent},
      {path: "ginnioffer" , component : GinniofferComponent},
      {path: "ginniprivacypolicy" , component : GinniprivacypolicyComponent},
      {path: "ginniproducts" , component : GinniproductsComponent},
      {path: "ginnireturnpolicy", component : GinnireturnpolicyComponent},
      {path: "ginnishippingpolicy", component : GinnishippingpolicyComponent},
      {path: "ginnitermservice",  component : GinnitermserviceComponent},
      {path: "ginnitextandimage", component : GinnitextandimageComponent},
      {path: "ginniupperfooter", component : GinniupperfooterComponent},
      {path: "home", component : HomeComponent},
      {path: "ginnisignin" , component : GinnisigninComponent},
      {path: "ginnisignup", component : GinnisignupComponent},
      {path: "" , redirectTo : "home", pathMatch : "full"},  
    ]
  },
     {path:'' ,redirectTo:"main", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
