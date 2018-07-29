import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { ApiRestService } from './services/apiRestService';
import { Pedido } from './pedido';
import { LoginComponent } from './components/extras/login/login.component';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public user: User = new User(null, null, 'jsm.multimedia@gmail.com', 'User', 'SF');
  private pedido: Pedido = new Pedido(null,null, null,null);
  public isUser: Boolean = true;
  public isCaller: Boolean = true;
  public isAdmin: Boolean = false;
  private login: LoginComponent;
  private navbar: Boolean = environment.navbar;

  constructor(private _api: ApiRestService) { }
  ngOnInit() {
    console.log(this.user._id,'1-', this._api.isUser());
    
    this._api.loginUser(this.user).then((result) => {
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
  checkRole(){
    if (this.user.role !== 'User') { this.isAdmin = true; } else { this.isAdmin = false; }
  }
getPedido(){
  this._api.getPedido().then((result) => {
    console.log('adpp', this.pedido);
    this.pedido = new Pedido(result._id,result.title, result.caller, result.status);
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
