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

  constructor(private ws: WeatherService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // this.ws.setSkycons(this.icon_id, this.icon_name, this.icon_color);
  }


}
