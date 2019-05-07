import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Book } from '../../../entities/book';
import * as BooksActions from '../../../actions/books.actions';
import { getIsUserLoggedIn } from '../../../reducers/user.reducers';
import { getExistingBooks, getRecommendedBooks } from '../../../reducers/books.reducers';

@Component({
    selector: 'app-books-page-container',
    styleUrls: ['./books-page-container.component.css'],
    templateUrl: './books-page-container.component.html',
})
export class BooksPageContainerComponent implements OnInit {
    existingBooks: Observable<Book[]>;
    recommendedBooks: Observable<Book[]>;
    isUserLoggedIn: Observable<boolean>;

    constructor(private store: Store<any>) {
        this.isUserLoggedIn = this.store.pipe(select(getIsUserLoggedIn));
        this.existingBooks = this.store.pipe(select(getExistingBooks));
        this.recommendedBooks = this.store.pipe(select(getRecommendedBooks));
    }

    ngOnInit() {
        this.store.dispatch(new BooksActions.FetchExistingBooks(null));
    }
}
