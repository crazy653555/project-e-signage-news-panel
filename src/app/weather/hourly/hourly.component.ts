import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {

  // 取得資訊的放置處
  @Input() data;
  @Input() index;
  @Input() amount;

  constructor() { }

  ngOnInit() {

  }

}
