import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Bocata } from '../bocata';
import { User } from '../user';
import { Pedido } from '../pedido';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private user: User = new User();

  constructor(private _restangular: Restangular) { }

  isUser(): Boolean {
    console.log(('_id' in this.user)); return '_id' in this.user;
  }
  returnUser(): User { return this.user; }
  getBocatas()  {
    const response = this._restangular.one('bocata').get();
    return response.toPromise().then((bocata) => {
      return bocata;
    });
  }

  getAdmin() {
    const response = this._restangular.one('admin').one('data').get();
    return response.toPromise().then((admin) => {
      console.log(admin);
      return admin;
    });
  }

  getBocata(item): Bocata {
    return this._restangular.one('bocata', item._id).get().toPromise().then((bocata) => {
      return bocata;
    });
  }


  postBocatas(item) {
    const response = this._restangular.one('bocata').customPOST(JSON.stringify(item), null, null, { 'Content-Type': 'application/json' });
    return response.toPromise().then((bocata) => {
      return bocata;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }

  putBocatas(item) {
    const response = this._restangular.one('bocata', item._id).customPUT(JSON.stringify(item), null, null, { 'Content-Type': undefined });
    return response.toPromise().then((bocata) => {
      return bocata;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }

  getUsers(): User[] {
    return this._restangular.one('user').get().toPromise().then((user) => {
      return user;
    });
  }

  getUser(id): User {
    return this._restangular.one('user', id).get().toPromise().then((user) => {
      return user;
    });
  }

  loginUser(user) {
    console.log('user',user)
    return  this._restangular.one('user').customPOST(JSON.stringify(user), null, null, { 'Content-Type': 'application/json' })
    .toPromise().then((result) => {
      console.log(result);
      return result;
    }).catch((err) => {
      console.log(err)
      return err;
    });
     /*return response.toPromise().then((user) => {
       console.log('user',user)
       this.user= user;
      return user;
    });*/
  }

  getPedido(): Pedido {
    return this._restangular.one().get();
  }
  postPedido(item) {
    const response = this._restangular.one('pedido').customPOST(JSON.stringify(item), null, null, { 'Content-Type': undefined });
    return response.toPromise().then((pedido) => {
      return pedido;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }
  putPedido(item) {
    const response = this._restangular.one('pedido', item._id).customPUT(JSON.stringify(item), null, null, { 'Content-Type': undefined });
    return response.toPromise().then((pedido) => {
      return pedido;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }
}
