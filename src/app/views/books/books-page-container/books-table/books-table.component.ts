import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ViewChild,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map, debounceTime, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as BooksActions from '../../../../actions/books.actions';
import { Book } from '../../../../entities/book';
import { MatInput } from '@angular/material';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'books-table',
    styleUrls: ['./books-table.component.css'],
    templateUrl: './books-table.component.html',
})
export class BooksTableComponent implements OnDestroy, OnInit {
    @Input() books: Book[];
    @Input() recommendedBooks: Book[];
    @ViewChild(MatInput) input: MatInput;

    wordSearch: boolean = false;
    columnsToDisplay = [
        { name: 'name', title: 'Book Name', linkable: true },
        { name: 'authorName', title: 'Author Name' },
        { name: 'description', title: 'Description' },
    ];

    searchInputSubscription: Subscription;

    private previousPhrase = '';

    constructor(private store: Store<any>) {}

    ngOnInit(): void {
        this.searchInputSubscription = this.input.stateChanges
            .asObservable()
            .pipe(
                filter(() => this.input.value !== this.previousPhrase),
                debounceTime(2000),
                map(() => this.input.value),
            )
            .subscribe((phrase: any) => {
                this.previousPhrase = phrase;
                if (phrase && phrase.length) {
                    this.store.dispatch(
                        new BooksActions.FetchFilteredBooks({ phrase, fullWord: this.wordSearch }),
                    );
                } else {
                    this.store.dispatch(new BooksActions.FetchExistingBooks(null));
                }
            });
    }

    ngOnDestroy(): void {
        this.searchInputSubscription.unsubscribe();
    }
    getColumnsName() {
        return this.columnsToDisplay.map(value => value.name);
    }

    onToggleChange(checked: boolean) {
        this.wordSearch = checked;
        this.store.dispatch(
            new BooksActions.FetchFilteredBooks({
                phrase: this.previousPhrase,
                fullWord: this.wordSearch,
            }),
        );
    }
}
