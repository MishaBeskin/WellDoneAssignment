import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, LocationCat } from '../../../entities.model';
import { take, map, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  categoryId: string;
  locationId: string;
  cords: string;

  private _categories = new BehaviorSubject<Category[]>([
    new Category(
      "1",
      "Category Name 1"
    ),
    new Category(
      "2",
      "Category Name 2"
    ),
    new Category(
      "3",
      "Category Name 3"
    )
  ]);

  private _locations = new BehaviorSubject<LocationCat[]>([
    new LocationCat(
      "1",
      "Location Name 1",
      "409 Illinois St San Francisco, CA 94158",
      "37.768376,-122.389136",
      "1",
      "assets/locationPhotos/locationPhoto.jpg"
    ),
    new LocationCat(
      "2",
      "Location Name 2",
      "409 Illinois St San Francisco, CA 94158",
      "37.768376,-122.389136",
      "2",
      "assets/locationPhotos/locationPhoto.jpg"
    ),
    new LocationCat(
      "3",
      "Location Name 3",
      "409 Illinois St San Francisco, CA 94158",
      "37.768376,-122.389136",
      "3",
      "assets/locationPhotos/locationPhoto.jpg"
    )
  ]);

  private category = new BehaviorSubject<Category>(new Category(
    "0",
    "Categories"
  ));

  private location = new BehaviorSubject<LocationCat>(new LocationCat(
    "0",
    "Locations",
    "0",
    "0",
    "0",
    "0"
  ));

  currentCategory = this.category.asObservable();
  currentLocation = this.location.asObservable();

  get categories() {
    return this._categories.asObservable();
  }

  get locations() {
    return this._locations.asObservable();
  }

  constructor(private http: HttpClient) { }

  changeCategory(category: Category) {
    this.category.next(category);
  }

  changeLocation(location: LocationCat) {
    this.location.next(location);
  }

  getCategory(id: string) {
    return this.categories.pipe(
      take(1),
      map(categories => {
        const temp = categories.find(c => c.id === id);
        return temp ? { ...temp } : null;
      })
    );
  }


  getLocation(id: string) {
    return this.locations.pipe(
      take(1),
      map(locations => {
        const temp = locations.find(l => l.id === id);
        return temp ? { ...temp } : null;
      })
    );
  }

  public createCategory(
    name: string,
  ) {
    const newCategory = new Category(
      Math.floor(Math.random() * 100).toString(),
      name
    );
    return this.categories.pipe(
      take(1),
      delay(1000),
      tap(categories => {
        this._categories.next(categories.concat(newCategory));
      })
    );
  }

  public createLocation(
    name: string,
    address: string,
    cords: string,
    categoryId: string
  ) {
    const newLocation = new LocationCat(
      Math.floor(Math.random() * 100).toString(),
      name,
      address,
      cords,
      categoryId,
      "assets/locationPhotos/locationPhoto.jpg"
    );
    return this.locations.pipe(
      take(1),
      delay(1000),
      tap(locations => {
        this._locations.next(locations.concat(newLocation));
      })
    );
  }


  updateCategory(
    categoryId: string,
    name: string
  ) {
    return this.categories.pipe(
      take(1),
      delay(1000),
      tap(categories => {
        const updatedCategoryIdIndex = categories.findIndex(con => con.id === categoryId);
        const updatedCategories = [...categories];
        const oldContact = updatedCategories[updatedCategoryIdIndex];
        updatedCategories[updatedCategoryIdIndex] = new Category(
          oldContact.id,
          name
        );
        this._categories.next(updatedCategories);
        this.category.next(updatedCategories[updatedCategoryIdIndex]);
        this.categoryId = null;
      })
    );
  }



  updateLocation(
    locationId: string,
    name: string,
    address: string,
    cords: string,
    categoryId: string
  ) {
    return this.locations.pipe(
      take(1),
      delay(1000),
      tap(locations => {
        const updatedLocationIdIndex = locations.findIndex(loc => loc.id === locationId);
        const updatedLocations = [...locations];
        const oldLocation = updatedLocations[updatedLocationIdIndex];
        updatedLocations[updatedLocationIdIndex] = new LocationCat(
          oldLocation.id,
          name,
          address,
          cords,
          categoryId,
          oldLocation.locationUrl
        );
        this._locations.next(updatedLocations);
        this.location.next(updatedLocations[updatedLocationIdIndex]);
        this.locationId = null;
      })
    );
  }





  deleteCategory(categoryId: string) {
    return this.categories.pipe(
      take(1),
      delay(1000),
      tap(categories => {
        this._categories.next(categories.filter(c => c.id !== categoryId));
        this.category.next(new Category(
          "0",
          "Categories"
        ));
      })
    );
  }

  deleteLocation(locationId: string) {
    return this.locations.pipe(
      take(1),
      delay(1000),
      tap(locations => {
        this._locations.next(locations.filter(l => l.id !== locationId));
        this.location.next(new LocationCat(
          "0",
          "Locations",
          "0",
          "0",
          "0",
          "0"
        ));
      })
    );
  }

  unSelect() {
    return this.categories.pipe(
      take(1),
      tap(categories => {
        this.category.next(new Category(
          "0",
          "Categories"
        )), this.location.next(new LocationCat(
          "0",
          "Locations",
          "0",
          "0",
          "0",
          "0"
        ));
      })
    );
  }

}
