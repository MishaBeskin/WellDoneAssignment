import { NominatimResponse } from '../models/nominatim-response.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer } from 'leaflet';
import { MapPoint } from '../models/map-point.model'
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../components/consts';
import * as esri from 'esri-leaflet-geocoder';
import LCG from 'leaflet-control-geocoder';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NominatimService } from '../../services/nominatim-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() locationSelect: string;
  @Output() cordsLocation = new EventEmitter<MapPoint>();
  @Output() cordsLoc = new EventEmitter<MapPoint>();
  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;
  geocodeService = esri.geocodeService();
  results: NominatimResponse[];
  constructor(private nominatimService: NominatimService) {
  }

  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }



  initializeMap(map: Map) {
    this.map = map;
    this.createMarker();
  }

  private initializeMapOptions() {
    const latLong = this.getCords(this.locationSelect);
    let lat = 0;
    let lng = 0
    if (latLong !== undefined) {
      lat = latLong[0];
      lng = latLong[1];
    }
    console.log(lat + "," + lng);
    this.options = {
      zoom: 17,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, attribution: 'OSM' })
      ],
      center: latLng([lat === 0 ? DEFAULT_LATITUDE : lat, lng === 0 ? DEFAULT_LONGITUDE : lng])
    }
  }

  private initializeDefaultMapPoint() {
    const latLong = this.getCords(this.locationSelect);
    let lat = 0;
    let lng = 0
    if (latLong !== undefined) {
      lat = latLong[0];
      lng = latLong[1];
    }
    this.mapPoint = {
      name: 'Hello',
      latitude: lat === 0 ? DEFAULT_LATITUDE : lat,
      longitude: lng === 0 ? DEFAULT_LONGITUDE : lng
    };
  }

  private getCords(locationSelect) {
    let latLong = [];
    if (locationSelect) {
      latLong = locationSelect.cords.split(',').map(function (item) {
        return parseFloat(item);
      });
      return latLong;
    }
  }



  onMapClick(e: LeafletMouseEvent) {
    this.nominatimService.addressGeocodeReverse(e.latlng).subscribe(results => {
      console.log(results);
      let newAddress = " " + results.city + "," + results.principalSubdivisionCode + "," + results.postcode + "," + results.countryName;
      this.cordsLocation.emit({ name: newAddress, latitude: e.latlng.lat, longitude: e.latlng.lng });

    });
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.cordsLoc.emit({ name: name, latitude: latitude, longitude: longitude });
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '/assets/map/maker-icon.png'
    });
  }

  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

}
