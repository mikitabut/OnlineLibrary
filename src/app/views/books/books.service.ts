import { Injectable } from '@angular/core';
import { Book } from '../../entities/book';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class BooksService {
  constructor(private http: Http) {}

  // Rewrite with database
  public getBooks(): Observable<Book[]> {
    return this.http
      .get(API_URL + '/books')
      .map(response => {
        const todos = response.json();
        return todos.map(todo => new Book(todo));
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
