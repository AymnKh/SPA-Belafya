import { AllProductsComponent } from './all-products/all-products.component';
import { CuttingComponent } from './cutting/cutting.component';
import { SizesComponent } from './sizes/sizes.component';
import { HeadComponent } from './head/head.component';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'sizes',
    component:SizesComponent
  }
  ,
  {
    path: 'head',
    component:HeadComponent
  }
  ,
  {
    path: 'cutting',
    component:CuttingComponent
  },
  {
    path: 'add',
    component:ProductFormComponent
  },
  {
    path: 'all',
    component:AllProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
