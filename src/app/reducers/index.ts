import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { UserState, reducer as userReducers } from './user.reducers';
import { BooksState, reducer as booksReducers } from './books.reducers';
import { UiState, reducer as uiReducers } from './ui.reducers';

export interface State {
    user: UserState;
    books: BooksState;
    ui: UiState;
}

export const reducers: ActionReducerMap<State> = {
    user: userReducers,
    books: booksReducers,
    ui: uiReducers,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
