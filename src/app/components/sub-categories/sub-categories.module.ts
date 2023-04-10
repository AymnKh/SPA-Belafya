import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { SubCategoriesComponent } from './sub-categories.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubCategoriesComponent
  ],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class SubCategoriesModule { }
