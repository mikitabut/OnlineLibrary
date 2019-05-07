import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Book } from '../../../entities/book';
import * as UserActions from '../../../actions/user.actions';
import { getUsername, getIsUserLoggedIn } from '../../../reducers/user.reducers';
import { getManagedBooks } from '../../../reducers/books.reducers';

@Component({
    selector: 'header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    managedBooks: Observable<Book[]>;
    username: Observable<string>;
    isUserLoggedIn: Observable<boolean>;

    @ViewChild('drawer') drawer;

    constructor(private store: Store<any>) {
        this.username = this.store.pipe(select(getUsername));
        this.isUserLoggedIn = this.store.pipe(select(getIsUserLoggedIn));
        this.managedBooks = this.store.pipe(select(getManagedBooks));
    }

    logout() {
        this.store.dispatch(new UserActions.Logout(null));
    }

    toggle() {
        if (this.drawer) {
            this.drawer.toggle();
        }
    }
}
