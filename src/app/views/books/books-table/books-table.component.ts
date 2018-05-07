import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Book } from '../../../entities/book';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'books-table',
    styleUrls: ['./books-table.component.css'],
    templateUrl: './books-table.component.html',
})
export class BooksTableComponent implements OnChanges {
    @Input() books: Observable<Book[]>;
    dataSource: BooksDataSource;
    columnsToDisplay = ['bookName', 'authorName', 'description'];
    constructor() {
        this.dataSource = new BooksDataSource(this.books);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.books && !changes.firstChange) {
            if (this.dataSource) {
                this.dataSource.disconnect();
            }
            this.dataSource = new BooksDataSource(this.books);
        }
    }
}
export class BooksDataSource extends DataSource<any> {
    constructor(public books: Observable<Book[]>) {
        super();
    }
    connect(): Observable<Book[]> {
        return this.books;
    }
    disconnect() {
        this.books = undefined;
    }
}
