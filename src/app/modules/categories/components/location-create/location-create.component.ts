import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/entities.model';
import { DataService } from '../../services/data.service';
import { NominatimService } from '../../services/nominatim-service';

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

  cords: string;
  address: string;

  constructor(private dataService: DataService, public activeModal: NgbActiveModal,
    private nominatimService: NominatimService) { }

  ngOnInit() {

    if (this.location) {
      this.cords = this.location;
    }

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

  updateLocation($event) {
    //this.cords = ($event.latitude * 1).toFixed(6) + "," + ($event.longitude * 1).toFixed(6);
    this.form.controls['address'].setValue($event.name);
    this.address = $event.name;
    // console.log(this.cords);
  }

  updateLocationCords($event) {
    this.cords = ($event.latitude * 1).toFixed(6) + "," + ($event.longitude * 1).toFixed(6);
    this.form.controls['cords'].setValue(this.cords);
  }

  addressLookup(address: string) {
    if (address.length > 15) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        if (results.length === 0) {
          this.cords = "0.0,0.0";
          this.address = "none"
        } else {
          const lat = results[results.length - 1].latitude;
          const long = results[results.length - 1].longitude;
          this.cords = lat + "," + long;
          this.address = address;
        }

      });
    } else {
      this.cords = "";
    }
  }

}
