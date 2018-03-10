import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  // 取得資訊的放置處
  @Input() data;
  @Input() index;
  @Input() amount;

  constructor() { }

  ngOnInit() { }


}
