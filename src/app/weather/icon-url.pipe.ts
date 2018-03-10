import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconUrl'
})
export class IconUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return '/assets/weather_icons/Alexey_Onufriev/' + value + '.svg';
  }

}
