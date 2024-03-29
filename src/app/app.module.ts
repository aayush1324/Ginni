import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GinniofferComponent } from './Component/ginnioffer/ginnioffer.component';
import { GinnifooterComponent } from './Component/ginnifooter/ginnifooter.component';
import { GinniimagesliderComponent } from './Component/ginniimageslider/ginniimageslider.component';
import { GinniproductsComponent } from './Component/ginniproducts/ginniproducts.component';
import { GinnitextandimageComponent } from './Component/ginnitextandimage/ginnitextandimage.component';
import { GinniupperfooterComponent } from './Component/ginniupperfooter/ginniupperfooter.component';
import { GinnifaqComponent } from './Component/ginnifaq/ginnifaq.component';
import { GinnisignupComponent } from './Component/ginnisignup/ginnisignup.component';
import { GinnisigninComponent } from './Component/ginnisignin/ginnisignin.component';
import { GinniforgotpasswordComponent } from './Component/ginniforgotpassword/ginniforgotpassword.component';
import { GinnicustomerreviewComponent } from './Component/ginnicustomerreview/ginnicustomerreview.component';
import { GinniaboutusComponent } from './Component/ginniaboutus/ginniaboutus.component';
import { GinnitermserviceComponent } from './Component/ginnitermservice/ginnitermservice.component';
import { GinniprivacypolicyComponent } from './Component/ginniprivacypolicy/ginniprivacypolicy.component';
import { GinnishippingpolicyComponent } from './Component/ginnishippingpolicy/ginnishippingpolicy.component';
import { GinnireturnpolicyComponent } from './Component/ginnireturnpolicy/ginnireturnpolicy.component';
import { GinnicontactusComponent } from './Component/ginnicontactus/ginnicontactus.component';
import { GinnifilterComponent } from './Component/ginnifilter/ginnifilter.component';
import { GinniallproductsComponent } from './Component/ginniallproducts/ginniallproducts.component';
import { GinnicartComponent } from './Component/ginnicart/ginnicart.component';
import { GinnimainproductComponent } from './Component/ginnimainproduct/ginnimainproduct.component';
import { MainComponent } from './Component/main/main.component';
import { HomeComponent } from './Component/home/home.component';
import { GinnisliderComponent } from './Component/ginnislider/ginnislider.component';
import { SellersignupComponent } from './Component/sellersignup/sellersignup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { SellerhomeComponent } from './Component/sellerhome/sellerhome.component';
import { SellersigninComponent } from './Component/sellersignin/sellersignin.component';
import { GinnicombosComponent } from './Component/ginnicombos/ginnicombos.component';
import { GinnigiftingsComponent } from './Component/ginnigiftings/ginnigiftings.component';
import { GinnibestsellersComponent } from './Component/ginnibestsellers/ginnibestsellers.component';
import { GinnidryfruitalmondComponent } from './Component/ginnidryfruitalmond/ginnidryfruitalmond.component';
import { GinnidryfruitcashewComponent } from './Component/ginnidryfruitcashew/ginnidryfruitcashew.component';
import { GinnidryfruitraisinComponent } from './Component/ginnidryfruitraisin/ginnidryfruitraisin.component';
import { GinnidryfruitpistaComponent } from './Component/ginnidryfruitpista/ginnidryfruitpista.component';
import { GinnidryfruitwalnutComponent } from './Component/ginnidryfruitwalnut/ginnidryfruitwalnut.component';
import { GinnidryfruitComponent } from './Component/ginnidryfruit/ginnidryfruit.component';
import { GinniwishlistComponent } from './Component/ginniwishlist/ginniwishlist.component';
import { GinnitrackComponent } from './Component/ginnitrack/ginnitrack.component';
import { GinniprofileComponent } from './Component/ginniprofile/ginniprofile.component';
import { GinniaddressComponent } from './Component/ginniaddress/ginniaddress.component';
import { GinniorderComponent } from './Component/ginniorder/ginniorder.component';



@NgModule({
  declarations: [
    AppComponent,
    GinniofferComponent,
    GinnifooterComponent,
    GinniimagesliderComponent,
    GinniproductsComponent,
    GinnitextandimageComponent,
    GinniupperfooterComponent,
    GinnifaqComponent,
    GinnisignupComponent,
    GinnisigninComponent,
    GinniforgotpasswordComponent,
    GinnicustomerreviewComponent,
    GinniaboutusComponent,
    GinnitermserviceComponent,
    GinniprivacypolicyComponent,
    GinnishippingpolicyComponent,
    GinnireturnpolicyComponent,
    GinnicontactusComponent,
    GinnifilterComponent,
    GinniallproductsComponent,
    GinnicartComponent,
    GinnimainproductComponent,
    MainComponent,
    HomeComponent,
    GinnisliderComponent,
    SellersignupComponent,
    SellerhomeComponent,
    SellersigninComponent,
    GinnicombosComponent,
    GinnigiftingsComponent,
    GinnibestsellersComponent,
    GinnidryfruitalmondComponent,
    GinnidryfruitcashewComponent,
    GinnidryfruitraisinComponent,
    GinnidryfruitpistaComponent,
    GinnidryfruitwalnutComponent,
    GinnidryfruitComponent,
    GinniwishlistComponent,
    GinnitrackComponent,
    GinniprofileComponent,
    GinniaddressComponent,
    GinniorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    provideHttpClient();
  }
}
