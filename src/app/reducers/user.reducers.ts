import { createSelector } from '@ngrx/store';

import * as userActions from '../actions/user.actions';
import * as fromRoot from './';

export const rootSelector = (state: State) => state;

export interface UserState {
    username?: string;
    token?: string;
    userVkId?: string;
}

export interface State extends fromRoot.State {
    user: UserState;
}

const initialState: UserState = {};

export function reducer(state = initialState, { type, payload }: userActions.Actions): UserState {
    switch (type) {
        case userActions.SET_USER_DATA:
            return { ...state, ...payload };
        case userActions.SET_TOKEN:
            return { ...state, token: payload };
        case userActions.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export const getUser = createSelector(
    rootSelector,
    (state: State) => state.user,
);
export const getUsername = createSelector(
    getUser,
    (state: UserState) => state.username,
);
export const getIsUserLoggedIn = createSelector(
    getUser,
    (state: UserState) => !!state.token,
);
export const getUserVkId = createSelector(
    getUser,
    (state: UserState) => state.userVkId,
);
