import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { LocationListComponent } from './components/location-list/location-list.component';


export function isCategory(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('category-list') ? ({ consumed: url }) : null;
}

export function isLocation(url: UrlSegment[], group: UrlSegmentGroup) {
  return group.segments.length === 1 && group.segments[0].path.endsWith('location-list') ? ({ consumed: url }) : null;
}



const routes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent,
    matcher: isCategory
  },
  {
    path: 'location-list',
    component: LocationListComponent,
    matcher: isLocation
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
