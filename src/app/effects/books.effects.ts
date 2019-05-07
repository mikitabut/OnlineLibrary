import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, finalize, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';

import * as BooksActions from '../actions/books.actions';
import * as NotificationActions from '../actions/notification.actions';
import * as UiActions from '../actions/ui.actions';
import { BooksService } from '../views/books/books.service';
import { getUsertoken, getUsername } from '../reducers/user.reducers';
import { Book } from '../entities/book';

@Injectable()
export class BooksEffects {
    constructor(
        private actions$: Actions,
        private booksService: BooksService,
        private store: Store<any>,
    ) {}

    @Effect()
    addNewBook$ = this.actions$.pipe(
        ofType<BooksActions.AddNewBook>(BooksActions.ADD_NEW_BOOK),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.store.pipe(
                select(getUsertoken),
                switchMap((userToken: string) => this.booksService.newBook(payload, userToken)),
                map((obj: any) => {
                    const books = obj.data;
                    return books.map(
                        backendBook => new Book({ ...backendBook.book, id: backendBook._id }),
                    );
                }),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            );
        }),
        map((books: Book[]) => new BooksActions.UpdateExistingBooks(books)),
        tap(() => new NotificationActions.ShowNotification('Book was inserted successfully')),
        tap(() => new BooksActions.FetchRecommendedBooks(null)),
    );

    @Effect()
    editBookByName$ = this.actions$.pipe(
        ofType<BooksActions.EditSingleBookByName>(BooksActions.EDIT_SINGLE_BOOK_BY_NAME),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.store.pipe(
                select(getUsertoken),
                switchMap((userToken: string) =>
                    this.booksService.updateBookByName(payload.bookName, payload.book, userToken),
                ),
                map((response: any) => {
                    const books = response.data;
                    return books.map(book => new Book({ ...book.book, id: book._id })).pop();
                }),
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
                map((obj: any) => {
                    const books = obj.data;
                    return books.map(
                        backendBook => new Book({ ...backendBook.book, id: backendBook._id }),
                    );
                }),
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
                map((obj: any) => {
                    const books = obj.data;
                    return books.map(
                        backendBook => new Book({ ...backendBook, id: backendBook._id }),
                    );
                }),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            );
        }),
        map((books: Book[]) => new BooksActions.UpdateExistingBooks(books)),
    );

    @Effect({ dispatch: false })
    fetchRecommendedBooks$ = this.actions$.pipe(
        ofType<BooksActions.FetchRecommendedBooks>(BooksActions.FETCH_RECOMMENDED_BOOKS),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(() =>
            combineLatest(
                this.store.pipe(select(getUsertoken)),
                this.store.pipe(select(getUsername)),
            ),
        ),
        filter(([userToken, username]) => !!userToken && !!username),
        switchMap(([userToken, username]) =>
            this.booksService.getRecommendedBooks(username, userToken).pipe(
                map((obj: any) => {
                    const books = obj.books;
                    return books.map(
                        backendBook => new Book({ ...backendBook.book, id: backendBook._id }),
                    );
                }),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
            ),
        ),
        map((books: Book[]) => this.store.dispatch(new BooksActions.UpdateRecommendedBooks(books))),
    );

    @Effect()
    fetchManagedBooks$ = this.actions$.pipe(
        ofType<BooksActions.FetchManagedBooks>(BooksActions.FETCH_MANAGED_BOOKS),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(() =>
            combineLatest(
                this.store.pipe(select(getUsertoken)),
                this.store.pipe(select(getUsername)),
            ),
        ),
        filter(([userToken, username]) => !!userToken && !!username),
        switchMap(([userToken, username]) =>
            this.booksService.getBooksByUsername(username, userToken).pipe(
                map((obj: any) => {
                    const books = obj.data.userBooks;
                    return books.map(
                        backendBook => new Book({ ...backendBook.book, id: backendBook._id }),
                    );
                }),
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
                map((obj: any) => {
                    const books = obj.data;
                    return books && books[0] && new Book({ ...books[0].book, id: books[0]._id });
                }),
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
