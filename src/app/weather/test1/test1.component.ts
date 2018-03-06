import { Component, OnInit, Input, NgZone,AfterViewInit } from "@angular/core";

@Component({
  selector: "app-test1",
  templateUrl: "./test1.component.html",
  styleUrls: ["./test1.component.css"]
})
export class Test1Component implements OnInit,AfterViewInit {
  @Input() weather: any;

  iconColor = "black";
  id:string;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    console.log("weather=>" + this.weather.time);
    this.id = "id" +this.weather.time;
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    this.setSkycons(this.id.toString(), this.weather.icon);

  }

  // 產生氣象動圖，方案為 Skycons (https://darkskyapp.github.io/skycons/)
  // HACK: 由於 Skycons 係由 index.html 內之 skycons.js 啟動，故 compile 時會出現 error TS2552: Cannot find name 'Skycons'.
  setSkycons(element_id, icon_name) {
    this.ngZone.runOutsideAngular(() => {
      const skycons = new Skycons({ color: this.iconColor });
      skycons.set(element_id, icon_name);
      skycons.play();
    });
  }
}
