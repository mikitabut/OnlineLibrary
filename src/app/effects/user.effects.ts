import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, finalize } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as UiActions from '../actions/ui.actions';
import * as BooksActions from '../actions/books.actions';
import * as UserActions from '../actions/user.actions';
import * as NotificationActions from '../actions/notification.actions';
import { AuthenticationService } from '../services/authService';
import { of, combineLatest } from 'rxjs';
import { getUsername, getUsertoken } from '../reducers/user.reducers';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private store: Store<any>,
    ) {}

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType<UserActions.Login>(UserActions.LOGIN),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.authService.login(payload.username.trim(), payload.password.trim()).pipe(
                map((obj: any) => obj.data),
                map(({ jwtToken: token, userVkId }) => {
                    this.store.dispatch(
                        new UserActions.SetUserData({
                            token,
                            userVkId,
                            username: payload.username,
                        }),
                    );
                    return payload.username;
                }),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
                map((username: string) =>
                    this.store.dispatch(
                        new NotificationActions.ShowNotification(`Hello ${username}!`),
                    ),
                ),
                map(() => this.store.dispatch(new BooksActions.FetchManagedBooks(null))),
                map(() => this.store.dispatch(new BooksActions.FetchRecommendedBooks(null))),
            );
        }),
    );
    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<UserActions.Logout>(UserActions.LOGOUT),
        tap(() => this.store.dispatch(new BooksActions.ClearManagedBooks(null))),
        tap(() => this.store.dispatch(new BooksActions.ClearRecommendedBooks(null))),
    );

    @Effect()
    register$ = this.actions$.pipe(
        ofType<UserActions.Register>(UserActions.REGISTER),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.authService.register(payload.username.trim(), payload.password.trim()).pipe(
                map((obj: any) => obj.data),
                map(
                    ({ jwtToken: token, userVkId }) =>
                        new UserActions.SetUserData({
                            token,
                            userVkId,
                            username: payload.username,
                        }),
                ),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
                tap(() => new NotificationActions.ShowNotification('User successfully created')),
            );
        }),
    );
    @Effect()
    updateUserVkId$ = this.actions$.pipe(
        ofType<UserActions.UpdateUserVkId>(UserActions.UPDATE_USER_VK_ID),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) =>
            combineLatest(
                of(payload),
                this.store.pipe(select(getUsername)),
                this.store.pipe(select(getUsertoken)),
            ),
        ),
        switchMap(([userVkId, username, token]) =>
            this.authService.updateUserVkId(userVkId, username).pipe(
                map((obj: any) => obj.data),
                map(
                    () =>
                        new UserActions.SetUserData({
                            token,
                            userVkId,
                            username,
                        }),
                ),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
                tap(
                    () =>
                        new NotificationActions.ShowNotification('User vk id successfully updated'),
                ),
            ),
        ),
    );
}
