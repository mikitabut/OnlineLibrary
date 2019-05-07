import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions as NotificationActions } from '../actions/notification.actions';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationEffects {
    @Effect({ dispatch: false })
    showNotification$ = this.actions$.pipe(
        ofType(NotificationActions.ShowNotification),
        mergeMap(({ payload }) => {
            this.snackBar.open(payload, 'OK');

            return of();
        }),
    );

    constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
