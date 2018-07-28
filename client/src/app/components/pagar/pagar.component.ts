import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../pedido';
import { ApiRestService } from '../../services/apiRestService';
import { ItemPagar } from '../../item-pagar';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  
  private pedido: Pedido = null;
  private dataPedido: any =[]; 
  private totalPedido: Number = 0; 
  public item:ItemPagar;
  constructor(private _api:ApiRestService) { }
  
  ngOnInit() {
    this.pedido = this._api.returnPedido();
    this.formatPedido();
  }
          formatPedido(): any {
            this.pedido.users.forEach(element => {
              console.log(element)
              let precio:Number = 0;
              if(element.size=== 'p') { precio =1.6*1; } else if(element.size === 'g') { precio = 1.8 * 1; }
              this.item = new ItemPagar(element.item._id, 1, element.item.name, element.size, element.user.name, precio, false );
              this.dataPedido.push(this.item);
              this.totalPedido = (this.totalPedido).valueOf() +(precio).valueOf()
            });
          }

          pagar(item){
            item.pagado =true;
            console.log(item)
            this.totalPedido = ((this.totalPedido).valueOf() -(item.dinero).valueOf());
          }

}
