import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GinnibestsellersComponent } from '../../Component/ginnibestsellers/ginnibestsellers.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: '', component: GinnibestsellersComponent }
];

@NgModule({
  declarations: [GinnibestsellersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})

export class BestSellerModule {
  constructor() {
    console.log('BestsellersModule has been loaded.');
  }
 }
