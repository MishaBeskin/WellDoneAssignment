import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryLocationsComponent } from './components/category-locations/category-locations.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationCreateComponent } from './components/location-create/location-create.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent, CategoryLocationsComponent, LocationListComponent, LocationCreateComponent, MapComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    LeafletModule
  ]
})
export class CategoriesModule { }
