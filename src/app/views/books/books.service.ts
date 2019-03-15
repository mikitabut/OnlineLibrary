import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Book } from '../../entities/book';

import { environment } from '../../../environments/environment';
import { RequestOptions, Headers, Http } from '@angular/http';
import * as PDFJS from 'pdfjs-dist/build/pdf';

const API_URL = environment.apiUrl;

type BooksResponse = {
    data: { _id: string; book: Book }[];
};
@Injectable()
export class BooksService {
    constructor(private http: Http) {}

    public getBooks(): Observable<Book[]> {
        return this.http
            .get(API_URL + '/books')
            .map(response => {
                const books = response.json().data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            })
            .catch(this.handleError);
    }
    public getRecommendedBooks(username: string): Observable<Book[]> {
        return this.http
            .post(API_URL + '/books/recommended', { username })
            .map(response => {
                const books = response.json().books;
                return books.map(bookData => new Book({ ...bookData.book, id: bookData._id }));
            })
            .catch(this.handleError);
    }
    public getBookByName(name: string): Observable<Book> {
        return this.http
            .get(API_URL + '/books/' + name)
            .map(response => {
                const books = response.json().data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id })).pop();
            })
            .catch(this.handleError);
    }
    public searchBooksFullWord(value): Observable<Book[]> {
        return this.http
            .get(API_URL + '/books/searchFullWord/' + value)
            .map(response => {
                const books = response.json().data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            })
            .catch(this.handleError);
    }
    public searchBooksStartWord(value): Observable<Book[]> {
        return this.http
            .get(API_URL + '/books/searchStartWord/' + value)
            .map(response => {
                const books = response.json().data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            })
            .catch(this.handleError);
    }

    public updateBookByName(name: string, book: Book, token: string) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', token);
        headers.append('enctype', 'multipart/form-data');
        const options = new RequestOptions({ headers });

        const formData: FormData = new FormData();
        formData.append('name', book.name.trim());
        formData.append('id', book.id.trim());
        formData.append('authorName', book.authorName.trim());
        formData.append('description', book.description.trim());
        return this.http
            .post(API_URL + '/books/' + name, formData, options)
            .map(response => {
                const books = response.json().data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id })).pop();
            })
            .catch(this.handleError);
    }

    public newBook(book: Book, token: string): Observable<Book[]> {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', token);
        headers.append('enctype', 'multipart/form-data');
        const options = new RequestOptions({ headers });

        const formData: FormData = new FormData();
        formData.append('uploadFile', book.file, book.file.name.trim());
        formData.append('name', book.name.trim());
        formData.append('authorName', book.authorName.trim());
        formData.append('description', book.description.trim());
        /** In Angular 5, including the header Content-Type can invalidate your request */
        return this.http
            .post(API_URL + '/books/add', formData, options)
            .map(response => {
                const books = response.json().data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            })
            .catch(this.handleError);
    }

    public getBooksByUsername(username, token): Observable<Book[]> {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', token);
        const options = new RequestOptions({ headers });
        return this.http
            .get(API_URL + '/books/user/' + username, options)
            .map(response => {
                const books = response.json().data.userBooks;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            })
            .catch(this.handleError);
    }

    public getPdf(idOfBook: string) {
        return PDFJS.getDocument(API_URL + '/pdf/' + idOfBook);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
