import { Component, OnInit, NgZone, AfterViewChecked } from '@angular/core';
import { Weather2Service } from '../weather2.service';
import { Daily } from '../daily';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit, AfterViewChecked {

  data: any;
  iconColor = 'black';
  daily:Daily[];

  constructor(private weather: Weather2Service, private ngZone: NgZone) { }


  ngOnInit() {
    this.weather.getWeekWeather().subscribe(data => this.data = data)
  }

  ngAfterViewChecked(): void {

    this.setSkycons('icon1', 'rain');
    this.setSkycons('icon2', 'partly-cloudy-day');
    this.setSkycons('icon3', 'rain');
    this.setSkycons('icon4', 'clear-day');
    this.setSkycons('icon5', 'clear-day');
    this.setSkycons('icon6', 'clear-day');
    this.setSkycons('icon7', 'clear-day');
    this.setSkycons('icon8', 'rain');
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
}
