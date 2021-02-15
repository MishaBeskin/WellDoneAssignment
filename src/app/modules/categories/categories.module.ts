import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryLocationsComponent } from './components/category-locations/category-locations.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent, CategoryLocationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
  ]
})
export class CategoriesModule { }
