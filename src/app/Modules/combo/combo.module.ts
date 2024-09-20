import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GinnicombosComponent } from '../../Component/ginnicombos/ginnicombos.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GinnicombosComponent }
];

@NgModule({
  declarations: [GinnicombosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes)
  ]
})
export class ComboModule { 
  constructor() {
    console.log('CombosModule has been loaded.');
  }
}
