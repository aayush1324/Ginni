import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './Component/footer/footer.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { LargeImageProductComponent } from './Component/large-image-product/large-image-product.component';

const routes: Routes = [
  {path : "footer" , component : FooterComponent},
  {path : "navbar" , component : NavbarComponent},
  {path : "large-image-product" , component : LargeImageProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
