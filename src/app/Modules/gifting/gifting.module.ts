import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GinnigiftingsComponent } from '../../Component/ginnigiftings/ginnigiftings.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: GinnigiftingsComponent, data: { title: 'Giftings' } }
];


@NgModule({
  declarations: [GinnigiftingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes)
  ]
})
export class GiftingModule { 
  constructor() {
    console.log('GiftingsModule has been loaded.');
  }

}
