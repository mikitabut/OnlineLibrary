import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as NotificationActions from '../actions/notification.actions';
import * as UserActions from '../actions/user.actions';
import { catchError } from 'rxjs/operators';
import { ErrorCode } from '../entities/error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store<any>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.errorHandler(err);
                }
                return throwError(err);
            }),
        );
    }

    errorHandler(error: HttpErrorResponse) {
        if (error.status === ErrorCode.NotAuthorized) {
            this.store.dispatch(
                new NotificationActions.ShowNotification(`Session is expired. Login again!`),
            );
            this.store.dispatch(new UserActions.Logout(null));
        } else {
            this.store.dispatch(
                new NotificationActions.ShowNotification(
                    `Something went wrong. ${error.error.data || error.message}. Status: ${
                        error.status
                    }`,
                ),
            );
        }
    }
}
