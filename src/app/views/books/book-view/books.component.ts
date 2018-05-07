import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../../entities/book';
import { BooksService } from '../books.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-books',
    styleUrls: ['./books.component.css'],
    templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
    public books?: Observable<Book[]>;
    columnsToDisplay = ['bookName', 'authorName', 'description'];
    constructor(private booksService: BooksService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.booksService.getBooks().subscribe(
            books => {
                this.books = Observable.of(books);
            },
            error => this.snackBar.open(error, 'OK'),
        );
    }

    onBooksUpdate(book: Book) {
        this.booksService.newBook(book).subscribe(
            books => {
                this.books = Observable.of(books);
            },
            error => this.snackBar.open(error, 'OK'),
        );
    }
}
