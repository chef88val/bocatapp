import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ApiRestService } from '../../services/apiRestService';
import { Pedido } from '../../pedido';
import { LoginComponent } from '../extras/login/login.component';
import { environment } from '../../../environments/environment';
import { CountdownComponent } from 'ngx-countdown';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: User = new User(null, null, 'jsm.multimedia@gmail.com', 'User', 'SF');
  private pedido: Pedido = new Pedido(null, null, null, 'draft');
  public isUser: Boolean = false;
  public isCaller: Boolean = false;
  public isAdmin: Boolean = true;
  private login: LoginComponent;
  private navbar: Boolean = environment.navbar;

  private configCounterDown: any = { leftTime: (moment().diff(this.pedido.timeChangeSatus)) / 1000 };
  constructor(private _api: ApiRestService, private cookie: CookieService) { }
  ngOnInit() {
    this.pedido.timeChangeSatus = moment().subtract(10, 'minutes')
    console.log(moment().format())
    console.log(moment(this.pedido.timeChangeSatus).format())
    console.log(moment().diff(this.pedido.timeChangeSatus))
    // this.configCounterDown.leftTime = (moment().diff(this.pedido.timeChangeSatus)) / 1000;
    // this.configCounterDown={leftTime: moment().format()-moment(this.pedido.timeChangeSatus).format()}
    console.log('getAll', this.cookie.getAll(), this.cookie.get('isLogged') == 'true')
    if (!this.cookie.get('isLogged') || !(this.cookie.get('isLogged') === 'true')) {
      console.log(this.user._id, '1-', this._api.isUser());
      this.checkRole();
      this._api.loginUser(false, this.user).then((result) => {
        this.getPedido();
        console.log(result);
        this.user = new User(result._id, result.name, result.email, result.role, result.profile);
        this.checkRole();
        this.isUser = false;
      }).catch((err) => {

      });
    } else {
      const userLogged = JSON.parse(this.cookie.get('userLogged'));
      console.log(typeof userLogged, userLogged);
      /*this.user = new User({
        _id: userLogged._id, name: userLogged.name, email: userLogged.email, role: userLogged.role, profile: userLogged.profile
      });*/
      this.isUser = true;
      // this.user = new User(userLogged);
      this.user = new User(userLogged._id, userLogged.name, userLogged.email, userLogged.role, userLogged.profile);
      this.getPedido();
      this.checkRole();
    }


    /*this.isUser = this._api.isUser();
    if (this.isUser) {
      this.user = this._api.returnUser();
    }*/
  }
  checkUser(value) {
    this.isUser = value;

  }
  checkRole() {
    if (this.user.role !== 'User') { this.isAdmin = true; } else { this.isAdmin = false; }
  }
  getPedido() {
    this._api.getPedido().then((result) => {
      console.log('adpp', this.pedido);
      this.pedido = new Pedido(result._id, result.title, result.caller, result.status);
    }).catch((err) => {
    });
  }
  setUser(user) {
    this.user = user.name;
    console.log(this.user, this.pedido);
    this.checkRole();
    this.getPedido();
    // if ((this.user._id === this.pedido.caller._id) || this.isAdmin) { this.isCaller = true; } else { this.isCaller = false; }
  }

  notifyUpdate(val) {
    this._api.updateKeyValue('notify', val).then((result) => {
      console.log('result', result);
      this.user.notify = val;
    }).catch((err) => {
      console.log('err', err);
    });
  }
}
