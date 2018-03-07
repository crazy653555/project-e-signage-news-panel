import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, AfterViewInit {

  // 取得資訊的放置處
  @Input() data;
  @Input() index;

  // 天氣圖樣式設定
  icon_id = 'icon_city_';
  icon_width = '50';
  icon_height = '50';
  icon_color = 'white';
  icon_name = 'Partly Cloudy';

  constructor(private ws: WeatherService) { }

  ngOnInit() {
    this.icon_id += this.index;
    this.icon_name = this.data.icon;
  }

  ngAfterViewInit() {
    this.ws.setSkycons(this.icon_id, this.icon_name, this.icon_color);
  }


}
