import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  private corsProxy = 'https://cors-anywhere.herokuapp.com/';
  private apiURL = 'https://api.darksky.net/forecast';
  private key = '/8b18f413cfc514de83de667d7ee86aeb';
  private lang = '&lang=zh-tw';

  constructor(private http: HttpClient, private nz: NgZone) { }

  // 採用DarkSkyAPI (https://darksky.net/dev/docs)
  // HACK: 單日有1000次查取限制
  getMeteorology(lat: string, lon: string, onlyNow: Boolean) {
    const exclude = onlyNow ? '&exclude=hourly,daily,minutely,alerts,flags' : '&exclude=minutely,alerts,flags';
    return this.http.get<any[]>(this.corsProxy + this.apiURL + this.key + '/' + lat + ',' + lon + '?' + this.lang + exclude);
  }


  // 產生氣象動圖，方案為 Skycons (https://darkskyapp.github.io/skycons/)
  // HACK: 由於 Skycons 係由 index.html 內之 skycons.js 啟動，故 compile 時會出現 error TS2552: Cannot find name 'Skycons'.
  setSkycons(element_id: string, icon_name: string, icon_color: string) {
    this.nz.runOutsideAngular(() => {
      const skycons = new Skycons({ 'color': icon_color });
      skycons.set(element_id, icon_name);
      skycons.play();
    });
  }

}
