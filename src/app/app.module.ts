import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { CardThumbnail2Component } from './Component/card-thumbnail2/card-thumbnail2.component';
import { CardThumbnailwithProgressbarComponent } from './Component/card-thumbnailwith-progressbar/card-thumbnailwith-progressbar.component';
import { CounterComponent } from './Component/counter/counter.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { OrderComponent } from './Component/order/order.component';
import { RatingComponent } from './Component/rating/rating.component';
import { WriteReviewComponent } from './Component/write-review/write-review.component';
import { ReviewsComponent } from './Component/reviews/reviews.component';
import { CreateReviewComponent } from './Component/create-review/create-review.component';
import { TestimonialComponent } from './Component/testimonial/testimonial.component';
import { PaymentListComponent } from './Component/payment-list/payment-list.component';
import { CheckoutListComponent } from './Component/checkout-list/checkout-list.component';
import { AccountSettingsComponent } from './Component/account-settings/account-settings.component';
import { CategoryImageComponent } from './Component/category-image/category-image.component';
import { SignupMobComponent } from './Component/signup-mob/signup-mob.component';
import { RetailerComponent } from './Component/retailer/retailer.component';
import { FiltersComponent } from './Component/filters/filters.component';
import { CategoryFilterComponent } from './Component/category-filter/category-filter.component';
import { StoreFilterComponent } from './Component/store-filter/store-filter.component';
import { PriceFilterComponent } from './Component/price-filter/price-filter.component';
import { RatingFilterComponent } from './Component/rating-filter/rating-filter.component';
import { FilterbarComponent } from './Component/filterbar/filterbar.component';
import { Feature6Component } from './Component/feature6/feature6.component';
import { Feature4Component } from './Component/feature4/feature4.component';
import { LargeImageProductComponent } from './Component/large-image-product/large-image-product.component';
import { CheckoutOrderComponent } from './Component/checkout-order/checkout-order.component';
import { OneLineFilterComponent } from './Component/one-line-filter/one-line-filter.component';
import { OrderDetailsComponent } from './Component/order-details/order-details.component';
import { SlideproductsComponent } from './Component/slideproducts/slideproducts.component';
import { SlidecategoriesComponent } from './Component/slidecategories/slidecategories.component';
import { SliderComponent } from './Component/slider/slider.component';
import { GriditemsComponent } from './Component/griditems/griditems.component';
import { TextandimageComponent } from './Component/textandimage/textandimage.component';
import { AccordionComponent } from './Component/accordion/accordion.component';
import { BadgeComponent } from './Component/badge/badge.component';
import { PaginationComponent } from './Component/pagination/pagination.component';
import { HeaderComponent } from './Component/header/header.component';
import { GinniofferComponent } from './Component/ginnioffer/ginnioffer.component';
import { GinnifooterComponent } from './Component/ginnifooter/ginnifooter.component';
import { GinniimagesliderComponent } from './Component/ginniimageslider/ginniimageslider.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CardThumbnail2Component,
    CardThumbnailwithProgressbarComponent,
    CounterComponent,
    WishlistComponent,
    OrderComponent,
    RatingComponent,
    WriteReviewComponent,
    ReviewsComponent,
    CreateReviewComponent,
    TestimonialComponent,
    PaymentListComponent,
    CheckoutListComponent,
    AccountSettingsComponent,
    CategoryImageComponent,
    SignupMobComponent,
    RetailerComponent,
    FiltersComponent,
    CategoryFilterComponent,
    StoreFilterComponent,
    PriceFilterComponent,
    RatingFilterComponent,
    FilterbarComponent,
    Feature6Component,
    Feature4Component,
    LargeImageProductComponent,
    CheckoutOrderComponent,
    OneLineFilterComponent,
    OrderDetailsComponent,
    SlideproductsComponent,
    SlidecategoriesComponent,
    SliderComponent,
    GriditemsComponent,
    TextandimageComponent,
    AccordionComponent,
    BadgeComponent,
    PaginationComponent,
    HeaderComponent,
    GinniofferComponent,
    GinnifooterComponent,
    GinniimagesliderComponent,
  
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
