import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ClockComponent } from './clock/clock.component';

import { WeatherComponent } from './weather/weather.component';
import { NowComponent } from './weather/now/now.component';
import { HourlyComponent } from './weather/hourly/hourly.component';
import { DailyComponent } from './weather/daily/daily.component';
import { CityComponent } from './weather/city/city.component';
import { WeatherService } from './weather/weather.service';
import { CelsiusContentPipe } from './weather/celsius-content.pipe';
import { TimeContentPipe } from './weather/time-content.pipe';
import { RainContentPipe } from './weather/rain-content.pipe';
import { IconUrlPipe } from './weather/icon-url.pipe';

import { NewsComponent } from './news/news.component';
import { NewsContentPipe } from './news/news-content.pipe';
import { NewsService } from './news/news.service';
import { Pm25Component } from './weather/pm25/pm25.component';


@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    WeatherComponent,
    NowComponent,
    HourlyComponent,
    DailyComponent,
    CityComponent,
    RainContentPipe,
    CelsiusContentPipe,
    TimeContentPipe,
    NewsComponent,
    NewsContentPipe,
    Pm25Component,
    IconUrlPipe,
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WeatherService,
    NewsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
