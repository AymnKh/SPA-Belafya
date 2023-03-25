import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SizesComponent } from './sizes/sizes.component';
import { HeadComponent } from './head/head.component';
import { CuttingComponent } from './cutting/cutting.component';
import { ProductFormComponent } from './product-form/product-form.component';


@NgModule({
  declarations: [
    ProductComponent,
    SizesComponent,
    HeadComponent,
    CuttingComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
