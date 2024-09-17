import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule, HammerModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
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
import { GinnideliveryComponent } from './Component/ginnidelivery/ginnidelivery.component';
import { NgToastModule } from 'ng-angular-popup';
import { SelleraddproductComponent } from './Component/selleraddproduct/selleraddproduct.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { GinniresetpasswordComponent } from './Component/ginniresetpassword/ginniresetpassword.component';
import { GinniconfirmemailComponent } from './Component/ginniconfirmemail/ginniconfirmemail.component';
import { SellerdashboardComponent } from './Component/sellerdashboard/sellerdashboard.component';
import { SellerproductlistComponent } from './Component/sellerproductlist/sellerproductlist.component';
import { SellerorderlistComponent } from './Component/sellerorderlist/sellerorderlist.component';
import { SellercustomerlistComponent } from './Component/sellercustomerlist/sellercustomerlist.component';
import { SearchComponent } from './Component/search/search.component';
import { GinnidetailorderComponent } from './Component/ginnidetailorder/ginnidetailorder.component';
import { SellerzipcodelistComponent } from './Component/sellerzipcodelist/sellerzipcodelist.component';
import { GinniotpComponent } from './Component/ginniotp/ginniotp.component';
import { GinnireviewsliderComponent } from './Component/ginnireviewslider/ginnireviewslider.component';
import { GinniofferresponseComponent } from './Component/ginniofferresponse/ginniofferresponse.component';
import { GinnisaveheaderComponent } from './Component/ginnisaveheader/ginnisaveheader.component';
import { GinninotfoundComponent } from './Component/ginninotfound/ginninotfound.component';
import { GinnifivecombosComponent } from './Component/ginnifivecombos/ginnifivecombos.component';
import { GinnifivebestsellersComponent } from './Component/ginnifivebestsellers/ginnifivebestsellers.component';
import { GinnifivegiftingsComponent } from './Component/ginnifivegiftings/ginnifivegiftings.component';
import { GinnifiveproductsComponent } from './Component/ginnifiveproducts/ginnifiveproducts.component';
import { ToastrModule } from 'ngx-toastr';
import { PreloaderComponent } from './Component/preloader/preloader.component';


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
    GinnideliveryComponent,
    SelleraddproductComponent,
    GinniresetpasswordComponent,
    GinniconfirmemailComponent,
    SellerdashboardComponent,
    SellerproductlistComponent,
    SellerorderlistComponent,
    SellercustomerlistComponent,
    SearchComponent,
    GinnidetailorderComponent,
    SellerzipcodelistComponent,
    GinniotpComponent,
    GinnireviewsliderComponent,
    GinniofferresponseComponent,
    GinnisaveheaderComponent,
    GinninotfoundComponent,
    GinnifivecombosComponent,
    GinnifivebestsellersComponent,
    GinnifivegiftingsComponent,
    GinnifiveproductsComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule, // Add this line
    NoopAnimationsModule, // Add this line
    HammerModule,
    ToastrModule.forRoot({
      timeOut: 2000, 
      closeButton: true,
      // progressBar: true,
      positionClass: 'toast-top-right', // Change this to move toastr to the top center
      preventDuplicates: true, 
      enableHtml: true, // Allows HTML inside the toastr if needed for further styling
      tapToDismiss: false, // Prevents accidental dismissal on click
      titleClass: 'full-width-toast-title', 
      messageClass: 'full-width-toast-message',
    }), 
  ],

  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi:true
  },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    provideHttpClient();
  }
}
