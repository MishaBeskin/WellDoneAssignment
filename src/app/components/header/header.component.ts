import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category, LocationCat } from 'src/app/entities.model';
import { CategoryCreateComponent } from 'src/app/modules/categories/components/category-create/category-create.component';
import { CategoryLocationsComponent } from 'src/app/modules/categories/components/category-locations/category-locations.component';
import { LocationCreateComponent } from 'src/app/modules/categories/components/location-create/location-create.component';
import { DataService } from 'src/app/modules/categories/services/data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataSrv: DataService,
    private modalService: NgbModal,
    location: Location, router: Router
  ) {
    router.events.subscribe(val => {
      if (location.path() === "/category-list") {
        this.route = "category";
      } else {
        this.route = "location";
      }
    });

  }
  route: string;
  subscription: Subscription;
  subscriptionLocationName: Subscription;
  categoryName: Category;
  locationName: LocationCat;
  categories: Category[];
  locations: LocationCat[];
  private categoriesSub: Subscription;
  private locationsSub: Subscription;
  ngOnInit(): void {
    this.subscription = this.dataSrv.currentCategory.subscribe(categoryName => this.categoryName = categoryName)
    this.subscriptionLocationName = this.dataSrv.currentLocation.subscribe(locationName => this.locationName = locationName)
  }


  showCategory(category: Category) {
    console.log(category.name);
    this.categoryName.name = category.name;
  }





  viewCategory(category: Category) {
    this.locationsSub = this.dataSrv.locations.subscribe(locations => {
      this.locations = locations.filter(location => location.category === category.id);
      const modalRef = this.modalService.open(
        CategoryLocationsComponent,
        {
          centered: true,
          backdrop: 'static',
          keyboard: false
        }
      );
      modalRef.componentInstance.locations = this.locations;
      modalRef.componentInstance.category = category;
    });
  }


  editCategory(category: Category) {
    const modalRef = this.modalService.open(
      CategoryCreateComponent,
      {
        centered: true,
        backdrop: 'static',
        keyboard: false
      }
    );
    modalRef.componentInstance.category = category;
  }

  editLocation(location: LocationCat) {
    const modalRef = this.modalService.open(
      LocationCreateComponent,
      {
        centered: true,
        backdrop: 'static',
        keyboard: false
      }
    );
    modalRef.componentInstance.location = location;
  }

  createNewCategory() {
    const modalRef = this.modalService.open(
      CategoryCreateComponent,
      {
        centered: true,
        backdrop: 'static',
        keyboard: false
      }
    );
    modalRef.componentInstance.category = null;
  }

  createNewLocation() {
    const modalRef = this.modalService.open(
      LocationCreateComponent,
      {
        centered: true,
        backdrop: 'static',
        keyboard: false
      }
    );
    modalRef.componentInstance.location = null;
  }


  deleteCategory(categoryId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.dataSrv.deleteCategory(categoryId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your Category has been deleted.',
            'success'
          )
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Category is safe :)',
          'error'
        )
      }
    })
  }

  deleteLocation(locationId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Location!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.dataSrv.deleteLocation(locationId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your Location has been deleted.',
            'success'
          )
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Location is safe :)',
          'error'
        )
      }
    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    if (this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
    if (this.subscriptionLocationName) {
      this.subscriptionLocationName.unsubscribe();
    }
  }
}
