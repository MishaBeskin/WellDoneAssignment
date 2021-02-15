import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLocationsComponent } from './category-locations.component';

describe('CategoryLocationsComponent', () => {
  let component: CategoryLocationsComponent;
  let fixture: ComponentFixture<CategoryLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
