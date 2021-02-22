import { Component, OnInit, Input } from '@angular/core';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';
import { ApiRestService } from '../../../services/apiRestService';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent implements OnInit {
@Input() info;
public item: any ={}
  constructor(private _api: ApiRestService) { }

  ngOnInit() {
  }
  create(item){
    if(this.info==='user'){
      this._api.postUser(item).then((result)=>{ console.log('result', result); return result;}).catch((error)=>{console.log('error', error); return error;});
    }
    else if(this.info==='pedido'){
      this._api.postPedido(item).then((result)=>{ console.log('result', result); return result;}).catch((error)=>{console.log('error', error); return error;});
    }
    else if(this.info==='bocata'){
      this._api.postBocatas(item).then((result)=>{ console.log('result', result); return result;}).catch((error)=>{console.log('error', error); return error;});
    }
  }

}
