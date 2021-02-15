import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-locations',
  templateUrl: './category-locations.component.html',
  styleUrls: ['./category-locations.component.css']
})
export class CategoryLocationsComponent implements OnInit {
  @Input() locations;
  @Input() category;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
