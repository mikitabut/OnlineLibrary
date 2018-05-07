import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Book } from '../../entities/book';

import { environment } from '../../../environments/environment';
import { RequestOptions, Headers, Http } from '@angular/http';

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

    public newBook(book: Book): Observable<Book[]> {
        const formData: FormData = new FormData();
        formData.append('uploadFile', book.file, book.file.name);
        formData.append('name', book.name);
        formData.append('authorName', book.author.name);
        formData.append('description', book.description);
        const headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Accept', 'application/json');
        headers.append('enctype', 'multipart/form-data');
        const options = new RequestOptions({ headers });
        return this.http
            .post(API_URL + '/books/add', formData, options)
            .map(response => {
                const books = response.json().data;
                return books.map(todo => new Book({ ...todo.book, id: todo._id }));
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error.json().data);
    }
}
