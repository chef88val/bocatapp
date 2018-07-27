import { Component, OnInit,IterableDiffers } from '@angular/core';
import { Bocata } from '../../bocata';
import { ApiRestService } from '../../services/apiRestService';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  public listBocatas: Bocata[] =[];
  public bocata: Bocata;
  public currentList:Bocata[]=[];
  differ: any;
  constructor(private _api: ApiRestService,differs: IterableDiffers) { 
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.bocata = new Bocata(null);
     
    this.getBocata();
  }
  onSubmit() {

   }
   search = (text$: Observable<string>) =>
   text$.pipe(
     debounceTime(200),
     distinctUntilChanged(),
     map(term => term.length < 2 ? []
       : this.listBocatas.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
   );
   formatter = (x: {name: string}) => x.name;
  getBocata() {
    this._api.getBocatas().then((data) => { console.log(data); this.listBocatas = data.bocatas; });
  }
  /*ngDoCheck() {
    const change = this.differ.diff(this.bocata);
    //const change = this.differ.diff(this.currentList[this.currentList.length]);
    console.log(change);
  }*/
  addItem(item){
    console.log(typeof this.bocata)
  if(typeof this.bocata ==='object'){

  this.currentList.push(item);
  this.bocata ={}
  }
  }

}
