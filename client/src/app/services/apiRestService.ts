import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Bocata } from '../bocata';
import { User } from '../user';
import { Pedido } from '../pedido';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private user: User = new User();
  private pedido: Pedido = new Pedido(null, null, null,null);
  private moment: Moment;

  constructor(private _restangular: Restangular) { }

  isUser(): Boolean {
    console.log(('_id' in this.user)); return '_id' in this.user;
  }
  returnUser(): User {console.log('user', this.user); return this.user; }
  returnPedido(): Pedido { return this.pedido; }
  getBocatas() {
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
    const response = this._restangular.one('bocata', this.pedido._id).customPUT(JSON.stringify(item), null, null, { 'Content-Type': 'application/json' });
    return response.toPromise().then((bocata) => {
      return bocata;
    });
  }

  getUsers(): User[] {
    return this._restangular.one('user').get().toPromise().then((user) => {
      return user;
    });
  }

  getUser(id): User {
    return this._restangular.one('user', id).get().toPromise().then((user) => {
      return user.name;
    });
  }

  loginUser(user) {
    console.log('user', user)
    return this._restangular.one('user').customPOST(JSON.stringify(user), null, null, { 'Content-Type': 'application/json' })
      .toPromise().then((result) => {
        console.log(result);
        this.user =result;
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

  getPedido() {
    const resp = this._restangular.one('pedido').get();
    return resp.toPromise().then((result) => {
      this.pedido = result;
      return result;
    }).catch((err) => {

    });
  }
  postPedido(item) {
    const response = this._restangular.one('pedido').customPOST(JSON.stringify(item), null, null, { 'Content-Type': 'application/json' });
    return response.toPromise().then((pedido) => {
      return pedido;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }
  putPedido(item) {
    console.log(this.pedido)
    console.log(item)

    return this._restangular.one('pedido/' + this.pedido._id + '/bocatas')
      .customPUT(JSON.stringify(item), null, null, { 'Content-Type': 'application/json' })
      .toPromise().then((pedido) => {
        return pedido;
        /*if(err) return {status:false, value:err};
        else return {status:true, value:success};*/
      });
  }
  book(item){
    return this._restangular.one('pedido/' + this.pedido._id )
    .customPUT(JSON.stringify(item), null, null, { 'Content-Type': 'application/json' })
    .toPromise().then((pedido) => {
      return pedido;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }

  updateKeyValue(key, value) {
    const response = this._restangular.one('user', this.user._id).one(key, value)
    .customPUT(JSON.stringify({}), null, null, { 'Content-Type': 'application/json' });
    return response.toPromise().then((user) => {
      return user;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }

  updateStatusPedido(key, value) {
    const response = this._restangular.one('pedido', this.pedido._id).one(key, value)
    .customPUT(JSON.stringify({}), null, null, { 'Content-Type': 'application/json' });
    return response.toPromise().then((pedido) => {
      return pedido;
      /*if(err) return {status:false, value:err};
      else return {status:true, value:success};*/
    });
  }
}
