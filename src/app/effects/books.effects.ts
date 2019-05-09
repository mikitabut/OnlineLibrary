import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BooksActions from '../actions/books.actions';
import * as NotificationActions from '../actions/notification.actions';
import * as UiActions from '../actions/ui.actions';
import { BooksService } from '../views/books/books.service';
import { Book } from '../entities/book';

@Injectable()
export class BooksEffects {
    constructor(
        private actions$: Actions,
        private booksService: BooksService,
        private store: Store<any>,
    ) {}

    @Effect({ dispatch: false })
    addNewBook$ = this.actions$.pipe(
        ofType<BooksActions.AddNewBook>(BooksActions.ADD_NEW_BOOK),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.booksService.newBook(payload).pipe(
                map((books: any) =>
                    books.map(
                        backendBook => new Book({ ...backendBook.book, id: backendBook._id }),
                    ),
                ),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            );
        }),
        tap((books: Book[]) => this.store.dispatch(new BooksActions.UpdateExistingBooks(books))),
        tap(() =>
            this.store.dispatch(
                new NotificationActions.ShowNotification('Book was inserted successfully'),
            ),
        ),
        tap(() => this.store.dispatch(new BooksActions.FetchRecommendedBooks(null))),
    );

    @Effect()
    editBookByName$ = this.actions$.pipe(
        ofType<BooksActions.EditSingleBookByName>(BooksActions.EDIT_SINGLE_BOOK_BY_NAME),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.booksService.updateBookByName(payload.bookName, payload.book).pipe(
                map((book: any) => new Book(book)),
                finalize(() => {
                    this.store.dispatch(
                        new NotificationActions.ShowNotification('Book was changed successfully'),
                    );
                    this.store.dispatch(new UiActions.HideSpinner(null));
                }),
            );
        }),
        map((book: Book) => {
            this.store.dispatch(new BooksActions.UpdateSingleBook(book));

            return new BooksActions.FetchPdfSingleBook(book.id);
        }),
    );

    @Effect()
    fetchExistingBooks$ = this.actions$.pipe(
        ofType<BooksActions.FetchExistingBooks>(BooksActions.FETCH_EXISTING_BOOKS),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(() =>
            this.booksService.getBooks().pipe(
                map((books: any) => books.map(book => new Book({ ...book.book, id: book._id }))),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            ),
        ),
        map((books: Book[]) => new BooksActions.UpdateExistingBooks(books)),
    );

    @Effect()
    fetchFilteredBooks$ = this.actions$.pipe(
        ofType<BooksActions.FetchFilteredBooks>(BooksActions.FETCH_FILTERED_BOOKS),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            let resultedBooks$;

            resultedBooks$ = payload.fullWord
                ? this.booksService.searchBooksFullWord(payload.phrase.trim())
                : this.booksService.searchBooksStartWord(payload.phrase.trim());

            return resultedBooks$.pipe(
                map((books: any) => books.map(book => new Book({ ...book.book, id: book._id }))),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            );
        }),
        map((books: Book[]) => new BooksActions.UpdateExistingBooks(books)),
    );

    @Effect()
    fetchRecommendedBooks$ = this.actions$.pipe(
        ofType<BooksActions.FetchRecommendedBooks>(BooksActions.FETCH_RECOMMENDED_BOOKS),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(() =>
            this.booksService.getRecommendedBooks().pipe(
                map((books: any) => books.map(book => new Book({ ...book.book, id: book._id }))),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            ),
        ),
        map((books: Book[]) => new BooksActions.UpdateRecommendedBooks(books)),
    );

    @Effect()
    fetchManagedBooks$ = this.actions$.pipe(
        ofType<BooksActions.FetchManagedBooks>(BooksActions.FETCH_MANAGED_BOOKS),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(() =>
            this.booksService.getManagedBooks().pipe(
                map((books: any) => books.map(book => new Book({ ...book.book, id: book._id }))),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            ),
        ),
        map((books: Book[]) => new BooksActions.UpdateManagedBooks(books)),
    );

    @Effect()
    fetchSingleBook$ = this.actions$.pipe(
        ofType<BooksActions.FetchSingleBook>(BooksActions.FETCH_SINGLE_BOOK),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) =>
            this.booksService.getBookByName(payload).pipe(
                map((books: any) =>
                    books.map(book => new Book({ ...book.book, id: book._id })).pop(),
                ),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            ),
        ),
        map((book: Book) => {
            this.store.dispatch(new BooksActions.UpdateSingleBook(book));

            return new BooksActions.FetchPdfSingleBook(book.id);
        }),
    );
    @Effect()
    fetchPdfSingleBook$ = this.actions$.pipe(
        ofType<BooksActions.FetchPdfSingleBook>(BooksActions.FETCH_PDF_SINGLE_BOOK),
        switchMap(({ payload }) => {
            return new Observable(observer => {
                this.booksService.getPdf(payload).then(pdf => observer.next(pdf));
            });
        }),
        map((pdf: any) => new BooksActions.UpdatePdfSingleBook(pdf)),
    );
}
