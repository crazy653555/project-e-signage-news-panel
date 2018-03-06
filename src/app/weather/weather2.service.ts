import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Weather2Service {

  private proxyServer = 'https://cors-anywhere.herokuapp.com/';
  private watherApi = 'https://api.darksky.net/forecast/3db4931a0daa5e6cdec84f539858dc0e/';

  private headers = new HttpHeaders().set('X-Requested-With', 'XMLHttprequest');

  // 預設座標
  private lat = 24.9951273;
  private lng = 121.3176767;

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.setLocation();
  }



  // 設定所在地座標
  private setLocation() {
    // 判斷是否可以取得座標
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log('location lat:' + this.lat + ' lng:' + this.lng);
      });
    }
  }

  // 取得一週天氣
  getWeekWeather(): Observable<any> {
    const api = this.proxyServer + this.watherApi + this.lat + ',' + this.lng;
    return this.http.get(api, { headers: this.headers });
  }

  // 圖片對應
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
