import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/entities.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {

  form: FormGroup;
  editLocationSub: Subscription;
  categoriesSub: Subscription;
  editLocation = undefined;
  @Input() location;
  categories: Category[];
  constructor(private dataService: DataService, public activeModal: NgbActiveModal) { }

  ngOnInit() {


    this.categoriesSub = this.dataService.categories.subscribe(categories => {
      this.categories = categories;
    });

    this.form = new FormGroup({
      name: new FormControl(this.location ? this.location.name : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      address: new FormControl(this.location ? this.location.address : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      cords: new FormControl(this.location ? this.location.cords : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      category: new FormControl(this.location ? this.location.category : 0, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      })
    });
    console.dir(this.categories);
  }

  onCreateLocation() {
    if (!this.form.valid) {
      return;
    }
    if (!this.location) {
      return this.dataService.createLocation(
        this.form.value.name,
        this.form.value.address,
        this.form.value.cords,
        this.form.value.category
      ).subscribe(() => {
        this.form.reset();
        this.activeModal.close();
      });
    } else {
      return this.dataService.updateLocation(
        this.location.id,
        this.form.value.name,
        this.form.value.address,
        this.form.value.cords,
        this.form.value.category
      ).subscribe(() => {
        this.form.reset();
        this.activeModal.close();
      });
    }
  }



  ngOnDestroy() {
    if (this.editLocationSub) {
      this.editLocationSub.unsubscribe();
    }
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
  }

}
