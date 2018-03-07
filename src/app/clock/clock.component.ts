import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.startClock();
  }

  // 啟動時鐘模式
  startClock() {
    const clock = $('.your-clock').FlipClock({
      clockFace: 'TwentyFourHourClock',
      showSeconds: false,
    });
  }

}
