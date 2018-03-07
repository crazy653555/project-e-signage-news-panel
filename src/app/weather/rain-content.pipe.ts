import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rainContent'
})
export class RainContentPipe implements PipeTransform {

  // 小數轉百分比
  transform(value: any, args?: any): any {
    return Math.round(value * 100);
  }

}
