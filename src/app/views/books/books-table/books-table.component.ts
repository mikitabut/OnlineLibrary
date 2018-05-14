import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../../../entities/book';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'books-table',
    styleUrls: ['./books-table.component.css'],
    templateUrl: './books-table.component.html',
})
export class BooksTableComponent implements OnChanges {
    @Input() books: Book[];
    @Input() searchSubject: Subject<{ phrase: string; byWord?: boolean }>;
    wordSearch: boolean = false;
    dataSource: BooksDataSource;
    columnsToDisplay = ['bookName', 'authorName', 'description'];
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.books) {
            this.dataSource.update(this.books);
        }
    }
    constructor() {
        this.dataSource = new BooksDataSource(this.books || []);
    }

    onSearchChange(phrase: string) {
        if (phrase.length >= 3) {
            this.searchSubject.next({ phrase, byWord: this.wordSearch });
        } else {
            this.searchSubject.next({ phrase: '' });
        }
    }

    onToggleChange(checked: boolean) {
        this.wordSearch = checked;
    }
}
export class BooksDataSource extends MatTableDataSource<any> {
    private subj: BehaviorSubject<Book[]>;
    constructor(public data: Book[]) {
        super(data);
    }

    connect() {
        this.subj = this.subj || new BehaviorSubject(this.data);
        return this.subj;
    }

    disconnect() {
        this.data = undefined;
    }

    update(books) {
        this.connect().next(books);
    }
}
