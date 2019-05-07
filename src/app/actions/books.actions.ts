import { Action } from '@ngrx/store';

import { Book } from '../entities/book';

export const ADD_NEW_BOOK = '[Books] Add new book';
export const FETCH_EXISTING_BOOKS = '[Books] Fetch existing books';
export const FETCH_FILTERED_BOOKS = '[Books] Fetch filtered books';
export const FETCH_RECOMMENDED_BOOKS = '[Books] Fetch recommended books';
export const FETCH_MANAGED_BOOKS = '[Books] Fetch managed books';
export const FETCH_SINGLE_BOOK = '[Books] Fetch single book';
export const FETCH_PDF_SINGLE_BOOK = '[Books] Fetch pdf single book';
export const UPDATE_EXISTING_BOOKS = '[Books] Update existing books';
export const UPDATE_RECOMMENDED_BOOKS = '[Books] Update recommended books';
export const UPDATE_MANAGED_BOOKS = '[Books] Update managed books';
export const UPDATE_SINGLE_BOOK = '[Books] Update single book';
export const UPDATE_PDF_SINGLE_BOOK = '[Books] Update pdf single book';
export const EDIT_SINGLE_BOOK_BY_NAME = '[Books] Edit single book by name';
export const CLEAR_RECOMMENDED_BOOKS = '[Books] Clear recommended books';
export const CLEAR_MANAGED_BOOKS = '[Books] Clear managed books';

export class AddNewBook implements Action {
    readonly type = ADD_NEW_BOOK;

    constructor(public payload: Book) {}
}

export class FetchExistingBooks implements Action {
    readonly type = FETCH_EXISTING_BOOKS;

    constructor(public payload: null) {}
}
export class FetchFilteredBooks implements Action {
    readonly type = FETCH_FILTERED_BOOKS;

    constructor(public payload: { phrase: string; fullWord: boolean }) {}
}
export class FetchManagedBooks implements Action {
    readonly type = FETCH_MANAGED_BOOKS;

    constructor(public payload: null) {}
}
export class FetchSingleBook implements Action {
    readonly type = FETCH_SINGLE_BOOK;

    constructor(public payload: string) {}
}
export class FetchPdfSingleBook implements Action {
    readonly type = FETCH_PDF_SINGLE_BOOK;

    constructor(public payload: string) {}
}

export class UpdateExistingBooks implements Action {
    readonly type = UPDATE_EXISTING_BOOKS;

    constructor(public payload: Book[]) {}
}

export class FetchRecommendedBooks implements Action {
    readonly type = FETCH_RECOMMENDED_BOOKS;

    constructor(public payload: any) {}
}

export class UpdateRecommendedBooks implements Action {
    readonly type = UPDATE_RECOMMENDED_BOOKS;

    constructor(public payload: Book[]) {}
}
export class UpdateManagedBooks implements Action {
    readonly type = UPDATE_MANAGED_BOOKS;

    constructor(public payload: Book[]) {}
}
export class UpdateSingleBook implements Action {
    readonly type = UPDATE_SINGLE_BOOK;

    constructor(public payload: Book) {}
}
export class UpdatePdfSingleBook implements Action {
    readonly type = UPDATE_PDF_SINGLE_BOOK;

    constructor(public payload: any) {}
}
export class EditSingleBookByName implements Action {
    readonly type = EDIT_SINGLE_BOOK_BY_NAME;

    constructor(public payload: { bookName; book: Book }) {}
}
export class ClearRecommendedBooks implements Action {
    readonly type = CLEAR_RECOMMENDED_BOOKS;

    constructor(public payload: null) {}
}
export class ClearManagedBooks implements Action {
    readonly type = CLEAR_MANAGED_BOOKS;

    constructor(public payload: null) {}
}

export type Actions =
    | AddNewBook
    | FetchExistingBooks
    | FetchFilteredBooks
    | FetchManagedBooks
    | FetchRecommendedBooks
    | FetchSingleBook
    | FetchPdfSingleBook
    | UpdateExistingBooks
    | UpdateRecommendedBooks
    | UpdateManagedBooks
    | UpdateSingleBook
    | UpdatePdfSingleBook
    | EditSingleBookByName
    | ClearRecommendedBooks
    | ClearManagedBooks;
