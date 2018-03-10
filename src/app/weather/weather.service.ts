import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  private corsProxy = 'https://cors-anywhere.herokuapp.com/';
  private apiURL = 'https://api.darksky.net/forecast';
  private keys = [
    // '/8b18f413cfc514de83de667d7ee86aeb',
    '/57c0e0a1498aec9de720647485445309',
    '/4e5b4dc16b0aacc870c768f5e82eb8eb',
    '/d82b64cca6078d56d946485dd36726e1',
    '/8ea838434511179070792b14d212b3c4',
    '/694e98f67169837bcbfa5362a8540f48',
    '/88a5d837b6a4b9cdb2b0c968d739820a'];
  private lang = '&lang=zh-tw';

  constructor(private http: HttpClient, private nz: NgZone) { }

  // 採用DarkSkyAPI (https://darksky.net/dev/docs)
  // HACK: 單日有1000次查取限制，目前採多金鑰規避法
  getMeteorology(lat: string, lon: string, onlyNow: Boolean) {
    const pickOne = Math.floor(Math.random() * (this.keys.length - 1));
    const exclude = onlyNow ? '&exclude=hourly,daily,minutely,alerts,flags' : '&exclude=minutely,alerts,flags';
    return this.http.get<any[]>(this.corsProxy + this.apiURL + this.keys[pickOne] + '/' + lat + ',' + lon + '?' + this.lang + exclude);
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

  // 採用PM2.5 開放資料入口網站：台灣環保署測站 (https://pm25.lass-net.org/zh_tw/)
  getPM25() {
    return this.http.get<any[]>('https://pm25.lass-net.org/data/last-all-epa.json');
  }

  // 依PM2.5值來判斷等級，參考細懸浮微粒(PM2.5)指標對照表與活動建議 (http://www.tnepb.gov.tw/AIR_PM25.htm)
  getPM25ToLevel(value) {
    const levels = [
      { lv: 1, color: 'green', PmFrom: 0, PmTo: 11 },
      { lv: 2, color: 'green', PmFrom: 12, PmTo: 23 },
      { lv: 3, color: 'green', PmFrom: 24, PmTo: 35 },
      { lv: 4, color: 'yellow', PmFrom: 36, PmTo: 41 },
      { lv: 5, color: 'yellow', PmFrom: 42, PmTo: 47 },
      { lv: 6, color: 'yellow', PmFrom: 48, PmTo: 53 },
      { lv: 7, color: 'red', PmFrom: 54, PmTo: 58 },
      { lv: 8, color: 'red', PmFrom: 59, PmTo: 64 },
      { lv: 9, color: 'red', PmFrom: 65, PmTo: 70 },
      { lv: 10, color: 'purple', PmFrom: 71, PmTo: 999 },
    ];
    return levels.find(el => value >= el.PmFrom && value <= el.PmTo);
  }

}
