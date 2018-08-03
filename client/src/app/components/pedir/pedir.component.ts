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
  private dataPedido: any = [];
  public item: itemPedido;
  public isBooked: Boolean = false;
  constructor(private _api: ApiRestService) { }

  ngOnInit() {

    this.pedido = this._api.returnPedido();
    this.formatPedido()
    console.log('pedir', this.pedido)

  }
  search(key1, value1, key2, value2) {
    let res = { find: false, index: 0 };
    for (let i = 0; i < this.dataPedido.length; i++) {
      if (this.dataPedido[i][key1] === value1 && this.dataPedido[i][key2] === value2) {
        res = { find: true, index: i };
      }
    }
    return res;
  }
  multiSearch(obj) {
    this.dataPedido = this.dataPedido.filter(function (item) {
      for (const key in obj) {
        if (item[key] === undefined || item[key] !== obj[key]) {
          return false;
        }
      }
      return true;
    });
  }
  formatPedido() {
    // console.log(this.pedido.users.length);
    this.pedido.users.forEach(element => {
      // element.item.extras = element.item.extras.sort();
      element.extras.sort().forEach(extra => {
        element.item.name += ' ' + extra;
        // console.log('element.item', element.item.name);
      });
      this.item = new itemPedido(element.item._id, 1, element.item.name, element.size);
      // console.log(this.item, 'this.pedido', element);
      if (this.dataPedido.length < 1) {
        this.dataPedido.push(this.item);
      } else {
        // console.log('name', this.item.item, 'size', element.size, '1', this.dataPedido);
        const el = this.search('item', this.item.item, 'size', element.size);
        // console.log('el', el);
        if (el.find) {
          // console.log('2');
          this.dataPedido[el.index].n += 1;
        } else {
          // console.log('3');
          this.dataPedido.push(this.item);
        }
      }
    });
  }

  nextStep() {
    if (!this.isBooked) {
      this.isBooked = true;
    } else if (this.isBooked) {
      this.pedido.status = 'pedido';
      this._api.updateStatusPedido('status', 'pedido').then(data => { if ('_id' in data) { console.log('1', data); } });
    }
  }
}
