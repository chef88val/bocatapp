import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../services/apiRestService';
import { Pedido } from '../../pedido';
import { itemPedido } from '../../item-pedido';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.css']
})

export class PedirComponent implements OnInit {

  private pedido: Pedido = null;
  private dataPedido: any =[];
  public item:itemPedido;
  constructor(private _api:ApiRestService) { }

  ngOnInit() {
     
    this.pedido = this._api.returnPedido();
    this.formatPedido()
      console.log('pedir', this.pedido)
     
  }
  search(key1, value1,key2, value2) {
    for (let i = 0; i < this.dataPedido.length; i++) {
      console.log(this.dataPedido[i][key1],value1)
        if (this.dataPedido[i][key1] === value1 && this.dataPedido[i][key2] === value2) {
            return {find: true, index: i };
        }
    }
}
  formatPedido() {
    console.log(this.pedido.users.length)
    this.pedido.users.forEach(element => {
      this.item = new itemPedido(element.item._id, 1, element.item.name, element.size);
      console.log(this.item,'this.pedido', element)
      if (this.dataPedido.length < 1 ) {
        console.log('1')
        this.dataPedido.push(this.item);
      } else {
        let el = this.search('id', element.item._id, 'size', element.size);
        if (el.find) {
          console.log('2')
          this.dataPedido[el.index].n+=1;
        } else {
          console.log('3')
          this.dataPedido.push(this.item);
        }
      } 
    })
  }

}
