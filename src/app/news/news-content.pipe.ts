import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsContent'
})
export class NewsContentPipe implements PipeTransform {

  transform(value: string, args?: any): any {

    // 圖片RWD化
    value = value.replace('<img ', '<img width="100%" height="auto" ');
    // 去除圖後補述
    if (value.indexOf('</p>') > 0) {
      value = value.substring(0, value.indexOf('</p>'));
    }
    // 去除多餘斷行
    value = value.replace(/\<br\>/g, '');
    return value;
  }

}
