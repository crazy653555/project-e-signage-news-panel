import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Weather2Service {

  private proxyServer = 'https://cors-anywhere.herokuapp.com/';
  private watherApi = 'https://api.darksky.net/forecast/3db4931a0daa5e6cdec84f539858dc0e/';

  private headers = new HttpHeaders().set('X-Requested-With', 'XMLHttprequest');

  constructor(private http: HttpClient) { }

  getWeekWather(): Observable<any> {
    const lat = '37.8267';
    const lng = '-122.4233';
    const api = this.proxyServer + this.watherApi + lat + ',' + lng;
    return this.http.get(api, { headers: this.headers });
  }

  getWeekWeatherLocation(lat: number, lng: number): Observable<any> {
    const api = this.proxyServer + this.watherApi + lat + ',' + lng;
    return this.http.get(api, { headers: this.headers });
  }

  getDayWather(): Observable<any> {
    const api = this.proxyServer + this.watherApi;
    return this.http.get(api, { headers: this.headers });
  }

  getWeatherIcon(icon) {
    switch (icon) {
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
      case 'clear-day':
        return 'wi wi-day-sunny';
      case 'partly-cloudy-night':
        return 'wi wi-night-partly-cloudy';
      default:
        return `wi wi-day-sunny`;
    }
  }

}
