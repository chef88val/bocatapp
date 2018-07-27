import { Component, OnInit } from '@angular/core';
import { Bocata } from "../../bocata";
import { apirestService } from '../../services/apirest.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  public listBocatas: Bocata[];
  public bocata:Bocata;
  constructor(private _api: apirestService) { }

  ngOnInit() {
    this.bocata = new Bocata('asd');
    this.listBocatas  = this._api.getBocatas();

  }
  onSubmit() {

   }

  addItem(item){ 
    this.listBocatas.push(item.name) 
  }

}
