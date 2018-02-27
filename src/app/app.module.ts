import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { NowComponent } from './weather/now/now.component';
import { WeekComponent } from './weather/week/week.component';
import { CityComponent } from './weather/city/city.component';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    NowComponent,
    WeekComponent,
    CityComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
