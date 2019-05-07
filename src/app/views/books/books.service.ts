import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Book } from '../../entities/book';

import { environment } from '../../../environments/environment';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

type BooksResponse = {
    data: { _id: string; book: Book }[];
};
@Injectable()
export class BooksService {
    constructor(private http: HttpClient) {}

    // Updated
    public getBooks() {
        return this.http.get(API_URL + '/books');
    }
    // TODO: UserToken optional for now 06/05/2019
    // Updated
    public getRecommendedBooks(username: string, userToken) {
        return this.http.post(API_URL + '/books/recommended', { username });
    }

    public getBookByName(name: string) {
        return this.http.get(API_URL + '/books/' + name);
    }
    // Updated
    public searchBooksFullWord(value) {
        return this.http.get(API_URL + '/books/searchFullWord/' + value);
    }
    // Updated
    public searchBooksStartWord(value) {
        return this.http.get(API_URL + '/books/searchStartWord/' + value);
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
        return this.http.post(API_URL + '/books/' + name, formData, options);
    }

    // Updated
    public newBook(book: Book, token: string) {
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
        return this.http.post(API_URL + '/books/add', formData, options);
    }

    // Updated
    public getBooksByUsername(username, token) {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('Authorization', token);
        const options = { headers };
        return this.http.get(API_URL + '/books/user/' + username, options);
    }

    public getPdf(idOfBook: string) {
        return PDFJS.getDocument(API_URL + '/pdf/' + idOfBook);
    }
}
