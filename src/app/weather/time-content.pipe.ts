import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeContent'
})
export class TimeContentPipe implements PipeTransform {

  // 各類型日期標示
  transform(value: any, args?: any): any {
    const da = new Date(value * 1000);
    if (args === '24') {
      let h: any = da.getHours();
      let m: any = da.getMinutes();
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return h + ':' + m;
    }
    if (args === 'hour') {
      return da.getHours();
    }
    if (args === 'day') {
      const wd = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return wd[da.getDay()];
    }
    return '';
  }



}
