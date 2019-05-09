import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, finalize, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as UiActions from '../actions/ui.actions';
import * as BooksActions from '../actions/books.actions';
import * as UserActions from '../actions/user.actions';
import * as NotificationActions from '../actions/notification.actions';
import { AuthenticationService } from '../services/authService';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private store: Store<any>,
        @Inject(DOCUMENT) private document: Document,
    ) {}

    @Effect()
    getProfile$ = this.actions$.pipe(
        ofType<UserActions.GetProfile>(UserActions.GET_PROFILE),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(() => {
            return this.authService.getProfile().pipe(
                map((user: any) => {
                    this.store.dispatch(new UserActions.SetUserData(user));
                    return user.username;
                }),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
                map(
                    (username: string) =>
                        new NotificationActions.ShowNotification(`Hello ${username}!`),
                ),
                tap(() => this.store.dispatch(new BooksActions.FetchManagedBooks(null))),
                map(() => new BooksActions.FetchRecommendedBooks(null)),
            );
        }),
    );
    @Effect()
    login$ = this.actions$.pipe(
        ofType<UserActions.Login>(UserActions.LOGIN),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.authService.login(payload.username.trim(), payload.password.trim()).pipe(
                map((user: any) => {
                    this.store.dispatch(new UserActions.SetUserData(user));
                    return user.username;
                }),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
                map(
                    (username: string) =>
                        new NotificationActions.ShowNotification(`Hello ${username}!`),
                ),
                tap(() => this.store.dispatch(new BooksActions.FetchManagedBooks(null))),
                tap(() => new BooksActions.FetchRecommendedBooks(null)),
            );
        }),
    );
    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<UserActions.Logout>(UserActions.LOGOUT),
        tap(() => this.authService.logout()),
        tap(() => this.store.dispatch(new BooksActions.ClearManagedBooks(null))),
        tap(() => this.store.dispatch(new BooksActions.ClearRecommendedBooks(null))),
    );
    @Effect({ dispatch: false })
    setToken$ = this.actions$.pipe(
        ofType<UserActions.SetToken>(UserActions.SET_TOKEN),
        map(({ payload }) => {
            localStorage.setItem('x-jwt', payload);
            return payload;
        }),
    );

    @Effect()
    register$ = this.actions$.pipe(
        ofType<UserActions.Register>(UserActions.REGISTER),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) => {
            return this.authService.register(payload.username.trim(), payload.password.trim()).pipe(
                map((user: any) => new UserActions.SetUserData(user)),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
                map(() => new NotificationActions.ShowNotification('User successfully created')),
            );
        }),
    );
    @Effect()
    updateUserVkId$ = this.actions$.pipe(
        ofType<UserActions.UpdateUserVkId>(UserActions.UPDATE_USER_VK_ID),
        tap(() => this.store.dispatch(new UiActions.ShowSpinner(null))),
        switchMap(({ payload }) =>
            this.authService.updateUserVkId(payload).pipe(
                map((data: any) => new UserActions.SetUserData(data)),
                finalize(() => this.store.dispatch(new UiActions.HideSpinner(null))),
                tap(() =>
                    this.store.dispatch(
                        new NotificationActions.ShowNotification(
                            'User vk id successfully updated. You will be redirected to main page...',
                        ),
                    ),
                ),
                delay(3000),
                tap(() => (this.document.location.href = '/')),
            ),
        ),
    );
}
