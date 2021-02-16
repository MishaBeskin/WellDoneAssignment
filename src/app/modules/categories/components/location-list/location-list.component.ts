import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { LocationCat } from '../../../../entities.model';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: LocationCat[];
  private locationsSub: Subscription;
  selectedLocation: LocationCat;
  @ViewChild('creatLocation') creatLocation;
  @Output() locationItemEvent = new EventEmitter<string>();
  constructor(private dataService: DataService, private modalService: NgbModal) { }
  public selectedItem: any = {};
  private isSelected = false;
  ngOnInit(): void {
    this.dataService.unSelect().subscribe();
    this.locationsSub = this.dataService.locations.subscribe(locations => {
      this.locations = locations;
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

  ngOnDestroy() {
    this.dataService.unSelect().subscribe();
    if (this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
  }

}
