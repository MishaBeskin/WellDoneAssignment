import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, Location } from '../../../entities.model';
import { take, map, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  categoryId: string;
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

  private _locations = new BehaviorSubject<Location[]>([
    new Location(
      "1",
      "Location Name 1",
      "409 Illinois St San Francisco, CA 94158",
      "lat:35.253,lng:32.256",
      "1",
      "assets/locationPhotos/locationPhoto.jpg"
    ),
    new Location(
      "2",
      "Location Name 2",
      "409 Illinois St San Francisco, CA 94158",
      "lat:35.253,lng:32.256",
      "2",
      "assets/locationPhotos/locationPhoto.jpg"
    ),
    new Location(
      "3",
      "Location Name 3",
      "409 Illinois St San Francisco, CA 94158",
      "lat:35.253,lng:32.256",
      "3",
      "assets/locationPhotos/locationPhoto.jpg"
    )
  ]);

  private category = new BehaviorSubject<Category>(new Category(
    "0",
    "Categories"
  ));

  currentCategory = this.category.asObservable();

  get categories() {
    return this._categories.asObservable();
  }

  get locations() {
    return this._locations.asObservable();
  }

  constructor(private http: HttpClient) { }

  changeCategory(category: Category) {
    this.category.next(category)
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

  delete(categoryId: string) {
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
  unSelect() {
    return this.categories.pipe(
      take(1),
      tap(categories => {
        this.category.next(new Category(
          "0",
          "Categories"
        ));
      })
    );
  }

}
