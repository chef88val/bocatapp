import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { ApiRestService } from './services/apiRestService';
import { Pedido } from './pedido';
import { LoginComponent } from './components/extras/login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private user: User = new User(null,'jsm.multimedia@gmail.com','User','SF');
  private pedido: Pedido = new Pedido(null, null);
  public isUser: Boolean = false;
  public isCaller: Boolean = false;
  private login: LoginComponent;

  constructor(private _api: ApiRestService) { }
  ngOnInit() {
    console.log('1-', this._api.isUser());
    this._api.getPedido().then((result) => {
      console.log('adpp', this.pedido)
      this.pedido = result;
    }).catch((err) => {
    });
    this._api.loginUser(this.user).then((result) => {
      this.user = new User(result)
    }).catch((err) => {
      
    });;
    
    /*this.isUser = this._api.isUser();
    if (this.isUser) {
      this.user = this._api.returnUser();
    }*/
  }
  checkUser(value) {
    this.isUser = value;
    
  }
  
  setUser(user) {
    this.user = user;
    console.log(this.user, this.pedido)
    //if (this.user.name._id===this.pedido.caller._id) { this.isCaller =true } else { this.isCaller =false }
    }
}
