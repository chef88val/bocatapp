import { Component, OnInit } from '@angular/core';
import { User } from '../../../user';
import { ApiRestService } from '../../../services/apiRestService';
import { AppComponent } from '../../../app.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userLogin: User = new User(null,null, 'jsm.multimedia@gmail.com', 'User', 'SF');
  public profiles: any = ['-'];
  private email: String;
  private isNew: Boolean = false;
  constructor(private route: ActivatedRoute, private _route: Router, private _api: ApiRestService, private main: AppComponent) { }

  ngOnInit() {
    console.log('asdasd');
    this.route.params.subscribe(params => {
      // (+) converts string 'id' to a number
      console.log(params);
      if (params.email) {
        this.email = params.email;
        // In a real app: dispatch action to load the details here.
        this.isNew = true;
        this.userLogin.email = params.email;

      } else { this.isNew = false; }
    });
    // this._api.getFeed(this.id).then((params)=>{console.log(params);return params})
    if(!this.isNew ){
    this._api.getAdmin().then((data) => { console.log(data.profilesAPI); this.profiles.push(data.profilesAPI) });
    console.log(this.profiles)
    this._api.setUser(this.userLogin);
    this._route.navigate(['']);
    }

  }

  login(user) {
    console.log(user);
    this._api.loginUser(this.isNew,user).then(data => { 
      if ('_id' in data) {
        this._api.setUser(data); 
        //this.main.checkUser(true) 
        this._route.navigate(['']);
      } else { 
       // this.main.checkUser(false) 
      }
      console.log('1', data)
               if (this.isNew)  this._route.navigate(['']);

         });

      //console.log('resp',resp);
      /*.then((data)=>{
        console.log(data);
      });*/
    /*} else {

    }*/
  }

}
