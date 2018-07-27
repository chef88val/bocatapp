import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Bocata } from '../bocata';
import { User } from '../user';
import { Pedido } from '../pedido';

@Injectable({
  providedIn: 'root'
})
export class apirestService {

  constructor(private _restangular: Restangular) { }

  getBocatas():Bocata[] {
   return this._restangular.getList();
  }


  postBocatas() {
    this._restangular;
  }

  getUsers():User[] {
    return this._restangular.getList();
  }

  getUser():User {
    return this._restangular.one().get();
  }

  getPedido():Pedido {
    return this._restangular.one().get();
  }
  postPedido() {
    this._restangular;
  }
  putPedido() {
    this._restangular;
  }
}
