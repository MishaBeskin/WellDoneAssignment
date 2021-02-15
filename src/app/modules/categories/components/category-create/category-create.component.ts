import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editCategorySub: Subscription;
  editCategory = undefined;
  @Input() category;
  constructor(private dataService: DataService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.category ? this.category.name : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  onCreateCategory() {
    if (!this.form.valid) {
      return;
    }
    if (!this.category) {
      return this.dataService.createCategory(
        this.form.value.name
      ).subscribe(() => {
        this.form.reset();
        this.activeModal.close();
      });
    } else {
      return this.dataService.updateCategory(
        this.category.id,
        this.form.value.name
      ).subscribe(() => {
        this.form.reset();
        this.activeModal.close();
      });
    }
  }



  ngOnDestroy() {
    if (this.editCategorySub) {
      this.editCategorySub.unsubscribe();
    }
  }



}
