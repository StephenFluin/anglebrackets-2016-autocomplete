import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Autocompletr';
  query: string;
  repos: Observable<any>;

  attemptedSearch = new Subject<string>();

  constructor(http: Http) {
    // let query = 'angular';
    // this.repos = http.get(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`)
    //   .map(res => res.json())
    this.repos = this.attemptedSearch
    .debounceTime(300)
    .distinctUntilChanged()
    .filter(v => !!v)
    .switchMap(query => {
      return http.get(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`)
       .map(res => res.json())
    });
  }
  queryUpdate() {
    this.attemptedSearch.next(this.query);
    console.log("got a new query", this.query);
  }
}
