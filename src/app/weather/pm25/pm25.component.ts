import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pm25',
  templateUrl: './pm25.component.html',
  styleUrls: ['./pm25.component.css']
})
export class Pm25Component implements OnInit {

  // 取得資訊的放置處
  @Input() data;
  @Input() level;

  constructor() { }

  ngOnInit() { }

}
