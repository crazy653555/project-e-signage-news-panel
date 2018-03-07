import { Component, OnInit, NgZone } from '@angular/core';
import { WeatherService } from './weather.service';
import { NowComponent } from './now/now.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  // HACK：地點清單
  places = [
    { latitude: '24.8545491', longitude: '120.9519908', name: '桃園市' }, // 預設地點 (不出現在城市清單中)
    { latitude: '25.0169639', longitude: '121.2261837', name: '台北市' }, // 其它地點 1
    { latitude: '24.2198468', longitude: '120.6756798', name: '台中市' }, // 其它地點 2
    { latitude: '21.9790996', longitude: '116.6134305', name: '高雄市' }, // 其它地點 3
    { latitude: '25.0330813', longitude: '121.2880941', name: '宜蘭縣' }, // 其它地點 3
  ];
  // 取得資訊的放置處
  data;
  currently;
  hourly;
  daily;
  cities;
  // 重取資料時間 (ms)
  re_every = 7200 * 1000;
  re_timer;
  // 模式順序、停留時間(ms)、過場特效開關
  mode = ['hourly', 'daily', 'cities'];
  show = 'hourly';
  order = 0;
  every = 6 * 1000;
  timer;
  doFadeIn = true;
  doFadeOut = false;
  // 資料量限制
  hour_amount = 4;
  day_amount = 4;

  constructor(private ws: WeatherService, private ngZone: NgZone) { }

  ngOnInit() {
    this.bindData();
    this.switch();
  }

  bindData() {
    clearInterval(this.re_timer);
    this.bindHere();
    this.bindCities();
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
        console.log(j);
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

  // 結繫城市們
  bindCities() {
    this.cities = [];
    const list = this.places.splice(1);
    list.forEach(pl => {
      // TODO: 因為非同步的關係，連線速率若不順，城市不會一定依序push進去
      this.ws.getMeteorology(pl.latitude, pl.longitude, true)
        .subscribe(j => {
          j['currently']['city'] = pl.name;
          this.cities.push(j['currently']);
        },
          error => {
            console.log('Error: ', error);
          },
          // callback
          () => {
          }
        );
    });
    console.log(this.cities);
  }

}
