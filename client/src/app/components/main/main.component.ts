import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ApiRestService } from '../../services/apiRestService';
import { Pedido } from '../../pedido';
import { LoginComponent } from '../extras/login/login.component';
import { environment } from '../../../environments/environment';
import { CountdownComponent } from 'ngx-countdown';
import  * as moment  from "moment";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: User = new User(null, null, 'jsm.multimedia@gmail.com', 'User', 'SF');
  private pedido: Pedido = new Pedido(null, null, null, 'draft');
  public isUser: Boolean = true;
  public isCaller: Boolean = true;
  public isAdmin: Boolean = true;
  private login: LoginComponent;
  private navbar: Boolean = environment.navbar;
   
  private configCounterDown: any ={};
  constructor(private _api: ApiRestService) { }
  ngOnInit() {
    this.pedido.timeChangeSatus = moment().subtract(10,'minutes')
    console.log( moment().format())
    console.log( moment(this.pedido.timeChangeSatus).format())
    console.log(moment().diff(this.pedido.timeChangeSatus))
    this.configCounterDown.leftTime = (moment().diff(this.pedido.timeChangeSatus))/1000
    //this.configCounterDown={leftTime: moment().format()-moment(this.pedido.timeChangeSatus).format()}
    console.log(this.user._id, '1-', this._api.isUser());
    this.checkRole();
    this._api.loginUser(false, this.user).then((result) => {
      this.getPedido();
      console.log(result)
      this.user = new User(result._id, result.name, result.email, result.role, result.profile);
      this.checkRole();
    }).catch((err) => {

    });

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
    //if ((this.user._id === this.pedido.caller._id) || this.isAdmin) { this.isCaller = true; } else { this.isCaller = false; }
  }
}
