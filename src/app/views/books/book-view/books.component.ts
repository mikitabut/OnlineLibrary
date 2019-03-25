import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../../entities/book';
import { BooksService } from '../books.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService, User } from '../../../services/authService';
import { ErrorCode } from '../../../entities/error';

@Component({
    selector: 'app-books',
    styleUrls: ['./books.component.css'],
    templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
    bookStartInserted: boolean;
    books?: Book[];
    userBooks?: Book[];
    searchSubject: Subject<{ phrase: string; byWord: boolean }>;
    usernameSubscription: Subscription;
    username: string;
    columnsToDisplay = ['bookName', 'authorName', 'description'];
    recommendedBooks: Observable<Book[]>;

    constructor(
        private booksService: BooksService,
        private snackBar: MatSnackBar,
        private authService: AuthenticationService,
    ) {
        this.searchSubject = new Subject();
        this.usernameSubscription = this.authService.username.subscribe(
            value => (this.username = value),
        );
        this.username = this.authService.getLogged()
            ? this.authService.getLogged().username
            : undefined;
        this.recommendedBooks = this.booksService.getRecommendedBooks(this.username);
    }

    ngOnInit() {
        this.booksService.getBooks().subscribe(
            books => {
                this.books = books;
            },
            error => {
                debugger;
                this.snackBar.open(
                    error.data ? error.status + ':' + error.data : error.message,
                    'OK',
                );
            },
        );
        this.searchSubject.subscribe(value => {
            if (value.phrase.length <= 2) {
                this.booksService.getBooks().subscribe(books => (this.books = books));
            } else {
                if (value.byWord) {
                    this.booksService
                        .searchBooksFullWord(value.phrase.trim())
                        .subscribe(books => (this.books = books));
                } else {
                    this.booksService
                        .searchBooksStartWord(value.phrase.trim())
                        .subscribe(books => (this.books = books));
                }
            }
        });
    }

    onBooksUpdate(book: Book) {
        this.bookStartInserted = true;
        this.booksService.newBook(book, this.authService.token).subscribe(
            books => {
                this.books = books;
                this.snackBar.open('Book was inserted successfully', 'OK');
                this.bookStartInserted = false;
                this.recommendedBooks = this.booksService.getRecommendedBooks(this.username);
            },
            error => {
                if (error.status === ErrorCode.NotAuthorized) {
                    this.authService.logout();
                }
                this.snackBar.open(error.status + ':' + error.data, 'OK');
            },
        );
    }
    onUserUpdate(user: User) {
        this.authService.login(user.username, user.password).subscribe(
            () => {
                this.snackBar.open('Hello ' + user.username + '!', 'OK');
            },
            error => this.snackBar.open(error.status + ':' + error.data.statusText, 'OK'),
        );
    }
    onUserSignUp(user: User) {
        this.authService.register(user.username, user.password).subscribe(
            () => {
                this.snackBar.open('User successfully created', 'OK');
            },
            error => this.snackBar.open(error.status + ':' + error.data.statusText, 'OK'),
        );
    }
}
