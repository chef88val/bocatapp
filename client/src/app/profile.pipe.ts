import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value=='SF') return 'ECS';
    //else if (value=='g') return 'Grande';
  }

}
