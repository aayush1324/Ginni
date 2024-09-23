import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GinniallproductsComponent } from '../../Component/ginniallproducts/ginniallproducts.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GinniallproductsComponent, data: { title: 'All Products' }}
];


@NgModule({
  declarations: [GinniallproductsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes)
  ]
})

export class ShopCategoryModule { 
  constructor() {
    console.log('AllProductModule has been loaded.');
  }
}
