import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GinnidryfruitComponent } from '../../Component/ginnidryfruit/ginnidryfruit.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GinnidryfruitComponent, data: { title: 'Dry Fruits' } }
];


@NgModule({
  declarations: [GinnidryfruitComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes)

  ]
})

export class DryFruitModule { 
  constructor() {
    console.log('DryFruitssModule has been loaded.');
  }
}
