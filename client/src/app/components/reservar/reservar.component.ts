import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiRestService } from '../../services/apiRestService';
import { Bocata } from '../../bocata';
import { Book } from '../../book';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  private listBocatas: Bocata[] = [];
  private book: Book = null;
  constructor(private _api: ApiRestService) { }

  ngOnInit() {
    this.listBocatas = this._api.returnPedido().items;
    console.log('this._api.returnUser()._id', this._api.returnUser()._id);
    this.book = new Book(null, this._api.returnUser()._id, null, null);
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.listBocatas.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  formatter = (x: { name: string }) => x.name;

  itemToBook() {
    console.log(this.book);
    // this.book.item = this.book.item._id;
    this._api.book(this.book).then(data => { if ('_id' in data) { console.log('1', data); } });
  }
}
