export class Category {
  constructor(
    public id: string,
    public name: string
  ) { }
}


export class LocationCat {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public cords: string,
    public category: string,
    public locationUrl: string
  ) { }
}
