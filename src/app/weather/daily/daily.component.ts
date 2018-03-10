import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  // 取得資訊的放置處
  @Input() data;
  @Input() index;
  @Input() amount;

  constructor() { }

  ngOnInit() {

  }

}
