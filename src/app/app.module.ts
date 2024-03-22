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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
