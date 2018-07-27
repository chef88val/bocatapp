import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { Restangular } from '../../../../../node_modules/ngx-restangular';
import { ApiRestService } from '../../../services/apiRestService';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userLogin: User = new User(null,'jsm.multimedia@gmail.com','User','SF');
  public profiles: any = ['-'];
  constructor(private _api: ApiRestService, private main:AppComponent) { }

  ngOnInit() {
    console.log('asdasd');
    this._api.getAdmin().then((data) => { console.log(data.profilesAPI); this.profiles.push(data.profilesAPI) });
    console.log(this.profiles)
  }

  login(user) {
    console.log(user);
    this._api.loginUser(user).then(data =>{if('_id' in data){this.main.checkUser(true)}else{this.main.checkUser(false)} console.log('1',data)});
    
    //console.log('resp',resp);
    /*.then((data)=>{
      console.log(data);
    });*/
  }

}
