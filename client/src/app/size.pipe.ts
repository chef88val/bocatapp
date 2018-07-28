import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value=='p') return 'Pequeño';
    else if (value=='g') return 'Grande';
  }

}
