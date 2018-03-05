import { Component, OnInit } from '@angular/core';
import { Weather2Service } from '../weather2.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  data: any;

  constructor(private weatherServer: Weather2Service) {}

  ngOnInit() {
    this.weatherServer.getWeekWeather().subscribe(data => this.data = data);
  }

  weatherIcon(icon) {
    return this.weatherServer.getWeatherIcon(icon);
  }
}
