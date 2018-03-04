import { Component, OnInit, NgZone } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.css']
})
export class NowComponent implements OnInit {

  // 設定當下地點
  latitude = '24.9951273';
  longitude = '121.3176767';
  // 取得資訊的放置處
  data;
  // 定時查取資訊的時間(ms)
  every = 120 * 1000;
  timer;
  iconColor = 'white';

  constructor(private weather: WeatherService, private ngZone: NgZone) { }

  ngOnInit() {
    this.getData();
    this.setSkycons('targetID', 'iconName');
  }

  // 取得資訊 (依方式選擇來源)
  getData() {
    this.weather.getMeteorology(this.latitude, this.longitude)
      .subscribe(d => {
        console.log(d);
      },
        error => {
          console.log('Error: ', error);
        },
        () => {
          this.setSkycons('icon1', 'rain');
        }
      );
  }

  // 產生氣象動圖，方案為 Skycons (https://darkskyapp.github.io/skycons/)
  // HACK: 由於 Skycons 係由 index.html 內之 skycons.js 啟動，故 compile 時會出現 error TS2552: Cannot find name 'Skycons'.
  setSkycons(element_id, icon_name) {
    this.ngZone.runOutsideAngular(() => {
      const skycons = new Skycons({ 'color': this.iconColor });
      skycons.set(element_id, icon_name);
      skycons.play();
    });
  }

}
