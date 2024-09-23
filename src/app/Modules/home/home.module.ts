import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../Component/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
