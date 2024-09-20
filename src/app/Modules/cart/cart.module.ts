import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GinnicartComponent } from '../../Component/ginnicart/ginnicart.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GinnicartComponent }
];

@NgModule({
  declarations: [GinnicartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { }
