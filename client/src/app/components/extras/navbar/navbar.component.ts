import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../../services/apiRestService';
import { CookieService } from '../../../../../node_modules/ngx-cookie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isUser:Boolean = false;
  constructor(private _api:ApiRestService, private cookie: CookieService) { }

  ngOnInit() {
    this.isUser = this._api.isUser();
  }

  logout(){
    this.cookie.removeAll()
  }

}
