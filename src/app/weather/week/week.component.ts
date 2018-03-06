import { Component, OnInit } from "@angular/core";
import { Weather2Service } from "../weather2.service";
import { Daily } from "../daily";

@Component({
  selector: "app-week",
  templateUrl: "./week.component.html",
  styleUrls: ["./week.component.css"]
})
export class WeekComponent implements OnInit {
  weatherData: any;

  constructor(private weather: Weather2Service) {}

  ngOnInit() {
    this.weather.getWeekWeather().subscribe(data => (this.weatherData = data));
  }
}
