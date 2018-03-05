import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { Weather2Service } from '../weather2.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit, AfterViewInit {


  data: any;
  iconColor = 'black';

  constructor(private weather: Weather2Service, private ngZone: NgZone) { }


  ngOnInit() {
    this.weather.getWeekWeather().subscribe(data => this.data = data);
  }

  ngAfterViewInit(): void {
    this.setSkycons('icon1', 'rain');
    this.setSkycons('icon2', 'partly-cloudy-day');
    this.setSkycons('icon3', 'rain');
    this.setSkycons('icon4', 'clear-day');
    console.log('ngAfterViewInit()');
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

  weatherIcon(icon) {
    return this.weather.getWeatherIcon(icon);
  }

  weatherIcon2(index, icon) {
    this.setSkycons('icon' + index, icon);
  }

  doClick() {
    this.setSkycons('icon1', 'rain');
    this.setSkycons('icon2', 'partly-cloudy-day');
    this.setSkycons('icon3', 'rain');
    this.setSkycons('icon4', 'clear-day');
  }

}
