import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "category-list" },
  { path: "home", component: HomeComponent },

  {
    path: 'category-list',
    loadChildren: () => import('../app/modules/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'location-list',
    loadChildren: () => import('../app/modules/categories/categories.module').then(m => m.CategoriesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
