import { Component, OnInit } from '@angular/core';
import { Weather2Service } from '../weather2.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  data: any;
  private lat = 24.9951273;
  private lng = 121.3176767;

  constructor(private weatherServer: Weather2Service) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log('location lat:' + this.lat + ' lng:' + this.lng);
      });
    }
    this.weatherServer.getWeekWeatherLocation(this.lat, this.lng).subscribe(data => this.data = data);

  }

  weatherIcon(icon) {
    return this.weatherServer.getWeatherIcon(icon);
  }
}
