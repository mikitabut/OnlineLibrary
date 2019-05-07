import { createSelector } from '@ngrx/store';

import * as booksActions from '../actions/books.actions';
import * as fromRoot from './';
import { Book } from '../entities/book';

export const rootSelector = (state: State) => state;

export interface BooksState {
    books?: Book[];
    recommendedBooks?: Book[];
    managedBooks?: Book[];
    singleBook?: Book;
    pdfSingleBook?: any;
}

export interface State extends fromRoot.State {
    books: BooksState;
}

const initialState: BooksState = {};

export function reducer(state = initialState, { type, payload }: booksActions.Actions): BooksState {
    switch (type) {
        case booksActions.UPDATE_EXISTING_BOOKS:
            return { ...state, books: payload };
        case booksActions.UPDATE_RECOMMENDED_BOOKS:
            return { ...state, recommendedBooks: payload };
        case booksActions.UPDATE_MANAGED_BOOKS:
            return { ...state, managedBooks: payload };
        case booksActions.UPDATE_SINGLE_BOOK:
            return { ...state, singleBook: payload };
        case booksActions.UPDATE_PDF_SINGLE_BOOK:
            return { ...state, pdfSingleBook: payload };
        case booksActions.CLEAR_MANAGED_BOOKS:
            return { ...state, managedBooks: initialState.managedBooks };
        case booksActions.CLEAR_RECOMMENDED_BOOKS:
            return { ...state, recommendedBooks: initialState.recommendedBooks };
        default:
            return state;
    }
}

export const getBooksState = createSelector(
    rootSelector,
    (state: State) => state.books,
);
export const getExistingBooks = createSelector(
    getBooksState,
    (state: BooksState) => state.books || [],
);
export const getRecommendedBooks = createSelector(
    getBooksState,
    (state: BooksState) => state.recommendedBooks || [],
);
export const getManagedBooks = createSelector(
    getBooksState,
    (state: BooksState) => state.managedBooks || [],
);
export const getSingleBook = createSelector(
    getBooksState,
    (state: BooksState) => state.singleBook,
);
export const getPdfSingleBook = createSelector(
    getBooksState,
    (state: BooksState) => state.pdfSingleBook,
);
export const getHasManagedBookByName = createSelector(
    getManagedBooks,
    (state: Book[], name: string) => !!state.find(book => book.name === name),
);
