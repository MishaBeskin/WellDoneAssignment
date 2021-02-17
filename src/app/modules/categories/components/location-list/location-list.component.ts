import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Category, LocationCat } from '../../../../entities.model';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: LocationCat[];
  mangedGroupLocations;
  mangedLocations: LocationCat[];
  categories: Category[];
  private locationsSub: Subscription;
  private categoriesSub: Subscription;
  selectedLocation: LocationCat;
  @ViewChild('creatLocation') creatLocation;
  @Output() locationItemEvent = new EventEmitter<string>();
  constructor(private dataService: DataService, private modalService: NgbModal) { }
  public selectedItem: any = {};
  private isSelected = false;
  public sort = "";
  public filter = "";
  public group = "";
  ngOnInit(): void {
    this.dataService.unSelect().subscribe();
    this.locationsSub = this.dataService.locations.subscribe(locations => {
      this.locations = locations;
      this.mangedLocations = locations;
    });
    this.categoriesSub = this.dataService.categories.subscribe(categories => {
      this.categories = categories;
    });
  }


  selectLocation(location) {
    if (location.id === this.selectedItem.id && this.isSelected === true) {
      this.isSelected = false;
      this.selectedItem = {};
      this.dataService.unSelect().subscribe();
    }
    else {
      this.isSelected = true;
      this.selectedLocation = location;
      this.selectedItem = location
      this.dataService.changeLocation(location);
    }

  }
  sortLocation() {
    if (this.sort === "") {
      this.mangedLocations = this.locations;
    }
    else {
      this.mangedLocations = this.locations.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  filterLocation() {
    if (this.filter === "") {
      this.mangedLocations = this.locations;
    }
    else {
      this.mangedLocations = this.locations.filter(l => l.category === this.filter);
    }
  }

  GroupLocation() {
    if (this.group === "") {
      this.mangedLocations = this.locations;
    } else {

      this.mangedGroupLocations = this.locations.reduce((r, { category }) => {
        if (!r.some(o => o.category == category)) {
          r.push({ category, groupItem: this.locations.filter(v => v.category == category) });
        }
        return r;
      }, []);
    }
  }

  ngOnDestroy() {
    this.dataService.unSelect().subscribe();
    if (this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
  }

}
