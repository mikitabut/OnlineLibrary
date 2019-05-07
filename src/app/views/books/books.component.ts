import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getIsSpinnerVisible } from '../../reducers/ui.reducers';

@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css'],
})
export class BooksMainComponent {
    isSpinnerVisible: Observable<boolean>;

    constructor(private store: Store<any>) {
        this.isSpinnerVisible = this.store.pipe(select(getIsSpinnerVisible));
    }
}
