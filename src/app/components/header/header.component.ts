import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category, Location } from 'src/app/entities.model';
import { CategoryCreateComponent } from 'src/app/modules/categories/components/category-create/category-create.component';
import { CategoryLocationsComponent } from 'src/app/modules/categories/components/category-locations/category-locations.component';
import { DataService } from 'src/app/modules/categories/services/data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataSrv: DataService, private modalService: NgbModal) { }
  subscription: Subscription;
  categoryName: Category;
  categories: Category[];
  locations: Location[];
  private categoriesSub: Subscription;
  private locationsSub: Subscription;
  ngOnInit(): void {
    this.subscription = this.dataSrv.currentCategory.subscribe(categoryName => this.categoryName = categoryName)
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


  edit(category: Category) {
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
  delete(categoryId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.dataSrv.delete(categoryId).subscribe(() => {
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    if (this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
  }
}
