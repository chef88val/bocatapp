import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../services/apiRestService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
/*export class AdminItem{
  private title: String;
  private label1: String;
  private btn_save: String;
  private btn_delete: String;

  constructor(){

  }
}*/
export class AdminComponent implements OnInit {
private isAdmin: Boolean =true;
private userAdminLogin: any ={}
  /*private const item=[
    'bocata' : {},
    'pedido' : {},
    'user' : {},
  ]*/
  constructor(private _api: ApiRestService) { }

  ngOnInit() {
    this.userAdminLogin = this._api.returnUser();
    if (this.userAdminLogin.role === 'Admin') {
      this.isAdmin = true;
    }
  }
  login(value) {
    this._api.getAdminPassword(value).then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log(res);
      return res;
    });
  }

}
