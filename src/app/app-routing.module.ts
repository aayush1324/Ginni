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
      {path: "ginnimainproduct/:productName" , component : GinnimainproductComponent},
      {path: "ginnioffer" , component : GinniofferComponent},
      {path: "ginniprivacypolicy" , component : GinniprivacypolicyComponent},
      {path: "ginniproducts" , component : GinniproductsComponent},
      {path: "ginnireturnpolicy", component : GinnireturnpolicyComponent},
      {path: "ginnishippingpolicy", component : GinnishippingpolicyComponent},
      {path: "ginnitermservice",  component : GinnitermserviceComponent},
      {path: "ginnitextandimage", component : GinnitextandimageComponent},
      {path: "ginniupperfooter", component : GinniupperfooterComponent},
      {path: "ginnitrack" , component : GinnitrackComponent},
      {path: "ginniwishlist" , component : GinniwishlistComponent},
      {path: "ginniprofile" , component : GinniprofileComponent,  canActivate:[authGuard]},
      {path: "ginniorder", component : GinniorderComponent,  canActivate:[authGuard]},
      {path: "ginnidetailorder/:orderId", component : GinnidetailorderComponent,  canActivate:[authGuard]},
      {path: "ginnigiftings", component : GinnigiftingsComponent},
      {path: "ginnicombos",  component : GinnicombosComponent},
      {path: "ginnibestsellers", component : GinnibestsellersComponent},
      {path: "ginniaddress", component : GinniaddressComponent,  canActivate:[authGuard]},
      {path: "ginnireviewslider", component : GinnireviewsliderComponent},
      {path: "ginnidryfruit" , component : GinnidryfruitComponent},
      {path: "ginnidryfruitalmond", component : GinnidryfruitalmondComponent},
      {path: "ginnidryfruitcashew", component : GinnidryfruitcashewComponent},
      {path: "ginnidryfruitpista",  component : GinnidryfruitpistaComponent},
      {path: "ginnidryfruitraisin", component : GinnidryfruitraisinComponent},
      {path: "ginnidryfruitwalnut", component : GinnidryfruitwalnutComponent},
      {path: "home", component : HomeComponent},
      {path: "ginninotfound", component : GinninotfoundComponent},
      {path: "ginnisignin" , component : GinnisigninComponent},
      {path: "ginnisignup", component : GinnisignupComponent},
      {path: "ginniotp", component : GinniotpComponent,  canActivate:[authGuard]},
      {path: "ginniresetpassword", component : GinniresetpasswordComponent},
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
