import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { ApiRestService } from './services/apiRestService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private user: User;
  public isUser: Boolean = true;

  constructor(private _api: ApiRestService) {}
  ngOnInit() {
    console.log('1-', this._api.isUser())
    /*this.isUser = this._api.isUser();
    if (this.isUser) {
      this.user = this._api.returnUser();
    }*/
  }
  checkUser(value){this.isUser=value;
    
  }
}
