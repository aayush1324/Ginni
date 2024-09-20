import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Component/main/main.component';
import { GinniaboutusComponent } from './Component/ginniaboutus/ginniaboutus.component';
import { GinniallproductsComponent } from './Component/ginniallproducts/ginniallproducts.component';
import { GinnicartComponent } from './Component/ginnicart/ginnicart.component';
import { GinnicontactusComponent } from './Component/ginnicontactus/ginnicontactus.component';
import { GinnifaqComponent } from './Component/ginnifaq/ginnifaq.component';
import { GinnifilterComponent } from './Component/ginnifilter/ginnifilter.component';
import { GinnifooterComponent } from './Component/ginnifooter/ginnifooter.component';
import { GinniforgotpasswordComponent } from './Component/ginniforgotpassword/ginniforgotpassword.component';
import { GinniimagesliderComponent } from './Component/ginniimageslider/ginniimageslider.component';
import { GinnimainproductComponent } from './Component/ginnimainproduct/ginnimainproduct.component';
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
import { GinnifivebestsellersComponent } from './Component/ginnifivebestsellers/ginnifivebestsellers.component';
import { GinnifivecombosComponent } from './Component/ginnifivecombos/ginnifivecombos.component';
import { GinnifivegiftingsComponent } from './Component/ginnifivegiftings/ginnifivegiftings.component';
import { GinnifiveproductsComponent } from './Component/ginnifiveproducts/ginnifiveproducts.component';
import { GinnisliderComponent } from './Component/ginnislider/ginnislider.component';
import { GinniofferresponseComponent } from './Component/ginniofferresponse/ginniofferresponse.component';
import { GinnisaveheaderComponent } from './Component/ginnisaveheader/ginnisaveheader.component';


const routes: Routes = [{
    path:"" ,component : MainComponent, children: [
      {path: "", component : HomeComponent},

      // {path: "save-header" , component : GinnisaveheaderComponent},
      // {path: "offer-response" , component : GinniofferresponseComponent},
      // {path: "image-slider" , component : GinniimagesliderComponent},
      // {path: "fiveproducts" , component : GinnifiveproductsComponent},
      // {path: "slider", component : GinnisliderComponent},
      // {path: "fivebestseller" , component : GinnifivebestsellersComponent},
      // {path: "review-slider", component : GinnireviewsliderComponent},
      // {path: "fivecombos" , component : GinnifivecombosComponent},
      // {path: "text-image", component : GinnitextandimageComponent},
      // {path: "fivegiftings" , component : GinnifivegiftingsComponent},
      // {path: "faq", component : GinnifaqComponent},
      // {path: "upper-footer", component : GinniupperfooterComponent},
      // {path: "footer",  component : GinnifooterComponent},

      
      // {path: "account/wishlist" , component : GinniwishlistComponent},
      // {path: "account/track" , component : GinnitrackComponent},
      // {path: "search", component : SearchComponent},     


      // {path: "pages/about-us" , component : GinniaboutusComponent},
      // {path: "pages/contact-us" , component : GinnicontactusComponent},
      // {path: "pages/terms-conditions",  component : GinnitermserviceComponent},
      // {path: "pages/privacy-policy" , component : GinniprivacypolicyComponent},
      // {path: "pages/shipping-policy", component : GinnishippingpolicyComponent},
      // {path: "pages/return-policy", component : GinnireturnpolicyComponent},
      { path: 'pages', loadChildren: () => import('./Modules/pages/pages.module').then(m => m.PagesModule) },

      // {path: "collections/giftings", component : GinnigiftingsComponent},
      // {path: "collections/combos",  component : GinnicombosComponent},
      // {path: "collections/dryfruit" , component : GinnidryfruitComponent},
      // {path: "collections/bestsellers", component : GinnibestsellersComponent},
      // {path: "collections/all" , component : GinniallproductsComponent},
      { path: 'collections/bestsellers', loadChildren: () => import('./Modules/best-seller/best-seller.module').then(m => m.BestSellerModule) },
      { path: 'collections/combos', loadChildren: () => import('./Modules/combo/combo.module').then(m => m.ComboModule) },
      { path: 'collections/giftings', loadChildren: () => import('./Modules/gifting/gifting.module').then(m => m.GiftingModule) },
      { path: 'collections/dryfruit', loadChildren: () => import('./Modules/dry-fruit/dry-fruit.module').then(m => m.DryFruitModule) },
      { path: 'collections/all', loadChildren: () => import('./Modules/shop-category/shop-category.module').then(m => m.ShopCategoryModule) },

      // {path: "account/login" , component : GinnisigninComponent},
      // {path: "account/register", component : GinnisignupComponent},
      // {path: "account/reset-password", component : GinniresetpasswordComponent},
      // {path: "account/forgot-password", component : GinniforgotpasswordComponent},
      { path: 'account', loadChildren: () => import('./Modules/authentication/authentication.module').then(m => m.AuthenticationModule) },

      // {path: "account/cart" , component : GinnicartComponent},
      { path: 'account/cart', loadChildren: () => import('./Modules/cart/cart.module').then(m => m.CartModule) },

      // {path: "account/address", component : GinniaddressComponent,  canActivate:[authGuard]},
      // {path: "account/order", component : GinniorderComponent,  canActivate:[authGuard]},
      // {path: "account/order/:orderId", component : GinnidetailorderComponent,  canActivate:[authGuard]},
      { path: 'account', loadChildren: () => import('./Modules/profile/profile.module').then(m => m.ProfileModule) },

      // {path: "mainproduct/:productName" , component : GinnimainproductComponent},
      { path: 'mainproduct', loadChildren: () => import('./Modules/main-product/main-product.module').then(m => m.MainProductModule) },
     
      // {path: "sellerdashboard", component : SellerdashboardComponent, children : [
      //   {path: "sellercustomerlist", component : SellercustomerlistComponent, canActivate:[authGuard]},
      //   {path: "sellerorderlist", component : SellerorderlistComponent, canActivate:[authGuard]},
      //   {path: "sellerproductlist", component : SellerproductlistComponent, canActivate:[authGuard]},
      //   {path: "sellerzipcodelist", component : SellerzipcodelistComponent, canActivate:[authGuard]},
      //   { path: '', redirectTo: 'sellerproductlist', pathMatch: 'full' } 
      //   ]
      // }, 
      { path: 'seller', loadChildren: () => import('./Modules/seller/seller.module').then(m => m.SellerModule) },


      {path: "account/otp", component : GinniotpComponent,  canActivate:[authGuard]},
      {path: "not-found", component : GinninotfoundComponent},

      {path: "almond", component : GinnidryfruitalmondComponent},
      {path: "cashew", component : GinnidryfruitcashewComponent},
      {path: "pista",  component : GinnidryfruitpistaComponent},
      {path: "raisin", component : GinnidryfruitraisinComponent},
      {path: "walnut", component : GinnidryfruitwalnutComponent},

      {path: "" , redirectTo : "home", pathMatch : "full"},  
    ]
  },

  {path: "ginniconfirmemail", component : GinniconfirmemailComponent},
  {path:'' ,redirectTo:"main", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService })],
  exports: [RouterModule],
  providers: [CustomPreloadingService]
})
export class AppRoutingModule { }
