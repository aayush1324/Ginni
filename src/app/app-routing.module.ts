import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {path : "footer" , component : FooterComponent},
  // {path : "navbar" , component : NavbarComponent},
  //{path : "large-image-product" , component : LargeImageProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
