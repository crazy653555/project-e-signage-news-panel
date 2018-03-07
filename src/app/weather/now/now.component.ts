import {
  Component, OnInit, Input, AfterViewInit
} from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.css']
})
export class NowComponent implements OnInit, AfterViewInit {

  // 取得資訊的放置處
  @Input() data;

  // 天氣圖樣式設定
  icon_id = 'icon_now';
  icon_width = '150';
  icon_height = '150';
  icon_color = 'white';
  icon_name = 'Partly Cloudy';

  constructor(private ws: WeatherService) { }

  ngOnInit() {
    this.icon_name = this.data.icon;
  }

  ngAfterViewInit() {
    this.ws.setSkycons(this.icon_id, this.icon_name, this.icon_color);
  }


}
