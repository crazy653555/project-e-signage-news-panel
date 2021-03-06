import { Component, OnInit, NgZone } from '@angular/core';
import { WeatherService } from './weather.service';
import { NowComponent } from './now/now.component';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  // HACK：地點清單
  places = [
    { latitude: '24.137224', longitude: '120.686751', name: '臺中市' }, // 預設地點 (不出現在城市清單中)
    { latitude: '25.047814', longitude: '121.517082', name: '臺北' }, // 其它地點：台北車站
    { latitude: '24.801607', longitude: '120.971512', name: '新竹' }, // 其它地點：新竹火車站
    { latitude: '24.137224', longitude: '120.686751', name: '臺中' }, // 其它地點：臺中車站
    { latitude: '23.479110', longitude: '120.441053', name: '嘉義' }, // 其它地點：嘉義車站
    { latitude: '22.997192', longitude: '120.212576', name: '臺南' }, // 其它地點：台南火車站
    { latitude: '22.639752', longitude: '120.302136', name: '高雄' }, // 其它地點：高雄車站
  ];
  // 取得資訊的放置處
  data;
  currently;
  hourly;
  daily;
  cities;
  pm25;
  pm25level;
  // 重取資料時間 (ms)
  re_every = 7200 * 1000;
  re_timer;
  // 模式順序、停留時間(ms)、過場特效開關
  mode = ['daily', 'cities', 'hourly'];
  show = 'hourly'; // 最先顯示的模式
  order = 0;
  every = 10 * 1000;
  timer;
  doFadeIn = true;
  doFadeOut = false;
  // 資料量限制
  hour_amount = 6;
  day_amount = 6;

  constructor(private ws: WeatherService, private ngZone: NgZone) { }

  ngOnInit() {
    this.bindData();
    this.switch();
  }

  bindData() {
    clearInterval(this.re_timer);
    this.bindHere();
    this.bindCities();
    // this.bindPM25();
    this.re_timer = setInterval(() => {
      this.bindData();
    }, this.re_every);
  }

  // 切換模式
  switch() {
    this.timer = setInterval(() => {
      // 退場效果
      this.doFadeOut = true;
      this.doFadeIn = false;
      const fadeDur = 700;
      // 進場
      setTimeout(() => {
        this.show = this.mode[this.order];
        this.doFadeOut = false;
        this.doFadeIn = true;
        this.order++;
        // 重頭開始
        if (this.order >= this.mode.length) {
          this.order = 0;
        }
      }, fadeDur);
    }, this.every);
  }

  // 結繫當地資訊
  bindHere() {
    this.ws.getMeteorology(this.places[0].latitude, this.places[0].longitude, false)
      .subscribe(j => {
        // console.log(j);
        this.data = j;
        this.currently = j['currently'];
        this.hourly = j['hourly']['data'].splice(1, this.hour_amount);
        this.daily = j['daily']['data'].splice(1, this.day_amount);
      },
        error => {
          console.log('Error: ', error);
        },
        // callback
        () => {
        }
      );
  }

  // 結繫城市們(不包含預設城市)
  bindCities() {
    this.cities = [];
    for (let idx = 1; idx < this.places.length; idx++) {
      this.ws.getMeteorology(this.places[idx].latitude, this.places[idx].longitude, true)
        .subscribe(j => {
          j['currently']['city'] = this.places[idx].name;
          j['currently']['cityOrder'] = idx;
          this.cities.push(j['currently']);
        },
          error => {
            console.log('Error: ', error);
          },
          // callback
          () => {
            // 因為非同步的關係，連線速率若不順，城市不會一定依序push進去，故請於事後進行排序加工
            this.cities = this.cities.sort(function (a, b) {
              return a.cityOrder > b.cityOrder;
            });
          }
        ); // subscribe END
    }
  }

  // 結繫PM25
  bindPM25() {
    this.ws.getPM25()
      .subscribe(j => {
        // 取出符合城市的第一筆
        this.pm25 = j['feeds'].find(el => (el.County === this.places[0].name));
      },
        error => {
          console.log('Error: ', error);
        },
        // callback
        () => {
          this.pm25level = this.ws.getPM25ToLevel(this.pm25['PM2_5']);
        }
      );
  }

}
