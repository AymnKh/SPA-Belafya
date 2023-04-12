import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/slider/slider.module').then(m => m.SliderModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'sub-categories',
    loadChildren: () => import('./components/sub-categories/sub-categories.module').then(m => m.SubCategoriesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
