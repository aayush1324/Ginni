import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GinnimainproductComponent } from '../../Component/ginnimainproduct/ginnimainproduct.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: ':productName', component: GinnimainproductComponent }
];

@NgModule({
  declarations: [GinnimainproductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MainProductModule { }
