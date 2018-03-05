import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { NowComponent } from './weather/now/now.component';
import { WeekComponent } from './weather/week/week.component';
import { CityComponent } from './weather/city/city.component';
import { NewsComponent } from './news/news.component';
import { NewsService } from './news/news.service';
import { NewsContentPipe } from './news/news-content.pipe';
import { WeatherService } from './weather/weather.service';
import { Weather2Service } from './weather/weather2.service';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    NowComponent,
    WeekComponent,
    CityComponent,
    NewsComponent,
    NewsContentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    NewsService,
    WeatherService,
    Weather2Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
