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

    // Get all books
    public getBooks() {
        return this.http.get(API_URL + '/books');
    }

    // If token is presented in header we get personal recommendations, otherwise common
    public getRecommendedBooks() {
        return this.http.get(API_URL + '/books/recommended');
    }

    // Get specified book
    public getBookByName(name: string) {
        return this.http.get(API_URL + '/books/' + name);
    }
    // Search book by full word
    public searchBooksFullWord(value) {
        return this.http.get(API_URL + '/books/searchFullWord/' + value);
    }
    // Search book by path word
    public searchBooksStartWord(value) {
        return this.http.get(API_URL + '/books/searchStartWord/' + value);
    }

    public updateBookByName(name: string, book: Book) {
        let headers = new HttpHeaders();
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
    public newBook(book: Book) {
        let headers = new HttpHeaders();
        headers = headers.append('enctype', 'multipart/form-data');
        const options = { headers };

        const formData: FormData = new FormData();
        formData.append('uploadFile', book.file, book.file.name.trim());
        formData.append('name', book.name.trim());
        formData.append('authorName', book.authorName.trim());
        formData.append('description', book.description.trim());
        return this.http.post(API_URL + '/books/add', formData, options);
    }

    // Updated
    public getManagedBooks() {
        return this.http.get(API_URL + '/books/user/');
    }

    public getPdf(idOfBook: string) {
        return PDFJS.getDocument(API_URL + '/pdf/' + idOfBook);
    }
}
