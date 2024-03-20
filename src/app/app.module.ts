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


@NgModule({
  declarations: [
    AppComponent,
    GinniofferComponent,
    GinnifooterComponent,
    GinniimagesliderComponent,
    GinniproductsComponent,
    GinnitextandimageComponent,
    GinniupperfooterComponent,
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
