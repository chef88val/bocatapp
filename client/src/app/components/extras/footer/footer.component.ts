import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../user';
import { ApiRestService } from '../../../services/apiRestService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() user;//: User;

  constructor(private _api: ApiRestService) { }

  ngOnInit() {
  }

  notifyUpdate(val){
    this._api.updateKeyValue('notify', val).then((result) => {
      console.log('result', result)
      this.user.notify = val;
    }).catch((err) => {
      console.log('err', err)
    });
  }


}
