import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  // CORS
  private corsProxy = 'https://cors-anywhere.herokuapp.com/';

  // DarkSkyAPI
  // HACK: 單日有1000次查取限制
  private DarkSkyAPI = 'https://api.darksky.net/forecast';
  private key = '/ad50d1432876d180d315b159c4cab22d';
  private exclude = '&exclude=minutely,hourly,alerts,flags';

  // Google Maps Geocoding API
  private urlGoogleMaps = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';


  constructor(private http: HttpClient) { }

  getMeteorology(lat: string, lon: string) {
    return this.http.get<any[]>(this.corsProxy + this.DarkSkyAPI + this.key + '/' + lat + ',' + lon + '?' + this.exclude);
  }

  getPlace(lat: string, lon: string) {
    return this.http.get<any[]>(this.urlGoogleMaps + lat + ',' + lon);
  }

}
