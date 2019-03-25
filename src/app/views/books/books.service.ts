import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Book } from '../../entities/book';

import { environment } from '../../../environments/environment';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

type BooksResponse = {
    data: { _id: string; book: Book }[];
};
@Injectable()
export class BooksService {
    constructor(private http: HttpClient) {}

    public getBooks(): Observable<Book[]> {
        return this.http.get(API_URL + '/books').pipe(
            map((response: any) => {
                const books = response.data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            }),
            catchError(this.handleError),
        );
    }
    public getRecommendedBooks(username: string): Observable<Book[]> {
        return this.http.post(API_URL + '/books/recommended', { username }).pipe(
            map((response: any) => {
                const books = response.books;
                return books.map(bookData => new Book({ ...bookData.book, id: bookData._id }));
            }),
            catchError(this.handleError),
        );
    }
    public getBookByName(name: string): Observable<Book> {
        return this.http.get(API_URL + '/books/' + name).pipe(
            map((response: any) => {
                const books = response.data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id })).pop();
            }),
            catchError(this.handleError),
        );
    }
    public searchBooksFullWord(value): Observable<Book[]> {
        return this.http.get(API_URL + '/books/searchFullWord/' + value).pipe(
            map((response: any) => {
                const books = response.data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            }),
            catchError(this.handleError),
        );
    }
    public searchBooksStartWord(value): Observable<Book[]> {
        return this.http.get(API_URL + '/books/searchStartWord/' + value).pipe(
            map((response: any) => {
                const books = response.data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            }),
            catchError(this.handleError),
        );
    }

    public updateBookByName(name: string, book: Book, token: string) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('Authorization', token);
        headers = headers.append('enctype', 'multipart/form-data');
        const options = { headers };

        const formData: FormData = new FormData();
        formData.append('name', book.name.trim());
        formData.append('id', book.id.trim());
        formData.append('authorName', book.authorName.trim());
        formData.append('description', book.description.trim());
        return this.http.post(API_URL + '/books/' + name, formData, options).pipe(
            map((response: any) => {
                const books = response.data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id })).pop();
            }),
            catchError(this.handleError),
        );
    }

    public newBook(book: Book, token: string): Observable<Book[]> {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('Authorization', token);
        headers = headers.append('enctype', 'multipart/form-data');
        const options = { headers };

        const formData: FormData = new FormData();
        formData.append('uploadFile', book.file, book.file.name.trim());
        formData.append('name', book.name.trim());
        formData.append('authorName', book.authorName.trim());
        formData.append('description', book.description.trim());
        /** In Angular 5, including the header Content-Type can invalidate your request */
        return this.http.post(API_URL + '/books/add', formData, options).pipe(
            map((response: any) => {
                const books = response.data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            }),
            catchError(this.handleError),
        );
    }

    public getBooksByUsername(username, token): Observable<Book[]> {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('Authorization', token);
        const options = { headers };
        return this.http.get(API_URL + '/books/user/' + username, options).pipe(
            map((response: any) => {
                const books = response.data.userBooks;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            }),
            catchError(this.handleError),
        );
    }

    public getPdf(idOfBook: string) {
        return PDFJS.getDocument(API_URL + '/pdf/' + idOfBook);
    }

    private handleError(error: Response | any) {
        return observableThrowError(error);
    }
}
