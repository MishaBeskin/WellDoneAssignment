import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { Category, Location } from '../../../../entities.model';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[];
  locations: Location[];
  private categoriesSub: Subscription;
  private locationsSub: Subscription;
  selectedCategory: Category;
  @ViewChild('creatCategory') creatCategory;
  @Output() categoryItemEvent = new EventEmitter<string>();
  constructor(private dataService: DataService, private modalService: NgbModal) { }
  public selectedItem: any = {};
  private isSelected = false;
  ngOnInit() {
    this.categoriesSub = this.dataService.categories.subscribe(categories => {
      this.categories = categories;
    });
  }
  selectCategory(category) {
    debugger;
    if (category.id === this.selectedItem.id && this.isSelected === true) {
      this.isSelected = false;
      this.selectedItem = {};
      this.dataService.unSelect().subscribe();
    }
    else {
      this.isSelected = true;
      this.selectedCategory = category;
      this.selectedItem = category
      this.dataService.changeCategory(category);
    }

  }

  ngOnDestroy() {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
  }
}
