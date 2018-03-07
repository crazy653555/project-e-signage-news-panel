import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit, AfterViewInit {

  // 取得資訊的放置處
  @Input() data;
  @Input() index;

  // 天氣圖樣式設定
  icon_id = 'icon_hourly_';
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
