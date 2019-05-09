import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';

import * as NotificationActions from '../actions/notification.actions';
import * as UserActions from '../actions/user.actions';
import { ErrorCode } from '../entities/error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store<any>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = localStorage.getItem('x-jwt');
        const jwtUpgradedReq = req.clone({
            setHeaders: {
                'x-jwt': jwt,
            },
        });

        return next.handle(jwtUpgradedReq).pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    this.store.dispatch(new UserActions.SetToken(event.headers.get('x-jwt')));
                }
                return event;
            }),
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
            this.store.dispatch(new NotificationActions.ShowNotification(`Login again!`));
            this.store.dispatch(new UserActions.Logout(null));
        } else {
            if (error.status !== ErrorCode.Unlogged) {
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
}
