import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
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
import { GinnitrackComponent } from './Component/ginnitrack/ginnitrack.component';
import { GinniwishlistComponent } from './Component/ginniwishlist/ginniwishlist.component';
import { GinniprofileComponent } from './Component/ginniprofile/ginniprofile.component';
import { GinniorderComponent } from './Component/ginniorder/ginniorder.component';
import { GinnigiftingsComponent } from './Component/ginnigiftings/ginnigiftings.component';
import { GinnicombosComponent } from './Component/ginnicombos/ginnicombos.component';
import { GinnibestsellersComponent } from './Component/ginnibestsellers/ginnibestsellers.component';
import { GinniaddressComponent } from './Component/ginniaddress/ginniaddress.component';
import { GinnidryfruitComponent } from './Component/ginnidryfruit/ginnidryfruit.component';
import { GinnidryfruitalmondComponent } from './Component/ginnidryfruitalmond/ginnidryfruitalmond.component';
import { GinnidryfruitcashewComponent } from './Component/ginnidryfruitcashew/ginnidryfruitcashew.component';
import { GinnidryfruitpistaComponent } from './Component/ginnidryfruitpista/ginnidryfruitpista.component';
import { GinnidryfruitraisinComponent } from './Component/ginnidryfruitraisin/ginnidryfruitraisin.component';
import { GinnidryfruitwalnutComponent } from './Component/ginnidryfruitwalnut/ginnidryfruitwalnut.component';
import { SelleraddproductComponent } from './Component/selleraddproduct/selleraddproduct.component';
import { authGuard } from './Guard/auth.guard';
import { GinniresetpasswordComponent } from './Component/ginniresetpassword/ginniresetpassword.component';
import { GinniconfirmemailComponent } from './Component/ginniconfirmemail/ginniconfirmemail.component';
import { SellerdashboardComponent } from './Component/sellerdashboard/sellerdashboard.component';
import { SellercustomerlistComponent } from './Component/sellercustomerlist/sellercustomerlist.component';
import { SellerorderlistComponent } from './Component/sellerorderlist/sellerorderlist.component';
import { SellerproductlistComponent } from './Component/sellerproductlist/sellerproductlist.component';
import { SearchComponent } from './Component/search/search.component';
import { GinnidetailorderComponent } from './Component/ginnidetailorder/ginnidetailorder.component';
import { SellerzipcodelistComponent } from './Component/sellerzipcodelist/sellerzipcodelist.component';
import { CustomPreloadingService } from './Services/custom-preloading.service';
import { GinniotpComponent } from './Component/ginniotp/ginniotp.component';
import { GinnireviewsliderComponent } from './Component/ginnireviewslider/ginnireviewslider.component';
import { GinninotfoundComponent } from './Component/ginninotfound/ginninotfound.component';


const routes: Routes = [{
    path:"" ,component : MainComponent, children: [
      {path: "", component : HomeComponent},

      {path: "pages/about-us" , component : GinniaboutusComponent},
      {path: "pages/contact-us" , component : GinnicontactusComponent},
      {path: "pages/terms-conditions",  component : GinnitermserviceComponent},
      {path: "pages/privacy-policy" , component : GinniprivacypolicyComponent},
      {path: "pages/shipping-policy", component : GinnishippingpolicyComponent},
      {path: "pages/return-policy", component : GinnireturnpolicyComponent},


      {path: "collections/giftings", component : GinnigiftingsComponent},
      {path: "collections/combos",  component : GinnicombosComponent},
      {path: "collections/bestsellers", component : GinnibestsellersComponent},
      {path: "collections/dryfruit" , component : GinnidryfruitComponent},
      {path: "collections/all" , component : GinniallproductsComponent},


      {path: "account/login" , component : GinnisigninComponent},
      {path: "account/register", component : GinnisignupComponent},
      {path: "account/reset-password", component : GinniresetpasswordComponent},
      {path: "account/forgot-password", component : GinniforgotpasswordComponent},
      {path: "account/cart" , component : GinnicartComponent},
      {path: "account/wishlist" , component : GinniwishlistComponent},
      {path: "account/track" , component : GinnitrackComponent},
      {path: "account/address", component : GinniaddressComponent,  canActivate:[authGuard]},
      {path: "account/order", component : GinniorderComponent,  canActivate:[authGuard]},
      {path: "account/order/:orderId", component : GinnidetailorderComponent,  canActivate:[authGuard]},

      {path: "mainproduct/:productName" , component : GinnimainproductComponent},


      {path: "not-found", component : GinninotfoundComponent},
      {path: "otp", component : GinniotpComponent,  canActivate:[authGuard]},
      {path: "profile" , component : GinniprofileComponent,  canActivate:[authGuard]},

      {path: "offer" , component : GinniofferComponent},
      {path: "image-slider" , component : GinniimagesliderComponent},
      {path: "customer-review" , component : GinnicustomerreviewComponent},
      {path: "review-slider", component : GinnireviewsliderComponent},
      {path: "text-image", component : GinnitextandimageComponent},
      {path: "faq", component : GinnifaqComponent},
      {path: "upper-footer", component : GinniupperfooterComponent},
      {path: "footer",  component : GinnifooterComponent},
      {path: "filter", component : GinnifilterComponent},
      {path: "products" , component : GinniproductsComponent},

     

      {path: "almond", component : GinnidryfruitalmondComponent},
      {path: "cashew", component : GinnidryfruitcashewComponent},
      {path: "pista",  component : GinnidryfruitpistaComponent},
      {path: "raisin", component : GinnidryfruitraisinComponent},
      {path: "walnut", component : GinnidryfruitwalnutComponent},
    
      {path: "sellerdashboard", component : SellerdashboardComponent, children : [
        {path: "selleraddproduct", component : SelleraddproductComponent, canActivate:[authGuard]},
        {path: "sellercustomerlist", component : SellercustomerlistComponent, canActivate:[authGuard]},
        {path: "sellerorderlist", component : SellerorderlistComponent, canActivate:[authGuard]},
        {path: "sellerproductlist", component : SellerproductlistComponent, canActivate:[authGuard]},
        {path: "sellerzipcodelist", component : SellerzipcodelistComponent, canActivate:[authGuard]},
        { path: '', redirectTo: 'sellerproductlist', pathMatch: 'full' } 
        ]
      }, 
      {path: "search", component : SearchComponent},     
      {path: "" , redirectTo : "home", pathMatch : "full"},  
    ]
  },

  {path: "ginniconfirmemail", component : GinniconfirmemailComponent},
  {path:'' ,redirectTo:"main", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CustomPreloadingService]
})
export class AppRoutingModule { }
