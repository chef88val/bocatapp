import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPedido'
})
export class EstadoPedidoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
