import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsiusContent'
})
export class CelsiusContentPipe implements PipeTransform {

  // 華氏轉攝氏
  transform(value: any, suffix?: boolean): any {
    return Math.round((value - 32) * 5 / 9) + (suffix ? '°' : '');
  }

}
