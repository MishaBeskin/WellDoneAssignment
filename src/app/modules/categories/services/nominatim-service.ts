import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NominatimResponse } from '../components/models/nominatim-response.model';
import { BASE_NOMINATIM_URL, DEFAULT_VIEW_BOX } from '../components/consts';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http: HttpClient) {
  }

  addressLookup(req?: any): Observable<NominatimResponse[]> {
    const url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}&accept-language=he%2Cen&bounded=1`;
    return this.http
      .get(url).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
        ))
        )
      )
  }

  addressGeocodeReverse(req?: any): Observable<any> {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${req.lat}&longitude=${req.lng}&localityLanguage=en`;
    return this.http
      .get(url);
  }



}
